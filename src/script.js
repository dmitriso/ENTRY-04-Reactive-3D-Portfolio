import './style.css';
import gsap from 'gsap';
import * as THREE from 'three';
import InfiniteMenu from './components/InfiniteMenu/infinitemenu';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Sphere } from 'three';
// import * as dat from 'dat.gui';
// import AOS from 'aos';
// import 'aos/dist/aos.css';


// INFINITE SCROLL MENU
const menu = new InfiniteMenu(document.querySelector('nav.menu'));

// GSAP ANIMATIONS
gsap.to('.logo', {
    delay:.25,
    duration: 1,
    x: 0,
    y: 0,
    opacity:1,
    startAt: {
        y:100,
    }
});

gsap.to('.label', {
    delay:.25,
    duration: 1.15,
    x: 0,
    y: 0,
    opacity:1,
    startAt: {
        y:100,
        opacity:0
    }
});

gsap.to('.nav', {
    delay:.25,
    duration: 1.2,
    x: 0,
    y: 0,
    opacity:1,
    startAt: {
        y:100,
        opacity:0
    }
});

// ITEM LINK ANIMATIONS
var item = $('.menu__item-inner');
var i;
// OnClick function that displays item cards
for (i = 0; i < item.length; i++) {
    $(item[i]).click(function(event) {
        event.preventDefault();
        console.log(this);
        var content = this.nextElementSibling
        if($(content).hasClass('active')) {
            $(content).removeClass('active').addClass('inactive');
        } else {
        $(content).removeClass('inactive').addClass('active');
        }
    })

}

// for (i = 0; i < item.length; i++) {
//     $(item[i]).click(function(event) {
//         event.preventDefault();
//         console.log(this);
//         var content = this.nextElementSibling;
//         if(content.style.maxHeight) {
//             content.style.maxHeight = null;
//         } else {
//             content.style.maxHeight = content.scrollHeight + 'px';
//         }
//     });

// }


// THREE JS
// Texture Loader
const loader = new THREE.TextureLoader()
const texture = loader.load('/Untitled-5.jpg')
const height = loader.load('height-16.png')
const alpha = loader.load('/alpha-3.png')
const cross = loader.load('/particle-1.png')
const canvas = document.querySelector('canvas.webgl')
const scene = new THREE.Scene()

// Debug
// Must npm install dat.gui in order to use browser overlay
// const gui = new dat.GUI()

// Objects
const geometry = new THREE.PlaneBufferGeometry(3, 3, 1000, 1000);

// Materials
const material = new THREE.MeshStandardMaterial({
    color: 'gray',
    map: texture,
    displacementMap: height,
    displacementScale: .4,
    alphaMap: alpha,
    transparent: true,
    depthTest: false,
})
// material.color = new THREE.Color(0xff0000)

// Mesh


const plane = new THREE.Mesh(geometry, material)
scene.add(plane)
plane.rotation.x = 175;
// gui.add(plane.rotation, 'x').min(0).max(300)


// Lights
const pointLight = new THREE.PointLight('#00ff00', 2.5)
pointLight.position.x = 0.2
pointLight.position.y = 30
pointLight.position.z = -0.3
scene.add(pointLight)

// gui.add(pointLight.position, 'x')
// gui.add(pointLight.position, 'y')
// gui.add(pointLight.position, 'z')

// const col = { color: '#00ff00'}
// gui.addColor(col, 'color').onChange(() => {
//     pointLight.color.set(col.color)
// })

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(60, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 3
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */

const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
// INTERACTION HEIGHT MAP
document.addEventListener('mousemove', animateTerrain)

let mouseY = 0

function animateTerrain(event) {
    mouseY = event.clientY
    mouseX = event.clientX
}


const clock = new THREE.Clock()

const tick = () => {

    const elapsedTime = clock.getElapsedTime()
    // targetX = mouseX * 0.001
    // targetY = mouseY * 0.001
    // Update objects
    // sphere.rotation.y = .5 * elapsedTime
    plane.rotation.z = .15 * elapsedTime
    // plane.rotation.z =+ .05 * (targetX - sphere.rotation.y)

    plane.material.displacementScale = .4 + mouseY * 0.0019

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()