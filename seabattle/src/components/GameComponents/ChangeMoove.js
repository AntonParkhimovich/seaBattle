import store from "../GameStateStore";
import ArragementComponent from "./Arragement";
import base from "../BaseInit";
import ArragementSceneData from '../../Scene Data/ArragementScene'
import { PlaneBufferGeometry } from "three";
import Game from "./Game";
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
        this.body.insertAdjacentHTML('afterbegin',
            `<div class="modal">
                             <span class="modal-text">Get ready ${move}!</span>
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
    }
    addOnClickFunc() {
        const button = document.querySelector('.modal-button')
        button.onclick = () => this.onClickFunc()
    }
    onClickFunc() {
        const state = this.store.initialState.gameState          
        if (state.gameComponent === "arragement") {
            switch (state.move) {
                case 'player1':
                    this.store.dispatchActions({type:'changeMove', value: null })
                   this.base.camera.position.z = -8
                   this.base.camera.rotation.set(0.56,-Math.PI, 0)
                   this.base.camera.updateProjectionMatrix()
                   this.store.dispatchActions({type:'initField', value: null})
                   ArragementComponent.sortSceneModels()
                    break;
                case 'player2':
                    console.log(this.store.initialState);
                    break
            }

        }

        this.removeModalWindow()
    }


}
const changeMove = new ChangeMove(store, base)
export default changeMove
