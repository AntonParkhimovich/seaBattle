import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
class BaseInit {
    sizes = {
        width: window.innerWidth,
        height: window.innerHeight
    }
    canvas = document.querySelector('canvas.webgl')
    camera = new THREE.PerspectiveCamera(60, this.sizes.width / this.sizes.height, 0.1, 100)
    scene = new THREE.Scene()
    light = new THREE.AmbientLight(0xffffff, .5)
    renderer = new THREE.WebGLRenderer({
        canvas: this.canvas,
        alpha: true
    })
    clock = new THREE.Clock()
    pixelRatio = Math.min(window.devicePixelRatio, 2)
    raycaster =  new THREE.Raycaster()
    mousePosition = new THREE.Vector2()
    axisHelper = new THREE.AxesHelper(20)
    gui = new dat.GUI()

    init() {
        this.resizeWindow()
        this.addToScene(this.camera)
        this.addToScene(this.light)
        this.renderer.setSize(this.sizes.width, this.sizes.height)
        this.renderer.setPixelRatio(this.pixelRatio)
        // this.controls.enableDamping = true
        this.addListenerOnMouseMove()
        this.start()
        // this.gui.add(this.scene.rotation, 'x').step(.001)
        // this.gui.add(this.scene.rotation, 'y').step(.001)
      
        // this.gui.add(this.scene.position, 'x')
        // this.gui.add(this.scene.position, 'y')
        // this.gui.add(this.scene.position, 'z')
       
        // this.scene.rotation.y = Math.PI
        this.gui.add(this.camera.position, 'x').step(.1)
        this.gui.add(this.camera.position, 'y').step(.1)
        this.gui.add(this.camera.position, 'z').step(.1)
        this.gui.add(this.camera.rotation, 'y').step(.01)
        this.gui.add(this.camera.rotation, 'x').step(.01)
        this.gui.add(this.camera.rotation, 'z').step(.01)


        // this.gui.add(this.camera, 'zoom')
        this.camera.updateProjectionMatrix();
        console.log(this.camera);
    }
    start(){
        window.requestAnimationFrame(this.tick.bind(this))
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
    addListenerOnMouseMove(){
        window.addEventListener('mousemove', (event)=>{
            this.mousePosition.x = ( event.clientX / window.innerWidth ) * 2 - 1;
            this.mousePosition.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
        })
    }
    addToScene(object){
        this.scene.add(object)
    }
    tick(){
        // this.controls.update()
        // this.camera.updateProjectionMatrix();
        this.renderer.render(this.scene, this.camera)
        this.raycaster.setFromCamera(this.mousePosition, this.camera)
        window.requestAnimationFrame(this.tick.bind(this))
    }

}
 const base = new BaseInit()
export default base