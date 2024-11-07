import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import FakeGlowMaterial from './FakeGlowMaterial.js'
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
const controls = new OrbitControls( camera, renderer.domElement );
camera.position.set( 0, 0, 33 );
controls.enableDamping = true;
// controls.enablePan = false;
controls.minDistance = 25;
// controls.maxDistance = 60;
controls.update();
document.body.appendChild(renderer.domElement);
const textureLoader = new THREE.TextureLoader();

//Mesh earth
const earth_geometry = new THREE.SphereGeometry(20 ,50 ,50 );
const earth_material = new THREE.MeshPhysicalMaterial();
const earth_texture = textureLoader.load('resources/world.topo.bathy.200412.3x5400x2700.jpg');
earth_material.map = earth_texture;
const earth = new THREE.Mesh(earth_geometry, earth_material)
scene.add(earth);


//Mesh Sun
// const sun_geometry = new THREE.SphereGeometry(15 ,50 ,50 );
// const sun_material = new THREE.MeshStandardMaterial();
// const sun_texture = textureLoader.load('resources/8k_sun.jpg');
// sun_material.map = sun_texture;
// const sun = new THREE.Mesh(sun_geometry, sun_material)
// sun.position.set(50, 0, 0)
// scene.add(sun);


//Mesh Moon
const moon_geometry = new THREE.SphereGeometry(4 ,20 ,20 );
const moon_material = new THREE.MeshStandardMaterial();
const moon_texture = textureLoader.load('resources/Moon_texture.jpg');
moon_material.map = moon_texture;
const moon = new THREE.Mesh(moon_geometry, moon_material)
moon.position.set(70, 0, 0)
scene.add(moon);

//Moon rotation
const moondistance = 60;
const moonspeed = 0.01;


//Light

// const light = new THREE.HemisphereLight( 0xffffff, 0x000000, 4 );
// light.position.set(0,1,0);

const sunx = 50;
const suny = 0;
const sunz = 0;

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(sunx, suny, sunz);
scene.add(light);


for (let x = -5; x <= 5; x++) {
  for (let z = -5; z <= 5; z += 5) {
    for (let y = -5; y <= 5; y += 5) {
      const minilight = new THREE.DirectionalLight(0xffffff, 0.05);
      
      minilight.position.set(sunx + x * 2.5, suny + y * 2.5, sunz + z * 2.5);
      
      scene.add(minilight);
    }
  }
}


const axesHelper = new THREE.AxesHelper( 1000 );
scene.add( axesHelper );
function stars(){
	let whd = Math.random() * (0.8- 0.1) + 0.1;
	let x = Math.random() * (500 - -500) + -500;
	let y = Math.random() * (400 - -150) +  -150;
	let z = Math.random() * (250 - - 200) + - 200;
	while(true){
		if(z > 200 || z < -200){
			break
		}
		else{
			if(x > 200 || x < -200){
				break
			}
			else{
				x = Math.random() * (500 - -500) + -500;
			}
			
		}
	}
	const geostars = new THREE.SphereGeometry(whd)
	//const geostars = new THREE.SphereGeometry(whd,44,22)
	const material_stars = new FakeGlowMaterial({
		glowInternalRadius: 6.0,
		depthTest: true,
		glowColor: new THREE.Color("#F6F5EE")
	});
	const stars = new THREE.Mesh(geostars,material_stars)
	stars.position.set(x,y,z)
	scene.add(stars)
}

for(let i = 0; i<5000; i++){
	stars()
}

let angle = 0;
function animate() {

	earth.rotation.y += 0.005;
	earth.rotation.x += 0.001;

	moon.rotation.y += moonspeed; //used to matchj the moon orbiting speed

	angle += moonspeed;
	moon.position.set(
		earth.position.x + moondistance * Math.cos(angle),
		earth.position.y,
		earth.position.z + moondistance * Math.sin(angle)
	);

	controls.update()
	renderer.render( scene, camera );
}
renderer.setAnimationLoop( animate );