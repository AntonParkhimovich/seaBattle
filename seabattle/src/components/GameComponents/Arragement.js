import DataParser from "./DataParser";
import base from "../BaseInit";
import ArragementSceneData from '../../Scene Data/ArragementScene'
import * as THREE from 'three'
import {checkBattleField} from './../checkBattleFIeld'
import store from "../GameStateStore";
import Game from "./Game";
import changeMove from "./ChangeMoove";
class Arragement extends DataParser {
    draggableObject = null
    plane = []
    ships = []
    startShipPosition = new THREE.Vector3()
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
       console.log(this.base.scene.children)
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
                this.draggableObject.position.z = -(this.base.mousePosition.x)*30
                this.draggableObject.position.x = -(this.base.mousePosition.y)*16
            }
        })
    }
    onDragEnd(){
        const positionShip = new THREE.Vector2()
        positionShip.x = this.draggableObject.position.x
        positionShip.y= this.draggableObject.position.z
        positionShip.ceil()
        let x = -positionShip.x
        let y = -positionShip.y
        this.addShipOnPlane(x,y)
    }
    onDragStart(){
        const intersectObjects = this.base.raycaster.intersectObjects(this.ships)
        if(intersectObjects.length> 0 ){
            this.draggableObject = intersectObjects[0].object.parent
            this.startShipPosition.x = this.draggableObject.position.x
            this.startShipPosition.z = this.draggableObject.position.z
            this.startShipPosition.y = this.draggableObject.position.y
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
    addShipOnPlane(x,y){
        const resultsCheck = checkBattleField(x,y, this.draggableObject.deck,this.store.initialState[this.store.initialState.gameState.move].field, this.directionShips, this.ships)
        if(resultsCheck.checkCell){
            this.draggableObject.position.x = -x-.5
            this.draggableObject.position.z = -y-.3
            this.store.dispatchActions({type:'addShip', value: this.draggableObject})
            this.store.dispatchActions({type: 'addShipCell', value: resultsCheck.shipCell})
            this.store.dispatchActions({type: 'blockCell', value: resultsCheck.cell})
            this.ships.forEach((ship, index)=> ship.name === this.draggableObject.name ? this.ships.splice(index, 1): null)
            this.draggableObject = null
           if(this.ships.length === 0){
               this.store.addLocalStorage()
               // if(this.store.initialState.gameState.move === "player2"){
               //     this.removeAllModels()
               // } else {
               //     this.removeAllShips()
               // }
               // // const game = new Game(store, base)
               // // game.init()
               //     changeMove.init()
           }
        }else {
            this.draggableObject.position.x = this.startShipPosition.x
            this.draggableObject.position.y = this.startShipPosition.y
            this.draggableObject.position.z = this.startShipPosition.z
            this.draggableObject = null
        }
    }
    removeAllShips(){
        this.removeAllModels()
        this.plane.forEach(plane => this.base.scene.add(plane))
    }

}


export default Arragement