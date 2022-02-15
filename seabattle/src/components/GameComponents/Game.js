import DataParser from "./DataParser";
import store from "../GameStateStore";
import base from "../BaseInit";
import { Vector2 } from "three";
import changeMove from "./ChangeMoove";
import GameSceneData from "../../Scene Data/GameScene";

class Game extends DataParser {
    player
    enemy
    playerField
    enemyField
    playerShipsModels
    shotCoordinates = new Vector2()
    cross
    point
    constructor(store, data, base) {
        super(base, data)
        this.store = store
        this.base = base
    }
    async init() {
        await super.init()
        this.updatePlayer()
        this.initGameLog()
        this.point = this.base.scene.children[3].getObjectByName('planePoint')
        this.cross = this.base.scene.children[3].getObjectByName('planeCross')
        this.addEventListenerOnClick()
    }
    addEventListenerOnClick() {
        window.addEventListener('click', () => {
            const planeEnemy = this.player === 'player1'?this.base.scene.children[2].children[0].children[11]:this.base.scene.children[2].children[1].children[10]
            const raycaster = this.base.raycaster
            const intersect = raycaster.intersectObject(planeEnemy)
            if(intersect.length>0){
                const intersectCoordinates = intersect[0].point
                this.normalizeShotCoordinates(intersectCoordinates)
                if(this.enemyField[this.shotCoordinates.y][this.shotCoordinates.x].shot === false){
                    this.store.dispatchActions({ type: 'shot', value: this.shotCoordinates })
                    const resultShot = this.store.initialState.gameState.resultShot
                    this.updateGameLog(this.player, resultShot)
                    if (resultShot === "HIT" || resultShot === 'KILL') {
                        this.addCross(intersectCoordinates)
                        if(this.store.initialState.gameState.winner){
                            changeMove.init()
                        }
                    } if (resultShot === 'MISS') {
                        this.addPoint(intersectCoordinates)
                        changeMove.init()
                    }
                }
                
            }
           
        })
    }
    addCross(position) {
        const cross = this.cross.clone()
        position.ceil()
        cross.position.set(position.x - 0.5, 0.001, position.z - .5)
        cross.visible = true
        this.base.scene.add(cross)
        const cross2 = this.cross.clone()
        if(this.player === 'player1'){
            cross2.position.set((13-position.x)-0.5, 0.001, (1-position.z)-.5)
        }else{
            cross2.position.set((-11-position.x)-0.5, 0.001, (1-position.z)-.5)
        }
        cross2.visible = true
        this.base.scene.add(cross2)
    }
    addPoint(position) {
        const point = this.point.clone()
        position.ceil()
        point.position.set(position.x - 0.5, 0.001, position.z - .5)
        point.visible = true
        this.base.scene.add(point)
        const point2 = this.point.clone()
        if(this.player === 'player1'){
            point2.position.set((13-position.x)-0.5, 0.001, (1-position.z)-.5)
        }else{
            point2.position.set((-11-position.x)-0.5, 0.001, (1-position.z)-.5)
        }
        point2.visible = true
        this.base.scene.add(point2)
    }
    normalizeShotCoordinates(coords){
        if(this.player ==='player1'){
            this.shotCoordinates.x = - coords.z -11
            this.shotCoordinates.y = coords.x - 2
            this.shotCoordinates.ceil()
        }else{
            this.shotCoordinates.x = coords.z -11
            this.shotCoordinates.y = -coords.x -2
            this.shotCoordinates.ceil()
        }
    }
    updatePlayer(){
        this.player = this.store.initialState.gameState.move
        this.enemy = this.player === 'player1'? 'player2': 'player1'
        this.playerField = this.store.initialState[this.player].field
        this.enemyField = this.store.initialState[this.enemy].field
    }
    initGameLog(){
        document.body.insertAdjacentHTML('afterbegin',`
            <div class='game-log__wrapper'>
                <h2 class='game-log__title'>Game log:</h2>
                <div class= 'game-log'>

                </div>
            </div>
        `)
    }
    updateGameLog(player, resultShot){
        const gameLog = document.querySelector('.game-log')
        const message =  document.createElement('span')
        message.textContent = `${player}: ${resultShot}`
        gameLog.appendChild(message)
    }
}
const game = new Game(store,GameSceneData,base)
export default game