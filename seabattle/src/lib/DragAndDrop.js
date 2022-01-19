
import * as THREE from 'three'


class DragAndDrop {
    constructor(scene, camera) {
        this.scene = scene
        this.camera = camera
        this.mouseClickPosition = new THREE.Vector2()
        this.mouseMovePosition = new THREE.Vector2()
        this.rayCaster = new THREE.Raycaster()
        this.draggable = new THREE.Object3D()
    }
    init(){
        this.addListenerOnClick()
    }
    addListenerOnClick(){
        window.addEventListener('click', (event)=>{
            this.mouseClickPosition.x = (event.clientX/window.innerWidth) * 2 - 1
            this.mouseClickPosition.y = (event.clientY/window.innerHeight) * 2 - 1
            this.update()
            const intersectObjects = this.rayCaster.intersectObjects(this.scene.children)
            console.log(intersectObjects)
            if(intersectObjects.length >0 && intersectObjects[0].object.parent.userData.draggable){
                console.log('EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE')
            }
            // console.log(intersectObjects)
        })
    }
    update(){
        this.rayCaster.setFromCamera(this.mouseClickPosition, this.camera)
    }

}
export default DragAndDrop