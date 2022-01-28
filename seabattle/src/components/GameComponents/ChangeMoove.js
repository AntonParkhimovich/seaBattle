import store from "../GameStateStore";
import Arragement from "./Arragement";
import base from "../BaseInit";
import ArragementSceneData from '../../Scene Data/ArragementScene'
class ChangeMove {
    body = document.body
    constructor(store) {
        this.store = store
    }
    init(){
        this.addModalWindow()
        this.addOnClickFunc()
    }
    addModalWindow(){
        let {move} = this.store.initialState.gameState
        this.body.insertAdjacentHTML('afterbegin',
            `<div class="modal">
                             <span class="modal-text">Get ready ${move}!</span>
                             <button class="modal-button">GO!</button>
                         </div>`
            )
    }
    removeModalWindow(){
        let modal =  document.querySelector('.modal')
        modal.remove()
    }
    changeMove(){
        this.store.dispatchActions({type:"changeMove", value: null})
    }
    addOnClickFunc(){
        const button = document.querySelector('.modal-button')
        button.onclick = ()=> this.onClickFunc()
    }
    onClickFunc(){
        const state = this.store.initialState.gameState
        if(state.gameComponent === 'game'){
            console.log(this.store)
        }
        if(state.gameComponent === 'arragement'){
            if(state.move === 'player1'){
                const ArragementComponent = new Arragement(base, ArragementSceneData, store)
                ArragementComponent.init()
                this.store.dispatchActions({type:'changeGameComponent', value: 'game'})
            }
        }
        if(state.gameComponent === "start"){
            const ArragementComponent = new Arragement(base, ArragementSceneData, store)
            ArragementComponent.init()
            this.store.dispatchActions({type:'changeGameComponent', value: 'arragement'})
        }

        this.removeModalWindow()
        state.gameComponent === 'start'? null: this.changeMove()
    }


}
const changeMove = new ChangeMove(store)
export default changeMove
