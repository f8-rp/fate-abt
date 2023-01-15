import './style.css';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { gsap } from 'gsap';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { RectAreaLight } from 'three';

const scene = new THREE.Scene();

const loader = new GLTFLoader();
loader.load('./assets/room.glb', function (glb) {
  console.log(glb);
  const root = glb.scene;
  scene.add(root);
}, function (xhr) {
  console.log((xhr.loaded / xhr.total * 100) + '% loaded');
}, function (err) {
  console.log(err);
})

const camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000)

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(9);

renderer.render(scene, camera);

const pointLight = new THREE.RectAreaLight(0x0000FF, 100, 1.3, 1.3);
const rectLighted = new THREE.RectAreaLight(0x0000FF, 70, 1, 1)
const pointLight2 = new THREE.PointLight(0x00FF00, 2)
const pointLight3 = new THREE.PointLight(0x00FF00, 3)

rectLighted.position.set(0.2, 0.1, 0.2)
pointLight3.position.set(-0.6, 0.9, -0.5)
pointLight.position.set(0.2, 0.3, 0.8)
pointLight2.position.set(-0.2, 2, -0.3)

scene.add(pointLight, pointLight2, pointLight3, rectLighted);

const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff })
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

const screenTexture = new THREE.TextureLoader().load('./assets/bkg.jpg');

const geometry = new THREE.BoxGeometry(0.65, 0.4, 0.03);
const material = new THREE.MeshBasicMaterial({ map: screenTexture });
const image = new THREE.Mesh(geometry, material);

image.position.set(0.12, 0.97, -0.61);
scene.add(image)

let video = document.getElementById('video');

let videoTexture = new THREE.VideoTexture(video);

videoTexture.minFilter = THREE.LinearFilter;
videoTexture.magFilter = THREE.LinearFilter;

const geometry2 = new THREE.BoxGeometry(0.01, 0.4, 0.65);
const material2 = new THREE.MeshBasicMaterial({
  map: videoTexture,
  side: THREE.FrontSide,
  toneMapped: false,
});
const image2 = new THREE.Mesh(geometry2, material2);

image2.position.set(0.66, 0.97, -0.25);
scene.add(image2)

Array(200).fill().forEach(addStar)

video.play()


var introDone = false;

function go() {
  gsap.to(camera.position, {
    x: 10,
    y: 10,
    z: 10,
    duration: 1.5
  });

  setTimeout(() => {
    gsap.to(camera.position, {
      x: -1.7,
      y: 2.3,
      z: -10,
      duration: 1.5,
      onUpdate: () => {
        camera.lookAt(image)
      }
    })
  }, 1500)

  setTimeout(() => {
    gsap.to(camera.position, {
      x: -1.7,
      y: -5,
      z: -10,
      duration: 1.5,
      onUpdate: () => {
        camera.lookAt(image)
      }
    })
  }, 3000)

  setTimeout(() => {
    gsap.to(camera.position, {
      x: -1.7,
      y: 2.3,
      z: 1.5,
      duration: 1.5,
    })
    introDone = true;
  }, 4500)
}

go()

function scroll() {
  var t = document.body.getBoundingClientRect().top;
  if (-1244 < t && t < -50) {
    gsap.to(camera.position, {
      x: 0.5,
      y: 1,
      z: -0.5,
      duration:3,
    })
  }
  else if(-1244>t && t>-3000){
    gsap.to(camera.position, {
      x: -0.7,
      y: 1,
      z: 0,
      duration:3,
      onUpdate:()=>{
        controls.target = pointLight3.position;
      }
    })
  } 
  else if(-3000>t && t>-4600){
    gsap.to(camera.position, {
      x: 0.7,
      y: 1,
      z: 0,
      duration:3,
      onUpdate:()=>{
        controls.target = image.position;
      }
    })
  } 
  else {
    gsap.to(camera.position, {
      x: -1.7,
      y: 2.3,
      z: 1.5,
      duration: 1.5,
    })
  }

  console.log(t)
}

function animate() {
  requestAnimationFrame(animate);

  controls.update();

  videoTexture.needsUpdate = true;

  renderer.render(scene, camera);

  if(introDone == true){
    scroll()
  }
}

animate()