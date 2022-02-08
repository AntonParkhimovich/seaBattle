const GameSceneData = {
    objects:[{
        name:'game',
        position:{x: 0, y: 0, z: 0},
        rotation: {x: 0, y:0, z:0},
        url:"/objects/gameTest.gltf"
    },
    {
        name:'crossPlaneGroup',
        position:{x: 0, y: 0, z: 0},
        rotation: {x: 0, y:0, z:0},
        url:"/objects/game.gltf",
        visible: false
    }
],
    camera:{
        position:{x: 0, y:20, z: 8},
        rotation:{x:-0.56, y:0, z:0}
    },
    
}
export default GameSceneData
