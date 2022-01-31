import DataParser from "./DataParser";
import base from "../BaseInit";
import startSceneData from "../../Scene Data/StartScene";
import changeMove from "./ChangeMoove";
import ArragementComponent from "./Arragement";
import Game from "./Game";
import GameSceneData from '../../Scene Data/GameScene'
import store from "../GameStateStore";
import ArragementSceneData from "../../Scene Data/ArragementScene";
class Start extends DataParser{
    constructor(base, startSceneData) {
        super(base, startSceneData);
    }
    init() {
        super.init();
        this.addListenerOnClick()
    }
    addListenerOnClick() {
        let {raycaster} = this.base
        let listener = () => {
            const foundIntersec = raycaster.intersectObject(this.base.scene.children[2])
            if (foundIntersec.length > 0) {
                this.removeAllModels()
                const game = new Game(store, GameSceneData, base)
                game.init()
                // const Arragement = new ArragementComponent(base, ArragementSceneData, store)
                // Arragement.init()
                window.removeEventListener('click', listener)
            }
        }
        window.addEventListener('click', listener)
    }
}
const StartComponent = new Start(base, startSceneData)
export default StartComponent