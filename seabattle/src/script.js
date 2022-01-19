import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import {shipsField} from "./objects/shipsField";
import * as dat from 'dat.gui';
import {loadShips, ships} from "./objects/ships";
import {DragControls} from "three/examples/jsm/controls/DragControls";
import {Vector2} from "three";
import DragAndDrop from "./lib/DragAndDrop";
/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')
const gui = new dat.GUI()
// Scene
export const scene = new THREE.Scene()
scene.add(shipsField)
//LoadingObjects
loadShips(shipsField)


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
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
//Lights
const ambientLight =  new THREE.AmbientLight(0xffffff, .5)
scene.add(ambientLight)
/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 11

scene.add(camera)
camera.lookAt(0,0,0)
// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha:true,

})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
const controls = new OrbitControls( camera, renderer.domElement );
controls.update()
/**
 * Animate
 */
const clock = new THREE.Clock()
//RayCasting

const dnd = new DragAndDrop(shipsField, camera)
dnd.init()
const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()
    // Update raycaster
   dnd.update()
    // const intersects = raycast.intersectObjects(scene.children)
    // console.log(intersects)

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()