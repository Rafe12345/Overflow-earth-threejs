import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#canvas"),
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Set camera and controls
camera.position.set(50, 20, 0);
//set camera rotation to
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enablePan = false;
controls.minDistance = 25;
controls.maxDistance = 60;
controls.update();
const axesHelper = new THREE.AxesHelper(1000);
scene.add(axesHelper);

// Load texture for sphere
const textureLoader = new THREE.TextureLoader();
const earthTexture = textureLoader.load(
  "resources/world.topo.bathy.200412.3x5400x2700.jpg"
);
const marsTexture = textureLoader.load("resources/2k_mars.jpg");
const geometry = new THREE.SphereGeometry(15, 100, 100);

const earthMaterial = new THREE.MeshStandardMaterial({ map: earthTexture });
const earthSphere = new THREE.Mesh(geometry, earthMaterial);

// Load texture for mars
const marsMaterial = new THREE.MeshStandardMaterial({ map: marsTexture });
const marsSphere = new THREE.Mesh(geometry, marsMaterial);
// set mars position
const marsSphere2 = new THREE.Mesh(geometry, marsMaterial);
marsSphere.position.set(-150, 0, 0);
marsSphere2.position.set(-250, 0, 0);
earthSphere.position.set(-50, 0, 0);
scene.add(earthSphere);
scene.add(marsSphere);
scene.add(marsSphere2);


//Mesh Moon
const moon_geometry = new THREE.SphereGeometry(4, 20, 20);
const moon_texture = textureLoader.load("resources/Moon_texture.jpg");
const moon_material = new THREE.MeshStandardMaterial({ map: moon_texture });
const moon = new THREE.Mesh(moon_geometry, moon_material);
moon.position.set(70, 0, 0);
scene.add(moon);

//Moon rotation
const moondistance = 35;
const moonspeed = 0.01;
let angle = 0; // Define angle for Moon's orbit

// Add lighting
const sunx = 25;
const suny = 0;
const sunz = 50;
const light = new THREE.DirectionalLight(0xffffff, 1.1);
light.position.set(sunx, suny, sunz);
scene.add(light);

for (let x = -5; x <= 5; x += 5) {
  for (let z = -5; z <= 5; z += 5) {
    for (let y = -5; y <= 5; y += 5) {
      const minilight = new THREE.DirectionalLight(0xffffff, 0.05);
      minilight.position.set(sunx + x * 2, suny + y * 2, sunz + z * 2);
      scene.add(minilight);
    }
  }
}
// add stars
function stars() {
  let whl = Math.random() * 0.5 + 0.1;
  let x = Math.random() * 1000 -500;
  let y = Math.random() * 600 -300;
  let z = Math.random() * 600 -300;

while (true) {
  if (x > 300 || x < -300) {
    break;
  } else if (y > 70 || y < -70) {
    break;
  } else if (z > 70 || z < -70) {
    break;
  } else {
    x = Math.random() * 1000 -500;
    y = Math.random() * 600 -300;
    z = Math.random() * 600 -300;
  }
}

  // while (true) {
  //   if (z > 70 || z < -70) {
  //     break;
  //   } else {
  //     if (x > 300 || x < -300) {
  //       break;
  //     } else {
	// 	if (y < -20) {
	// 		break;
	// 	}
  //       x = Math.random() * (500 - -500) + -500;
  //     }
  //   }
  // }

  const geostars = new THREE.SphereGeometry(whl);
  const material_star = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geostars, material_star);
  star.position.set(x, y, z);
  scene.add(star); 
} //To close the stars function
for (let i = 0; i < 5000; i++) {
  stars();
}

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  // Add unique movements along x, y, and z axes for a more dynamic path
  camera.position.x = t * 0.07;
  //camera.rotation.y = t * 0.004; // Horizontal rotation
  // camera.position.y = Math.sin(t * 0.005) * 5; // Adds an up-and-down wave effect
  // camera.position.z = 50 + Math.cos(t * 0.005) * 5; // Slight in-and-out motion

  // // Rotate camera for added angle
  // camera.rotation.x = Math.sin(t * 0.0003) * 0.05; // Subtle nodding motion
  // camera.rotation.y = -50 + Math.sin(t * 0.002) * (Math.PI / 4); // 45 degrees is π/4 radians
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation loop
function animate() {
  earthSphere.rotation.y += 0.005;
  marsSphere.rotation.y += 0.005;
  marsSphere2.rotation.y += 0.005;

  moon.rotation.y += moonspeed; //used to match the moon orbiting speed
  angle += moonspeed;
  moon.position.set(
    earthSphere.position.x + moondistance * Math.cos(angle),
    earthSphere.position.y,
    earthSphere.position.z + moondistance * Math.sin(angle)
  );
  //get rid when we doing on scroll
  //controls.update();
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);