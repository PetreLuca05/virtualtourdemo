import './style.css'
import * as THREE from 'three'

//ENVIROMENT SETUP
const _VS = `
varying vec2 vUv;

void main() {
  vUv = uv;

  vec4 res;
  res = vec4(position.x, position.y, position.z, 1.0);
  gl_Position = projectionMatrix * modelViewMatrix * res;
}
`;

const _FS = `
uniform sampler2D texture1;
varying vec2 vUv;

void main() {
  vec4 col = texture2D(texture1, vUv);

  gl_FragColor = vec4(col);
}
`;

let masterScene;
export function init(_scene) {
  masterScene = _scene;

  const helperGeometry = new THREE.BoxGeometry( 100, 100, 100, 4, 4, 4);
  const helperMaterial = new THREE.MeshBasicMaterial( { color: 0xff00ff, wireframe: true } );
  const helper = new THREE.Mesh( helperGeometry, helperMaterial );
  masterScene.add(helper);
}

export function spawnPanorama(_image) {
  const shaderAttributes = {
    texture1: { type: "t", value: new THREE.TextureLoader().load(_image) },
  };
  
  const geometry = new THREE.SphereGeometry( 500, 60, 40 );
  geometry.scale( -1, 1, 1 );
  
  const material = new THREE.ShaderMaterial( {
    uniforms: shaderAttributes,
    vertexShader: _VS,
    fragmentShader: _FS,
  } );
  
  const panorama = new THREE.Mesh(geometry, material);
  masterScene.add(panorama);

  console.log("Panorama spawned" + _image);
}
