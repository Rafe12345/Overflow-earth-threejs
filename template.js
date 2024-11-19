// Setting up a scene
import * as THREE from "three";
//const scene =
//const renderer =
renderer.setSize(window.innerWidth, window.innerHeight);

//Setting up camera
const camera = new THREE.PerspectiveCamera();
//fill in
camera.position.set(0, 20, 0);
camera.lookAt(-50, 0, 0);

//Loading textures
//const textureLoader =
//const earthTexture =

//First 3D object
//const geometry =
//const earthMaterial =
//const earthSphere =
earthSphere.position.set(-50, 0, 0);
scene.add(earthSphere);

//Part 1 stars (Define star properties)

//Part 2 stars (Exclude stars too close to planets)
/*
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
*/

//Part 3 stars (Adding stars to scene)

//Part 1 moon (Creating the moon)
// const moon_geometry = new THREE.SphereGeometry(4, 20, 20);​
// const moon_texture = textureLoader.load("resources/moon.jpg");​
// const moon_material = new THREE.MeshStandardMaterial({ map: moon_texture });​
// const moon = new THREE.Mesh(moon_geometry, moon_material);​
// moon.position.set(70, 0, 0);​
// scene.add(moon);

//Part 1 lighting (the "Sun")

// Part 2 lighting (Shadows)
// renderer.shadowMap.enabled = true;
// light.castShadow = true;
// earthSphere.castShadow = true;
// moon.receiveShadow = true;
// light.shadow.mapSize.width = 1000;
// light.shadow.mapSize.height = 1000;
// light.shadow.camera.left = -100;
// light.shadow.camera.right = 100;
// light.shadow.camera.top = 100;
// light.shadow.camera.bottom = -100;

//Part 3 lighting (Additional Mini Light)
// for (let x = -10; x <= 10; x += 10) {
//   for (let z = -10; z <= 10; z += 10) {
//     for (let y = -10; y <= 10; y += 10) {

//     }
//   }
// }
// Adding planet Mars
// const marsGeometry = new THREE.SphereGeometry(15, 100, 100);
// const marsTexture = textureLoader.load("resources/mars.jpg");
// const marsMaterial =
// const marsSphere =
// marsSphere.position.set(-150, 0, 0);
// scene.add(marsSphere);

// Adding planet Jupiter
// const jupiterGeometry = new THREE.SphereGeometry(50, 100, 100);
// const jupiterTexture = textureLoader.load("resources/jupiter.jpg");
// const jupiterMaterial =
// const jupiterSphere =
// jupiterSphere.position.set(-300, -20, 0);
// scene.add(jupiterSphere);

// Move Camera function
function moveCamera() {
  // Get the current scroll position from the top of the page
  // update camera position
}
// Call the function on scroll

//Animation function
function animate() {
  //fill in
  //Part 2 moon (Moon rotation)
}
renderer.setAnimationLoop(animate);
