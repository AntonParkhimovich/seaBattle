import * as THREE from 'three'
import StartComponent from "./GameComponents/Start";
import {shipsField} from '../objects/shipsField'
import base from "./BaseInit";

class App {

    constructor(store, base) {
        this.store = store
        this.base = base
    }
    init() {
        this.base.init()
        this.changeGameState()
        StartComponent.init()
    }
    changeGameState(){
    }

}

export default App