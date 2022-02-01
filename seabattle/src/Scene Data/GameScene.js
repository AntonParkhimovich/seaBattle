const GameSceneData = {
    objects:[{
        name:'game',
        position:{x: 0, y: 0, z: 0},
        rotation: {x: 0, y:0, z:0},
        url:"/objects/game.gltf"
    }, {name: 'point',
        position: {x:0, y:0,z:0},
        rotation: {x:0, y:0, z:0},
        visible: false,
        url:"/objects/point.gltf"
    },
    {name: 'cross',
        position: {x:0, y:0,z:0},
        rotation: {x:0, y:0, z:0},
        visible: false,
        url:"/objects/cross.gltf"
    },
    {name: 'gameShips',
    position: {x:0, y:0,z:0},
    rotation: {x:0, y:0, z:0},
    visible: false,
    url:"/objects/gameShips.gltf"
}
],
    camera:{
        position:{x: 5, y: 18, z: 0}
    },
    controls: false
}
export default GameSceneData
