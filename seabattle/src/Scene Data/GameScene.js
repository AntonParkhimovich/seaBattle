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
    shipsConfig:{
        oneDeck1:{shipDeck: 1},
        oneDeck2:{shipDeck: 1},
        oneDeck3:{shipDeck: 1},
        oneDeck4:{shipDeck: 1},
        threeDeck:{shipDeck: 3},
        threeDeck1:{shipDeck: 3},
        twoDeck3:{shipDeck: 2},
        twoDeck3001:{shipDeck: 2},
        twoDeck3002:{shipDeck: 2},
        FourDeck:{shipDeck: 4}
    },
    controls: false
}
export default GameSceneData
