// Ocean Bed Dunes, Caustics & Water Light Reflection
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
