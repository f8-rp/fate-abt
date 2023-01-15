import './style.css';
import * as THREE from 'three';

import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

const renderer =  new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(9);

renderer.render(scene, camera);

const geometry = new THREE.BoxGeometry(0.001);
const material = new THREE.MeshStandardMaterial( {color: 0x00} )
const torus = new THREE.Mesh(geometry, material);

scene.add( torus );

const pointLight =  new THREE.PointLight(0xffffff)
pointLight.position.set(20,20,20)

const ambientLight = new THREE.AmbientLight(0xffffff)

scene.add(ambientLight, pointLight)

const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200,50);

const controls = new OrbitControls(camera, renderer.domElement);

function addStar(){
  const geometry = new THREE.SphereGeometry(0.25);
  const material = new THREE.MeshStandardMaterial( {color: 0xffffff} )
  const star = new THREE.Mesh(geometry, material);

  const [x,y,z] = Array(3).fill().map(()=> THREE.MathUtils.randFloatSpread( 100 ));

  star.position.set(x,y,z);
  scene.add(star);

}

Array(200).fill().forEach(addStar)

function animate(){
  requestAnimationFrame(animate);

  controls.update();

  torus.rotation.y += 0.01;
  camera.rotation.x = torus.rotation.x
  camera.rotation.y = torus.rotation.y
  camera.rotation.z = torus.rotation.z

  renderer.render(scene,camera);
}

animate()