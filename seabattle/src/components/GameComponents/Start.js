import DataParser from "./DataParser";
import base from "../BaseInit";
import startSceneData from "../../Scene Data/StartScene";
import ArragementComponent from "./Arragement";
import store from "../GameStateStore";
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
                ArragementComponent.init()
                store.dispatchActions({type:'changeGameComponent', value:'arragement'})
                window.removeEventListener('click', listener)
            }
        }
        window.addEventListener('click', listener)
    }
}
const StartComponent = new Start(base, startSceneData)
export default StartComponent