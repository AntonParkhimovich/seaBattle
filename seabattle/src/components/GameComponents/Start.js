import DataParser from "./DataParser";
import base from "../BaseInit";
import startSceneData from "../../Scene Data/StartScene";
import ArragementComponent from "../GameComponents/Arragement";
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
            const foundIntersec = raycaster.intersectObject(this.gltfModels[0])
            if (foundIntersec.length > 0) {
                this.removeAllModels()
                ArragementComponent.init()
                window.removeEventListener('click', listener)
            }
        }
        window.addEventListener('click', listener)

    }
}
const StartComponent = new Start(base, startSceneData)
export default StartComponent