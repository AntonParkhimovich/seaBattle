class GameReducerStore {
    initialState = {
        gameState: {
            gameComponent: 'arragement',
            move: 'player1',
            resultShot: '',
            winner:''
        },
        player1: {
            field: [],
            shipsCell: [],
            ships: [],
            killedShips:[]
        },
        player2: {
            field: [],
            shipsCell: [],
            ships: [],
            killedShips:[]
        }
    }

    dispatchActions(action) {
        let { type, value } = action
        switch (type) {
            case 'changeGameComponent':
                this.initialState.gameState.gameComponent = value
                break
            case 'changeMove':
                this.changeMove()
                break
            case 'initField':
                this.initField()
                break
            case 'addShip':
                this.addShip(value)
                break
            case 'addShipCell':
                this.addShipCell(value)
                break
            case 'blockCell':
                this.blockCellOnField(value)
                break
            case 'shot':
                this.checkShot(value)
                break
        }
    }

    initField() {
        let fieldMatrix = []
        for (let i = 0; i < 10; i++) {
            fieldMatrix.push([]);
        }
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                fieldMatrix[i].push({
                    x: j,
                    y: i,
                    containsShip: false,
                    shot: false,
                    isShipVisible: false,
                    block: false,
                    shipId: 0
                });
            }
        }
        this.initialState[this.initialState.gameState.move].field = fieldMatrix
    }

    addShip(value) {
        const playerShipsData = this.initialState[this.initialState.gameState.move].ships
        playerShipsData.push({
            deck: value.deck,
            position: value.position,
            rotation: value.rotation
        })
    }

    addShipCell(value) {
        const player = this.initialState[this.initialState.gameState.move]
        value.forEach((cell) => {
            player.field[cell.y][cell.x].containsShip = true
        })
        player.shipsCell.push(value)
    }

    blockCellOnField(value) {
        value.forEach(cell => {
            let cellOnField = this.initialState[this.initialState.gameState.move].field[cell.y][cell.x]
            cellOnField.block = true
        })
    }

    changeMove() {
        this.initialState.gameState.move === 'player1' ? this.initialState.gameState.move = 'player2' : this.initialState.gameState.move = 'player1'
    }
    checkShot(shot) {
        const enemy = this.initialState.gameState.move === 'player1' ? 'player2' : 'player1'
        const enemyShips = this.initialState[enemy].shipsCell
        const enemyField = this.initialState[enemy].field

        if (enemyField[shot.y][shot.x].containsShip === true) {
            if (!enemyField[shot.y][shot.x].shot) {
                let shipCellArray = this.findShipCellArray(enemyShips, shot)
                this.initialState.gameState.resultShot = this.checkShipsCellArray(shipCellArray)
                if(this.initialState.gameState.resultShot === 'KILL'){
                    this.initialState[enemy].killedShips.push(shipCellArray)
                    this.checkWinner(this.initialState[enemy].killedShips)
                }
            }
        }
        else {
            this.initialState.gameState.resultShot = 'MISS'
        }
        enemyField[shot.y][shot.x].shot = true
    }
    findShipCellArray(enemyShips, shot) {
        let shipCellArray = []
        enemyShips.forEach((ship) => {
            ship.forEach((cell) => {
                if (cell.x === shot.x && cell.y === shot.y) {
                    cell.shot = true
                    shipCellArray = ship
                }
            })
        })
        return shipCellArray
    }
    checkShipsCellArray(arr) {
        let resultsCheck = ''
        if (arr.length === 1) {
            resultsCheck = 'KILL'
        } else {
            if (arr.every((cell) => cell.shot === true)) {
                resultsCheck = 'KILL'
            } else {
                resultsCheck = 'HIT'
            }
        }
        return resultsCheck
    }
    checkWinner(arr){
        arr.length === 10? this.initialState.gameState.winner = this.initialState.gameState.move: null
    }
    addLocalStore(){
        const localStore = window.localStorage
        localStore.setItem('state', JSON.stringify(this.initialState))
    }
    getLocalStore(){
        this.initialState = JSON.parse(window.localStorage.getItem('state'))
    }
}

const store = new GameReducerStore()
export default store