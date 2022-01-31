import DataParser from "./DataParser";
import store from "../GameStateStore";
import base from "../BaseInit";
import * as THREE from 'three'

class Game extends DataParser {
    playerField
    enemyField
    playerShips
    shotCoordinates = new THREE.Vector2()
    cross
    point
    constructor(store, data, base) {
        super(base, data)
        this.store = store
        this.base = base
    }
    async init() {
        await super.init()
        this.store.getLocalstorage()
        this.cross = this.base.scene.children[4].children[0]
        this.point = this.base.scene.children[3].children[0]
        this.enemyField = this.store.initialState[this.store.initialState.gameState.move].field
        console.log(this.store.initialState);
        // this.playerShips = this.store.initialState[this.store.initialState.gameState.move].ships
        // this.playerShips.forEach(ship=> this.base.scene.add(ship))
        this.addEventListenerOnClick()
        this.initEnemyField()
    }
    addEventListenerOnClick() {
        window.addEventListener('click', () => {
            const raycaster = this.base.raycaster
            const intersect = raycaster.intersectObject(this.base.scene.children[2])
            this.normalizeShotCoordinates(intersect)
            if (this.shotCoordinates.x >= 0 && this.shotCoordinates.y >= 0) {
                this.store.dispatchActions({ type: 'shot', value: this.shotCoordinates })
                const resultShot = this.store.initialState.gameState.resultShot
                let intersectCoordinates = intersect[0].point.ceil()
                if (resultShot === "HIT" || resultShot === 'KILL') {
                    this.addCross(intersectCoordinates)
                } if (resultShot === 'MISS') {
                    this.addPoint(intersectCoordinates)
                }
            }
        })
    }
    normalizeShotCoordinates(intersect) {
        this.shotCoordinates.x = -(intersect[0].point.x + 1)
        this.shotCoordinates.y = -(intersect[0].point.z + 13)
        this.shotCoordinates.ceil()
    }
    addCross(position) {
        const cross = this.cross.clone()
        cross.position.set(position.x - 0.5, 0.001, position.z - .5)
        cross.visible = true
        this.base.scene.add(cross)
    }
    addPoint(position) {
        const point = this.point.clone()
        point.position.set(position.x - 0.5, 0.001, position.z - .5)
        point.visible = true
        this.base.scene.add(point)
    }
    initEnemyField(){
        this.enemyField.forEach((row, x)=>{
            row.forEach((cell)=>{
                const planePosition =  new THREE.Vector3(-(cell.x),0, -(cell.y)-12)
                if(cell.shot && cell.containsShip){
                    this.addCross(planePosition)
                }if(cell.shot&& !cell.containsShip){
                    this.addPoint(planePosition)
                }
            })
        })
    }
}
export default Game