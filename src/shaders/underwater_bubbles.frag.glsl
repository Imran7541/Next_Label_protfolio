// Procedural Glass Bubbles with Glint & Rim Highlight
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
