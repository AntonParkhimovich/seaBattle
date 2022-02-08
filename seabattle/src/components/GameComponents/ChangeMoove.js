import store from "../GameStateStore";
import ArragementComponent from "./Arragement";
import base from "../BaseInit";
import ArragementSceneData from '../../Scene Data/ArragementScene'
import { PlaneBufferGeometry } from "three";
import game from "./Game";
import GameSceneData from "../../Scene Data/GameScene";
class ChangeMove {
    body = document.body
    constructor(store, base) {
        this.store = store
        this.base = base
    }
    init() {
        this.addModalWindow()
        this.addOnClickFunc()
    }
    addModalWindow() {
        let { move } = this.store.initialState.gameState
        const nextMove = move === 'player1'? 'player2':'player1' 
        this.body.insertAdjacentHTML('afterbegin',
            `<div class="modal">
                             <span class="modal-text">Get ready ${nextMove}!</span>
                             <button class="modal-button">GO!</button>
                         </div>`
        )
    }
    removeModalWindow() {
        let modal = document.querySelector('.modal')
        modal.remove()
    }
    changeMove() {
        this.store.dispatchActions({ type: "changeMove", value: null })
        const move = this.store.initialState.gameState.move
        if(move === 'player1'){
            this.base.camera.position.set(0, 20,8)
            this.base.camera.rotation.set(-0.56, 0, 0)
        }else{
            this.base.camera.position.z = -8
            this.base.camera.rotation.set(0.56,-Math.PI, 0)
        }
    }
    addOnClickFunc() {
        const button = document.querySelector('.modal-button')
        button.onclick = () => this.onClickFunc()
    }
    onClickFunc() {
        const state = this.store.initialState.gameState  
        if (state.gameComponent === "arragement") {
            debugger
            switch (state.move) {
                case 'player1':
                    this.changeMove()
                    this.store.dispatchActions({type:'initField', value: null})
                   ArragementComponent.sortSceneModels()
                   console.log(state); 
                    break;
                case 'player2':
                    ArragementComponent.removeAllListener()
                    this.changeMove()
                    this.store.addLocalStore()
                    ArragementComponent.removeButton()
                    game.init()
                    break
            }

        }

        this.removeModalWindow()
    }


}
const changeMove = new ChangeMove(store, base)
export default changeMove
