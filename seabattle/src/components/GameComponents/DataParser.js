import base from "../BaseInit";
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

class DataParser {
    loading = true
    loader = new GLTFLoader()

    constructor(base, data) {
        this.base = base
        this.data = data
    }

    async init() {
        for (const object of this.data.objects) {
            let { rotation } = object
            const model = await this.parseModelsInScene(object.url)
            model.scene.rotation.set(rotation.x, rotation.y, rotation.z)
            if ('visible' in object) {
                model.scene.visible = object.visible
            }
            this.base.scene.add(model.scene)
        }
        this.setCameraPosition()
    }


    parseModelsInScene(url) {
        const gltfLoader = this.loader
        return new Promise(((resolve, reject) => { gltfLoader.load(url, data => resolve(data), null, reject) }))
    }
    setCameraPosition() {
        let { position } = this.data.camera
        let { rotation } = this.data.camera
        this.base.camera.position.set(position.x, position.y, position.z)
        this.base.camera.rotation.set(rotation.x, rotation.y, rotation.z)
    }
    setControls() {
        let { controls } = this.data
        this.base.controls.enabled = controls
    }
    removeAllModels() {
        const children = this.base.scene.children.slice()
        children.forEach((model) => {
            if (model.type === 'Group') {
                this.base.scene.remove(model)
            }
        })
    }
    removeModel(model) {
        model.removeFromParent()
    }
}
export default DataParser
