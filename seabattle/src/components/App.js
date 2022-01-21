import * as THREE from 'three'
import start from "./GameComponents/Start";
import {shipsField} from '../objects/shipsField'
import base from "./BaseInit";
class App {

    constructor(store, base) {
        this.store = store
        this.base = base
    }
    init() {
        this.base.init()
        this.base.camera.position.z = 11
        this.base.addToScene(shipsField)
        this.changeGameState()
        start.init()
    }
    changeGameState(){
        this.store.dispatchActions({type:'changeGameComponent',value: 'shot'})
        console.log(this.store.initialState)
    }

}

export default App