import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
const objectsName = ["fourDeck", "threeDeck","twoDeck", "oneDeck"]
const loader =  new GLTFLoader()
export const ships = []
export const loadShips = (ground) => {
objectsName.forEach((name,index)=>{
    loader.load(`/objects/${name}.gltf`,(gltf)=> {
        const object = gltf.scene
        console.log(object)
        // ships.push(object)
        // ground.add(object)
        object.children[0].userData.draggable = true
        object.rotation.x = Math.PI* .5
        object.position.x = -index*1.5
    })
})
}


