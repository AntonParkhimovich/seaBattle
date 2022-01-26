import DataParser from "./DataParser";
import base from "../BaseInit";
import ArragementSceneData from '../../Scene Data/ArragementScene'
import * as THREE from 'three'
import {checkBattleField} from './../checkBattleFIeld'
import store from "../GameStateStore";
class Arragement extends DataParser {
    draggableObject = null
    plane = []
    ships = []
    initialDraggableObjectPosition = new THREE.Vector2()
    directionShips = 'horizontally'
    constructor(base, data, store) {
        super(base, data);
        this.store = store
    }

   async init() {
        await super.init();
        this.addListenerOnClick()
        this.addEventListenerOnMouseMove()
        this.addButton()
        this.sortSceneModels()
        this.store.dispatchActions({type:'initField', value: null})
       console.log(this.store.initialState.player1.field)
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
        let x = positionShip.x
        let y = -positionShip.y
        // checkBattleField(x,y, this.draggableObject.deck,this.store.initialState.field )
        this.draggableObject.position.x = positionShip.x-.5
        this.draggableObject.position.z = positionShip.y-.3
        this.draggableObject = null
    }
    onDragStart(){
        const intersectObjects = this.base.raycaster.intersectObjects(this.ships)
        if(intersectObjects.length> 0 ){
            this.draggableObject = intersectObjects[0].object.parent
        }
    }
    addButton(){
        const button = document.createElement('button')
        button.textContent = 'Change Direction'
        button.className = 'button'
        document.body.appendChild(button)
        button.onclick  = ()=>this.changeShipDirection()
    }
    changeShipDirection(){
        const shipRotation = this.directionShips === 'horizontally'? 1.6 : 0
        this.ships.forEach(ship=> ship.rotation.y = shipRotation)
        this.directionShips= this.directionShips === 'horizontally'?'vertically': "horizontally"
    }
    sortSceneModels(){
        const models = this.base.scene.children[2].children
        const {shipsConfig}= this.data
        models.forEach(model=>{
            if(model.name in shipsConfig){
                model.deck = shipsConfig[model.name].shipDeck
                this.ships.push(model)
            }else{
                this.plane.push(model)
            }
        })
    }
}

const ArragementComponent = new Arragement(base, ArragementSceneData, store)
export default ArragementComponent