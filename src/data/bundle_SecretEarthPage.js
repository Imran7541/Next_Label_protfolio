import{a as e,c as t,d as n,f as r,h as i,i as a,l as o,m as s,n as c,o as l,p as u,r as d,s as f,t as p,u as m}from"./index-BG4wa0Rg.js";var h=`varying vec2 vUv;
varying vec3 vNormalView;
varying vec3 vObjectNormal;

void main() {
  vUv = uv;
  vNormalView = normalize(normalMatrix * normal);
  vObjectNormal = normalize(normal);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`,g=`precision highp float;

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

  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`,_=`varying vec3 vNormalView;
varying vec3 vViewDirection;

void main() {
  vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);
  vNormalView = normalize(normalMatrix * normal);
  vViewDirection = normalize(-viewPosition.xyz);
  gl_Position = projectionMatrix * viewPosition;
}
`,v=`precision highp float;

varying vec3 vNormalView;
varying vec3 vViewDirection;

void main() {
  float facing = max(0.0, dot(normalize(vNormalView), normalize(vViewDirection)));
  float rim = pow(1.0 - facing, 2.65);
  // The Fresnel term peaks at the exact silhouette. Fade it back to zero at
  // the mesh boundary so the atmosphere cannot form a hard circular line.
  float outerEdgeFade = smoothstep(0.0, 0.16, facing);
  float alpha = rim * outerEdgeFade * 0.68;
  vec3 atmosphere = mix(
    vec3(0.03, 0.18, 0.95),
    vec3(0.13, 0.62, 1.0),
    rim
  );
  gl_FragColor = vec4(atmosphere * (0.55 + rim * 1.1), alpha);

  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`,y=2.55,b=class{constructor(o){if(this.root=o,this.canvas=o.querySelector(`[data-secret-earth-canvas]`),this.surfaceContainer=o.querySelector(`.secret-earth__surface`),!(this.canvas instanceof HTMLCanvasElement))throw Error(`Secret Earth canvas was not found.`);this.renderer=new p({canvas:this.canvas,antialias:!0,alpha:!0,powerPreference:`high-performance`}),this.renderer.setClearColor(0,0),this.renderer.outputColorSpace=m,this.renderer.toneMapping=4,this.renderer.toneMappingExposure=1.16,this.scene=new n,this.camera=new t(34,1,.1,50),this.camera.position.set(0,0,7.2),this.earthGroup=new a,this.earthGroup.position.y=-2.75,this.scene.add(this.earthGroup),this.surfaceGeometry=new u(y,96,72),this.surfaceMaterial=new f({color:1790584,roughness:.94,metalness:0}),this.surface=new l(this.surfaceGeometry,this.surfaceMaterial),this.surface.rotation.y=-1.42,this.earthGroup.add(this.surface),this.cloudGeometry=new u(y*1.008,96,72),this.cloudMaterial=new r({vertexShader:h,fragmentShader:g,uniforms:{uTime:{value:0}},transparent:!0,depthTest:!0,depthWrite:!1}),this.clouds=new l(this.cloudGeometry,this.cloudMaterial),this.clouds.rotation.y=-1.34,this.earthGroup.add(this.clouds),this.atmosphereGeometry=new u(y*1.045,96,72),this.atmosphereMaterial=new r({vertexShader:_,fragmentShader:v,transparent:!0,depthTest:!0,depthWrite:!1,side:1,blending:2}),this.atmosphere=new l(this.atmosphereGeometry,this.atmosphereMaterial),this.earthGroup.add(this.atmosphere),this.scene.add(new e(9423359,4120,.42));let s=new d(16777215,3.4);s.position.set(-4.2,4.6,7.5),this.scene.add(s),this.earthTexture=null,this.visible=!1,this.frameId=0,this.startedAt=0,this.last=0,this.pointerTarget=new i(.5,.5),this.pointer=new i(.5,.5),this.closeButton=o.querySelector(`[data-earth-close]`),this.title=o.querySelector(`#earth-title`),this.handleResize=this.handleResize.bind(this),this.handlePointerMove=this.handlePointerMove.bind(this),this.handleKeyDown=this.handleKeyDown.bind(this),this.render=this.render.bind(this),this.hide=this.hide.bind(this),this.closeButton?.addEventListener(`click`,()=>this.hide()),window.addEventListener(`resize`,this.handleResize,{passive:!0}),window.addEventListener(`pointermove`,this.handlePointerMove,{passive:!0}),window.addEventListener(`deviceorientation`,e=>{!this.visible||e.gamma==null||this.pointerTarget.set(.5+Math.max(-1,Math.min(1,e.gamma/40))*.5,.5-Math.max(-1,Math.min(1,(e.beta-50)/40))*.5)}),document.addEventListener(`keydown`,this.handleKeyDown),this.handleResize()}loadEarthTexture(){this.earthTexture||=new s().load(`/textures/earth-blue-marble.webp`,e=>{e.colorSpace=m,e.wrapS=o,e.wrapT=c,e.anisotropy=Math.min(8,this.renderer.capabilities.getMaxAnisotropy()),e.needsUpdate=!0,this.surfaceMaterial.map=e,this.surfaceMaterial.color.set(16777215),this.surfaceMaterial.needsUpdate=!0})}show({origin:e=null,onClose:t=null,returnTo:n=null}={}){this.visible||(this.loadEarthTexture(),this.onClose=t,this.returnFocus=n??document.activeElement,this.visible=!0,this.startedAt=performance.now(),this.last=this.startedAt,e&&(this.root.style.setProperty(`--x`,`${Math.round(e.x)}px`),this.root.style.setProperty(`--y`,`${Math.round(e.y)}px`)),this.root.hidden=!1,requestAnimationFrame(()=>{this.root.setAttribute(`data-open`,``),this.title?.focus({preventScroll:!0})}),this.frameId=requestAnimationFrame(this.render))}hide(){if(!this.visible)return;this.visible=!1,this.root.removeAttribute(`data-open`);let e=()=>{cancelAnimationFrame(this.frameId),this.frameId=0,this.root.hidden=!0,this.onClose?.(),this.returnFocus instanceof HTMLElement&&this.returnFocus.focus({preventScroll:!0})},t=window.matchMedia(`(prefers-reduced-motion: reduce)`).matches;window.setTimeout(e,t?0:1400)}handleResize(){let e=Math.max(1,window.innerWidth),t=Math.max(1,window.innerHeight);this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.5)),this.renderer.setSize(e,t,!1),this.camera.aspect=e/t,this.camera.updateProjectionMatrix()}handlePointerMove(e){this.visible&&this.pointerTarget.set(e.clientX/Math.max(1,window.innerWidth),1-e.clientY/Math.max(1,window.innerHeight))}handleKeyDown(e){if(this.visible){if(e.key===`Escape`){e.preventDefault(),this.hide();return}if(e.key===`Tab`){let t=[this.title,this.closeButton].filter(Boolean),n=t.indexOf(document.activeElement);e.preventDefault(),t[(n+(e.shiftKey?-1:1)+t.length)%t.length]?.focus()}}}render(e){this.root.hidden||(this.frameId=requestAnimationFrame(this.render));let t=Math.min(.1,(e-this.last)/1e3);this.last=e;let n=(e-this.startedAt)/1e3,r=window.matchMedia(`(prefers-reduced-motion: reduce)`).matches;this.pointer.lerp(this.pointerTarget,1-Math.exp(-t*2.5));let i=r?1:1-(1-Math.min(1,n/2.4))**3;this.earthGroup.position.y=-2.75-(1-i)*2.2,this.earthGroup.rotation.x=.08+(this.pointer.y-.5)*.22,this.earthGroup.rotation.z=-.055+(this.pointer.x-.5)*.08;let a=r?0:n*.06;this.surface.rotation.y=-1.42+a+(this.pointer.x-.5)*.35,this.clouds.rotation.y=-1.34+a*1.35+(this.pointer.x-.5)*.35,this.cloudMaterial.uniforms.uTime.value=n,this.camera.position.x=(this.pointer.x-.5)*.6,this.camera.lookAt(0,-.35,0),this.renderer.render(this.scene,this.camera)}dispose(){this.visible=!1,cancelAnimationFrame(this.frameId),window.removeEventListener(`resize`,this.handleResize),window.removeEventListener(`pointermove`,this.handlePointerMove),document.removeEventListener(`keydown`,this.handleKeyDown),this.scene.remove(this.earthGroup),this.surfaceGeometry.dispose(),this.surfaceMaterial.dispose(),this.cloudGeometry.dispose(),this.cloudMaterial.dispose(),this.atmosphereGeometry.dispose(),this.atmosphereMaterial.dispose(),this.earthTexture?.dispose(),this.renderer.dispose()}};export{b as SecretEarthPage};
//# sourceMappingURL=SecretEarthPage-DeCha5-M.js.map