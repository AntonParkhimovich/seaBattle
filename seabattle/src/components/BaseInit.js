import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
class BaseInit {
    sizes = {
        width: window.innerWidth,
        height: window.innerHeight
    }
    canvas = document.querySelector('canvas.webgl')
    camera = new THREE.PerspectiveCamera(75, this.sizes.width / this.sizes.height, 0.1, 100)
    scene = new THREE.Scene()
    light = new THREE.AmbientLight(0xffffff, .5)
    renderer = new THREE.WebGLRenderer({
        canvas: this.canvas,
        alpha: true
    })
    clock = new THREE.Clock()
    pixelRatio = Math.min(window.devicePixelRatio, 2)
    controls = new OrbitControls(this.camera, this.canvas)
    start(){
        window.requestAnimationFrame(this.tick.bind(this))
    }
    init() {
        this.resizeWindow()
        this.addToScene(this.camera)
        this.addToScene(this.light)
        this.renderer.setSize(this.sizes.width, this.sizes.height)
        this.renderer.setPixelRatio(this.pixelRatio)
        this.controls.enableDamping = true
        this.start()
        this.controls.enableDamping = true
    }
    resizeWindow(){
        window.addEventListener('resize',(event)=>{
            this.sizes.width = window.innerWidth
            this.sizes.height = window.innerHeight
            this.camera.aspect = this.sizes.width / this.sizes.height
            this.camera.updateProjectionMatrix()
            this.renderer.setSize(this.sizes.width, this.sizes.height)
            this.renderer.setPixelRatio(this.pixelRatio)
        })
    }
    addToScene(object){
        this.scene.add(object)
    }
    tick(){
        this.controls.update()
        this.renderer.render(this.scene, this.camera)
        window.requestAnimationFrame(this.tick.bind(this))
    }
}
 const base = new BaseInit()
export default base