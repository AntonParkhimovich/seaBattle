import store from "../GameStateStore";
import Arragement from "./Arragement";
import base from "../BaseInit";
import ArragementSceneData from '../../Scene Data/ArragementScene'
import { PlaneBufferGeometry } from "three";
import Game from "./Game";
import GameSceneData from "../../Scene Data/GameScene";
class ChangeMove {
    body = document.body
    constructor(store) {
        this.store = store
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
        if (state.gameComponent === 'game') {
        }
        if (state.gameComponent === "arragement") {
            switch (state.move) {
                case 'player1':
                    this.store.dispatchActions({ type: 'changeMove', value: null })
                    const ArragementComponent = new Arragement(base, ArragementSceneData, store)
                    ArragementComponent.init()
                    break;
                case 'player2':
                    this.store.dispatchActions({ type: 'changeMove', value: null })
                    this.store.dispatchActions({ type: 'changeGameComponent', value: 'game' })
                    const game = new Game(store, GameSceneData, base)
                    game.init()
                    break
            }

        }

        this.removeModalWindow()
    }


}
const changeMove = new ChangeMove(store)
export default changeMove
