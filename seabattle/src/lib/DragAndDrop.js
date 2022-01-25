import * as THREE from 'three'

const raycaster = new THREE.Raycaster()

class DragAndDrop {
    constructor(scene, camera, arrayObjects, ground, mousePosition) {
        this.scene = scene
        this.camera = camera
        this.mousePosition = mousePosition
        this.draggableObject = null
        this.draggableObectsArray = arrayObjects
        this.ground = ground
    }

    init() {
        this.addListenerOnMouseMove()
        this.addListenerOnClick()
    }



    addListenerOnMouseMove() {
        window.addEventListener('mousemove', (event) => {
            this.updateDragObject()
        })
    }

    updateDragObject(event) {
        let foundIntersec = raycaster.intersectObject(this.ground, false)
        if (this.draggableObject !== null && foundIntersec.length > 0) {
            this.draggableObject.parent.position.x = foundIntersec[0].point.x
            this.draggableObject.parent.position.y = (foundIntersec[0].point.y)
        }
    }

    checkDraggableObjects(object) {
        let draggableObject = null
        object.traverseAncestors((obj) => {
            if (obj.userData.draggable) {
                draggableObject = obj
            }
        })
        return draggableObject
    }

    update() {
        raycaster.setFromCamera(this.mousePosition, this.camera)
    }
}

export default DragAndDrop