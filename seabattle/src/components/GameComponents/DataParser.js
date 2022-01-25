import base from "../BaseInit";
import * as THREE from 'three'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import startSceneData from "../../Scene Data/StartScene";
import {mod} from "three/examples/jsm/renderers/nodes/ShaderNode";

class DataParser {
    gltfModels = []
    loading = true
    loader = new GLTFLoader()

    constructor(base, data) {
        this.base = base
        this.data = data
    }

    init() {
        const object = this.data.objects[0]
        this.parseModelsInScene(object.url)
            .then((data)=> data.scene)
            .then((data)=> {
                let {rotation} = object
                data.rotation.set(rotation.x,rotation.y,rotation.z)
                base.scene.add(data)
                this.gltfModels.push(data)
                return data
            })

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
        this.gltfModels.forEach((model)=>{
            model.removeFromParent()
        })
    }
    removeModel(model){
        model.removeFromParent()
    }
}
export default DataParser
