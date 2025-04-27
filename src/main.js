import './style.css'
import * as THREE from 'three'
import {spawnPanorama, init} from './panorama.js'
import image1 from '../images/pano1.jpg'
import image2 from '../images/pano2.jpg'
import image3 from '../images/pano3.png'
import { DeviceOrientationControls } from './DeviceOrientationControls'

document.querySelector('#app').innerHTML = `
  <canvas id="bg">
  </canvas>

  <section id="ui">
    <ul>
      <h1>all avalible rooms</h1>
      <p>select a room to view in 360</p>

      <li>
        <button id="spawn1"> Spawn Panorama </button>
        <button id="spawn2"> Spawn Panorama </button>
        <button id="spawn3"> Spawn Panorama </button>
      </li>
    </ul>
  </section>
`

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const controls = new DeviceOrientationControls(camera);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
  alpha: true,
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

init(scene);

document.querySelector('#spawn1').addEventListener("click", (e) => {
  spawnPanorama(image1);
});

document.querySelector('#spawn2').addEventListener("click", (e) => {
  spawnPanorama(image2);
});

document.querySelector('#spawn3').addEventListener("click", (e) => {
  spawnPanorama(image3);
});

spawnPanorama(image1);


function animate() {
  requestAnimationFrame(animate);

  controls.update();

  renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();
