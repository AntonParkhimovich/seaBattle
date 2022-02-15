import store from "../GameStateStore";
import ArragementComponent from "./Arragement";
import base from "../BaseInit";
import game from "./Game";
class ChangeMove {
    body = document.body
    constructor(store, base) {
        this.store = store
        this.base = base
    }
    init() {
        this.addModalWindow()
        this.addOnClickFunc()
        if(this.store.initialState.gameState.winner){
            this.showWinner(this.store.initialState.gameState.winner)
        }
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
        if(state.gameComponent === 'game'){
            if(state.winner){
                window.location.reload()
            }else{
                this.changeMove()
                game.updatePlayer()
            }
        }
        if (state.gameComponent === "arragement") {
            switch (state.move) {
                case 'player1':
                    this.changeMove()
                    this.store.dispatchActions({type:'initField', value: null})
                   ArragementComponent.sortSceneModels() 
                    break;
                case 'player2':
                    ArragementComponent.removeAllListener()
                    this.changeMove()
                    ArragementComponent.removeButton()
                    this.store.dispatchActions({type:'changeGameComponent', value: 'game'})
                    game.init()
                    break
            }
        }

        this.removeModalWindow()
    }
    showWinner(winner){
        const winnerText = document.querySelector('.modal-text')
        winnerText.textContent = `Winner ${winner}!`
        const button = document.querySelector('.modal-button')
        button.textContent = 'new game'
    }

}
const changeMove = new ChangeMove(store, base)
export default changeMove
