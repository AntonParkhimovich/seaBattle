import DataParser from "./DataParser";
import store from "../GameStateStore";
import base from "../BaseInit";
import * as THREE from 'three'


class Game extends DataParser{
    playerField
    enemyField
    playerShips
    shotCoordinates = new THREE.Vector2()
    constructor(store, data, base) {
        super(base, data)
        this.store = store
        this.base = base
    }
    async init(){
        await super.init()
        this.store.getLocalstorage()
        // this.playerShips = this.store.initialState[this.store.initialState.gameState.move].ships
        // this.playerShips.forEach(ship=> this.base.scene.add(ship))
        this.addEventListenerOnClick()
        console.log(this.store)
    }
    addEventListenerOnClick(){
        window.addEventListener('click',()=>{
            const raycaster = this.base.raycaster
           const intersect = raycaster.intersectObject(this.base.scene.children[2])
          this.normalizeShotCoordinates(intersect)
          this.store.dispatchActions({type: 'shot', value: this.shotCoordinates})
        })
    }
    normalizeShotCoordinates(intersect){
        this.shotCoordinates.x = -(intersect[0].point.x+1)
        this.shotCoordinates.y = -(intersect[0].point.z + 13)
        this.shotCoordinates.ceil()
        console.log(this.shotCoordinates)
    }
}
export default Game