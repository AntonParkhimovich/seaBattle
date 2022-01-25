import DataParser from "./DataParser";
import base from "../BaseInit";
import ArragementSceneData from '../../Scene Data/ArragementScene'
import * as THREE from 'three'
import DragAndDrop from "../../lib/DragAndDrop";

class Arragement extends DataParser {
    draggableObject = null
    plane = []
    ships = []
    initialDraggableObjectPosition = new THREE.Vector2()

    constructor(base, data) {
        super(base, data);
    }

    init() {
        super.init();
        this.addListenerOnClick()
        this.addEventListenerOnMouseMove()
    }
    addListenerOnClick() {
        window.addEventListener('click', (event) => {
            if (this.draggableObject) {
                this.onDragEnd()
            } else {
                this.onDragStart()
            }

        })
    }
    addEventListenerOnMouseMove() {
        window.addEventListener('mousemove', (event) => {
            if (this.draggableObject !== null) {
                // const shipPosition = new THREE.Vector3()
                // const plane =  this.gltfModels
                // const instersect = this.base.raycaster.intersectPlane()
                this.draggableObject.position.z = -(this.base.mousePosition.x)*25
                this.draggableObject.position.x = -(this.base.mousePosition.y)*16

            }
        })
    }
    onDragEnd(){
        const positionShip = new THREE.Vector2()
        positionShip.x = this.draggableObject.position.x
        positionShip.y= this.draggableObject.position.z
        positionShip.ceil()
        this.draggableObject.position.x = positionShip.x-.5
        this.draggableObject.position.z = positionShip.y-.3
        console.log(this.draggableObject)
        this.draggableObject = null
    }
    onDragStart(){
        this.gltfModels[0].children.forEach(child=>{
            if(child.name!=='Plane001'&& child.name!== 'Plane002') this.ships.push(child)
            else this.plane.push(child)
        })
        const intersectObjects = this.base.raycaster.intersectObjects(this.ships)
        if(intersectObjects.length> 0 ){
            this.draggableObject = intersectObjects[0].object.parent
        }
    }
}

const ArragementComponent = new Arragement(base, ArragementSceneData)
export default ArragementComponent