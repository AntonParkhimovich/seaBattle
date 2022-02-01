import DataParser from "./DataParser";
import store from "../GameStateStore";
import base from "../BaseInit";
import * as THREE from 'three'

class Game extends DataParser {
    player
    enemy
    playerField
    enemyField
    playerShipsModels
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
        this.player = this.store.initialState.gameState.move
        this.enemy = this.player === 'player1'? 'player2': 'player1'
        this.cross = this.base.scene.children[4].children[0]
        this.point = this.base.scene.children[3].children[0]
        this.playerField = this.store.initialState[this.player].field
        this.enemyField = this.store.initialState[this.enemy].field
        this.playerShipsModels = this.base.scene.children[5].children
        this.addEventListenerOnClick()
        this.initEnemyField()
        this.initPlayerField()
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
    initPlayerFieldModelsShip(){
        const playerShipsData = this.store.initialState[this.store.initialState.gameState.move].ships
        playerShipsData.forEach((ship) => {
            let newShip
            switch (ship.deck) {
                case 1:
                    newShip = this.playerShipsModels[1].clone()
                    break;
                case 2:
                    newShip = this.playerShipsModels[2].clone()
                    break;
                case 3:
                    newShip = this.playerShipsModels[3].clone() 
                    break;

                case 4:
                    newShip = this.playerShipsModels[0].clone()
                    break;
            }
            newShip.position.set(ship.position.x, 0.3, ship.position.z)
            newShip.rotation.set(ship.rotation._x, ship.rotation._y, ship.rotation._z)
            this.base.scene.add(newShip)
        })

    }
    initPlayerField() {
        this.initPlayerFieldModelsShip()
        this.playerField.forEach((row)=>{
            row.forEach((cell)=>{
                const planePosition = new THREE.Vector3(-(cell.x), 0, -(cell.y))
                if(cell.shot&& cell.containsShip){
                    this.addCross(planePosition)
                }if(cell.shot && !cell.containsShip){
                    this.addPoint(planePosition)
                }
            })
        })
    }
    initEnemyField() {
        this.enemyField.forEach((row) => {
            row.forEach((cell) => {
                const planePosition = new THREE.Vector3(-(cell.x), 0, -(cell.y) - 12)
                if (cell.shot && cell.containsShip) {
                    this.addCross(planePosition)
                } if (cell.shot && !cell.containsShip) {
                    this.addPoint(planePosition)
                }
            })
        })
    }
}
export default Game