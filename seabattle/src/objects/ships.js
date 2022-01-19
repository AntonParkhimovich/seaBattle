import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import * as THREE from 'three'
const objectsName = ["fourDeck", "threeDeck","twoDeck", "oneDeck"]
const loader =  new GLTFLoader()
export const ships = []
export const loadShips = (scene) => {
objectsName.forEach((name,index)=>{
    loader.load(`/objects/${name}.gltf`,(gltf)=> {
     // debugger
        const object = gltf.scene
        object.children[0].userData.draggable = true
        object.rotation.x = Math.PI* .5
        object.position.x = -index*1.5
        ships.push(object)
        scene.add(object)
    })
})
}


