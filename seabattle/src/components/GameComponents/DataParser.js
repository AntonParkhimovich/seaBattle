import base from "../BaseInit";
import * as THREE from 'three'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import startSceneData from "../../Scene Data/StartScene";
import {mod} from "three/examples/jsm/renderers/nodes/ShaderNode";
class DataParser {
    loading = true
    loader = new GLTFLoader()

    constructor(base, data) {
        this.base = base
        this.data = data
    }

   async init() {
        const object = this.data.objects[0]
        let {rotation} = object
        const models = await this.parseModelsInScene(object.url)
        models.scene.rotation.set(rotation.x, rotation.y, rotation.z)
        this.base.scene.add(models.scene)
        this.setCameraPosition()
        this.setControls()
    }


    parseModelsInScene(url) {
        const gltfLoader = this.loader
            return new Promise(((resolve, reject) => {gltfLoader.load(url, data=>resolve(data), null, reject)}))
    }
    setCameraPosition(){
        let{position}= this.data.camera
        this.base.camera.position.set(position.x, position.y, position.z)
    }
    setControls(){
        let {controls} = this.data
        this.base.controls.enabled = controls
    }
    removeAllModels(){
        this.base.scene.children.forEach((model)=>{
            if(model.type === 'Group'){
                model.removeFromParent()
            }
        })
    }
    removeModel(model){
        model.removeFromParent()
    }
}
export default DataParser
