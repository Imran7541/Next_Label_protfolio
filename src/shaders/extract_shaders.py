import os

SHADERS = {
    "src/shaders/postprocessing_finish.frag.glsl": """// Postprocessing Finish Shader: Chromatic Aberration, Screen Warp Distortion, Film Grain
precision highp float;

uniform sampler2D tDiffuse;
uniform float uTime;
uniform float uWarp;
uniform float uAberration;
uniform float uGrain;
uniform vec2 uResolution;

varying vec2 vUv;

void main() {
  vec2 c = vUv - 0.5;
  float r2 = dot(c, c);
  vec2 uv = 0.5 + c * (1.0 - uWarp * 0.22 * (0.4 + r2 * 2.5));
  vec2 dir = c * (uAberration + uWarp * 0.03) * (0.4 + r2 * 3.0);
  vec3 color = vec3(0.0);
  
  if (uWarp < 0.002) {
    color = vec3(
      texture2D(tDiffuse, uv + dir).r,
      texture2D(tDiffuse, uv).g,
      texture2D(tDiffuse, uv - dir).b
    );
  } else {
    const int TAPS = 8;
    for (int i = 0; i < TAPS; i++) {
      float t = float(i) / float(TAPS - 1);
      vec2 blur = -c * uWarp * 0.09 * t;
      color.r += texture2D(tDiffuse, uv + blur + dir).r;
      color.g += texture2D(tDiffuse, uv + blur).g;
      color.b += texture2D(tDiffuse, uv + blur - dir).b;
    }
    color /= float(TAPS);
  }
  
  // Radial vignette
  color *= mix(1.0, 0.42, smoothstep(0.1, 0.72, r2 * 1.8));
  
  // Procedural film grain
  float grain = fract(sin(dot(floor(vUv * uResolution) + floor(uTime * 24.0) * 7.13, vec2(12.9898, 78.233))) * 43758.5453) - 0.5;
  color += grain * uGrain * sqrt(max(dot(color, vec3(0.2126, 0.7152, 0.0722)), 0.0006));
  
  gl_FragColor = vec4(max(color, 0.0), 1.0);
}
""",

    "src/shaders/secret_earth_clouds.frag.glsl": """// Secret Earth Procedural Triplanar FBM Noise Clouds Shader
precision highp float;

uniform float uTime;

varying vec2 vUv;
varying vec3 vNormalView;
varying vec3 vObjectNormal;

float hash21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 cell = floor(p);
  vec2 local = fract(p);
  local = local * local * (3.0 - 2.0 * local);
  float a = hash21(cell);
  float b = hash21(cell + vec2(1.0, 0.0));
  float c = hash21(cell + vec2(0.0, 1.0));
  float d = hash21(cell + vec2(1.0, 1.0));
  return mix(mix(a, b, local.x), mix(c, d, local.x), local.y);
}

float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.54;
  mat2 rotation = mat2(0.84, -0.54, 0.54, 0.84);
  for (int i = 0; i < 5; i += 1) {
    value += noise(p) * amplitude;
    p = rotation * p * 1.94 + 5.7;
    amplitude *= 0.49;
  }
  return value;
}

void main() {
  // Triplanar noise follows the sphere normal and has no longitude UV seam.
  vec3 sphereNormal = normalize(vObjectNormal);
  vec3 weights = pow(abs(sphereNormal), vec3(4.0));
  weights /= max(0.0001, weights.x + weights.y + weights.z);

  vec2 driftA = vec2(uTime * 0.006, -uTime * 0.0015);
  vec2 driftB = vec2(-uTime * 0.003, uTime * 0.004);

  float cloudX = fbm(sphereNormal.yz * 4.8 + driftA);
  float cloudY = fbm(sphereNormal.xz * 4.8 + driftB + 7.3);
  float cloudZ = fbm(sphereNormal.xy * 4.8 + driftA.yx + 13.7);
  float largeCloud = cloudX * weights.x + cloudY * weights.y + cloudZ * weights.z;

  float detailX = fbm(sphereNormal.yz * 11.5 + driftB + 3.4);
  float detailY = fbm(sphereNormal.xz * 11.5 + driftA + 9.1);
  float detailZ = fbm(sphereNormal.xy * 11.5 - driftB + 16.2);
  float detail = detailX * weights.x + detailY * weights.y + detailZ * weights.z;

  float cloud = smoothstep(0.62, 0.8, largeCloud + detail * 0.16);
  float light = 0.38 + max(0.0, dot(normalize(vNormalView), normalize(vec3(-0.45, 0.48, 0.78)))) * 0.78;
  float silhouetteFade = smoothstep(0.0, 0.13, max(0.0, vNormalView.z));
  float alpha = cloud * silhouetteFade * 0.72;

  if (alpha < 0.01) discard;
  gl_FragColor = vec4(vec3(0.82, 0.91, 1.0) * light, alpha);
}
""",

    "src/shaders/ocean_dunes_caustics.frag.glsl": """// Ocean Bed Dunes, Caustics & Water Light Reflection
precision highp float;

uniform float uTime;
uniform float uDepth;
uniform vec3 uTint;

varying vec3 vWorld;

// Noise and FBM helper definitions
float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }
float noise(vec2 p) {
  vec2 i = floor(p); vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0; float a = 0.5;
  for (int i = 0; i < 4; i++) { v += a * noise(p); p = p * 2.0; a *= 0.5; }
  return v;
}

void main() {
  vec3 n = normalize(cross(dFdx(vWorld), dFdy(vWorld)));
  float light = 0.35 + 0.65 * max(n.y, 0.0);
  vec3 sand = mix(vec3(0.08, 0.12, 0.14), vec3(0.2, 0.26, 0.26), fbm(vWorld.xz * 0.3));
  float caustic = smoothstep(0.48, 0.75, fbm(vWorld.xz * 0.25 - vec2(uTime * 0.08, -uTime * 0.05)));
  vec3 col = sand * light + vec3(0.12, 0.32, 0.38) * caustic * pow(1.0 - uDepth, 1.4);
  gl_FragColor = vec4(col * uTint, 1.0);
}
""",

    "src/shaders/underwater_bubbles.frag.glsl": """// Procedural Glass Bubbles with Glint & Rim Highlight
precision highp float;

uniform float uStrength;
varying float vSeed;

void main() {
  vec2 q = gl_PointCoord - 0.5;
  float r = length(q);
  if (r > 0.5) discard;

  // A glass bubble: bright thin rim, clear centre, one sharp glint highlight
  float rim = smoothstep(0.5, 0.44, r) - smoothstep(0.44, 0.32, r) * 0.85;
  float glint = smoothstep(0.12, 0.0, length(q - vec2(0.14, 0.14)));
  float alpha = (rim * 0.85 + glint * 0.95) * uStrength;
  if (alpha < 0.01) discard;

  gl_FragColor = vec4(vec3(0.85, 0.95, 1.0), alpha);
}
"""
}

for path, code in SHADERS.items():
    with open(path, "w", encoding="utf-8") as f:
        f.write(code)
    print(f"Saved shader: {path}")

print("All custom shaders extracted successfully!")
