import * as THREE from 'three'

const raycaster = new THREE.Raycaster()

class DragAndDrop {
    constructor(scene, camera, arrayObjects, ground) {
        this.scene = scene
        this.camera = camera
        this.mousePosition = new THREE.Vector2()
        this.draggableObject = null
        this.draggableObectsArray = arrayObjects
        this.ground = ground
    }

    init() {
        this.addListenerOnMouseMove()
        this.addListenerOnClick()
    }

    addListenerOnClick() {
        window.addEventListener('click', (event) => {
            if (this.draggableObject !== null) {
                this.draggableObject = null
            } else {
                const intersectObjects = rayCaster.intersectObjects(this.draggableObectsArray)
                if (intersectObjects.length > 0) {
                    this.draggableObject = this.checkDraggableObjects(intersectObjects[0].object)
                }
            }
        })
    }

    addListenerOnMouseMove() {
        window.addEventListener('mousemove', (event) => {
            this.mousePosition.x = (event.clientX / window.innerWidth) * 2 - 1
            this.mousePosition.y = -(event.clientY / window.innerHeight) * 2 + 1
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