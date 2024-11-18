//Setting up a scene
import * as THREE from "three";
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#canvas"),
});
renderer.setSize(window.innerWidth, window.innerHeight);

//Setting up camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 20, 0);
camera.lookAt(-50, 0, 0);

//Loading textures
const textureLoader = new THREE.TextureLoader();
const earthTexture = textureLoader.load("resources/earth.jpg");

//First 3D object
const geometry = new THREE.SphereGeometry(15, 100, 100);
const earthMaterial = new THREE.MeshStandardMaterial({ map: earthTexture });
const earthSphere = new THREE.Mesh(geometry, earthMaterial);
earthSphere.position.set(-50, 0, 0);
scene.add(earthSphere);

//Part 1 stars
function stars() {
  let whl = Math.random() * 0.5 + 0.1;
  let x = Math.random() * 1000 - 500;
  let y = Math.random() * 600 - 300;
  let z = Math.random() * 600 - 300;

  //Part 2 stars
  while (true) {
    if (x > 300 || x < -300) {
      break;
    } else if (y > 70 || y < -70) {
      break;
    } else if (z > 70 || z < -70) {
      break;
    } else {
      x = Math.random() * 1000 - 500;
      y = Math.random() * 600 - 300;
      z = Math.random() * 600 - 300;
    }
  }

  //part 3 stars
  const geostars = new THREE.SphereGeometry(whl);
  const material_star = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geostars, material_star);
  star.position.set(x, y, z);
  scene.add(star);
} //To close the stars function

for (let i = 0; i < 5000; i++) {
  stars();
}

//Moon
const moon_geometry = new THREE.SphereGeometry(4, 20, 20);
const moon_texture = textureLoader.load("resources/moon.jpg");
const moon_material = new THREE.MeshStandardMaterial({ map: moon_texture });
const moon = new THREE.Mesh(moon_geometry, moon_material);
moon.position.set(70, 0, 0);
scene.add(moon);

const moondistance = 35;
const moonspeed = 0.01;
let angle = 0;

//Part 1 lighting
const sunx = 25;
const suny = 0;
const sunz = 50;
const light = new THREE.DirectionalLight(0xffffff, 2);
light.position.set(sunx, suny, sunz);
scene.add(light);


//Part 2 lighting
renderer.shadowMap.enabled = true;
light.castShadow = true;
earthSphere.castShadow = true;
moon.receiveShadow = true;
light.shadow.mapSize.width = 1000; 
light.shadow.mapSize.height = 1000;
light.shadow.camera.left = -100; 
light.shadow.camera.right = 100;
light.shadow.camera.top = 100;
light.shadow.camera.bottom = -100;



//Part 3 lighting
for (let x = -10; x <= 10; x += 10) {
  for (let z = -10; z <= 10; z += 10) {
    for (let y = -10; y <= 10; y += 10) {
      const minilight = new THREE.PointLight(0xffffff, 110, 1000);
      minilight.position.set(sunx + x, suny + y, sunz + z);
      scene.add(minilight);
    }
  }
}



// Adding planet Mars
const marsGeometry = new THREE.SphereGeometry(15, 100, 100);
const marsTexture = textureLoader.load("resources/mars.jpg");
const marsMaterial = new THREE.MeshStandardMaterial({ map: marsTexture });
const marsSphere = new THREE.Mesh(marsGeometry, marsMaterial);
marsSphere.position.set(-150, 0, 0);
scene.add(marsSphere);

// Adding planet Jupiter
const jupiterGeometry = new THREE.SphereGeometry(50, 100, 100);
const jupiterTexture = textureLoader.load("resources/jupiter.jpg");
const jupiterMaterial = new THREE.MeshStandardMaterial({ map: jupiterTexture });
const jupiterSphere = new THREE.Mesh(jupiterGeometry, jupiterMaterial);
jupiterSphere.position.set(-300, -20, 0);
scene.add(jupiterSphere);

// Move Camera function
function moveCamera() {
  // Get the current scroll position from the top of the page
  const t = document.body.getBoundingClientRect().top;
  // update camera position
  camera.position.x = t * 0.07;
}
// Call the function on scroll
document.body.onscroll = moveCamera;
moveCamera();

//Animation function
function animate() {
  earthSphere.rotation.y += 0.005;
  renderer.render(scene, camera);

  moon.rotation.y += moonspeed;

  angle += moonspeed;
  moon.position.set(
    earthSphere.position.x + moondistance * Math.cos(angle),
    earthSphere.position.y,
    earthSphere.position.z + moondistance * Math.sin(angle)
  );
}
renderer.setAnimationLoop(animate);
