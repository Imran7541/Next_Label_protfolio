// Postprocessing Finish Shader: Chromatic Aberration, Screen Warp Distortion, Film Grain
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
