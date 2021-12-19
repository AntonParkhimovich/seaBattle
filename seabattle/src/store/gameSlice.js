import { createSlice } from '@reduxjs/toolkit'
import { checkBattleField, checkHit } from '../checkBattlefield'
import {getRandom, randomDirection} from '../random'
import shipsData from '../shipsData'

export const gameSlice = createSlice({
    name: 'game',
    initialState: {
        player1: {
            name: '',
            field: [],
            ships: shipsData,
            shipsCell:[],
            shipsShot:[]
        },
        player2: {
            name: '',
            field: [],
            ships: shipsData,
            shipsCell:[],
            shipsShot: []
        },
        gameState: {
            move: "player1",
            component: "start", //arragement, changePlayer, move, win, game
            directionShips: 'horizontally',
            gameLog:[],
            winner:'',
            sound:true
        }
    },
    reducers: {
        changeGameState(state, { payload }) {
            state.gameState.component = payload
        },
        changePlayerName(state, {payload}){
            state[state.gameState.move].name = payload
        },
        changeMove(state) {
            if(state.gameState.move === "player1"){
                state.gameState.move = "player2"
            }else{
                state.gameState.move = "player1" 
            }
        },
        initFieldMatrix(state,{payload}) {
            const fieldMatrix = []
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
                        shipId:0
                    });
                }
            }
            if(payload=== undefined){
                state.player1.field = fieldMatrix
                state.player2.field = fieldMatrix
            }else{
                state[payload].field = fieldMatrix
            }
           
        },
        returnShips(state){
            state[state.gameState.move].ships = shipsData
            state[state.gameState.move].shipsCell = []
        },
        clickCell(state, { payload }) {
            const { x, y, shipIndex} = payload
            let ships = state[state.gameState.move].ships
            let ship = ships[shipIndex]
            const shipDirection = state.gameState.directionShips
            const stateField = state[state.gameState.move].field
            const resultsCheck = checkBattleField(x, y, ship.deck, stateField, shipDirection)
            if (resultsCheck.checkCell) {
                resultsCheck.shipCell.map((cell)=>{
                    stateField[cell.y][cell.x].containsShip = true
                    stateField[cell.y][cell.x].isShipVisible = true
                    stateField[cell.y][cell.x].shipId = ship.shipId
                    state[state.gameState.move].shipsCell.push(cell)
                    return null
                })
                resultsCheck.cell.map((cell)=>{
                    stateField[cell.y][cell.x].block = true
                    return null
                })
                state[state.gameState.move].ships.splice(shipIndex,1)
            }
        },
        changeDirectionShips(state) {
            if (state.gameState.directionShips === 'horizontally') {
                state.gameState.directionShips = 'vertically'
            } else {
                state.gameState.directionShips = 'horizontally'
            }
        },
        initGame(state){
            const player = state[state.gameState.move]
            const enemy = state[state.gameState.move === 'player1'? 'player2':'player1']
            player.shipsCell.map((cell)=>{
                player.field[cell.y][cell.x].isShipVisible= true
                return null
            })
            enemy.shipsCell.map((cell)=>{
                if(!enemy.field[cell.y][cell.x].shot){
                    enemy.field[cell.y][cell.x].isShipVisible= false
                }
                return null
            })
        },
        shot(state,{payload}){
            const enemy = state[state.gameState.move === 'player1'? 'player2': 'player1']
            const enemyField = enemy.field
            const enemyShips = enemy.shipsCell
            const cellShot = enemyField[payload.y][payload.x]
            const move = state.gameState.move
            if(cellShot.containsShip&&!cellShot.shot){
                const shipId = cellShot.shipId
                enemyShips.find(item => cellShot.x=== item.x && cellShot.y === item.y).shot = true
                cellShot.isShipVisible = true
                cellShot.shot = true
                enemy.shipsShot.push(cellShot)
                if(checkHit(enemyShips, shipId)){
                    state.gameState.gameLog.push({player: state[move].name, message:'KILL!'})
                }else{
                    state.gameState.gameLog.push({player:state[move].name, message:'HIT!'})
                }
                if(enemy.shipsShot.length === 20){
                    state.gameState.winner = state[state.gameState.move].name
                    state.gameState.component = 'win'
                }
            }if(!cellShot.containsShip&& !cellShot.shot){
                cellShot.shot = true
                state.gameState.gameLog.push({player:state[move].name, message:'MISS!'})
                state.gameState.component = 'changePlayer'
            }
            
        },
        randomShipGeneration(state){
            state[state.gameState.move].shipsCell = []
            let shipsData = state[state.gameState.move].ships
            const stateField = state[state.gameState.move].field
            const randomGeneration = (stateField, ship)=>{
                let x= getRandom(0,9)
                let y = getRandom(0,9)
                let shipDirection = randomDirection()
                if(shipDirection ==='horizontally'&& ship.deck>1){
                     x = getRandom(0,9-ship.deck)
                     y = getRandom(0,9)
                }else{
                    y = getRandom(0,9-ship.deck)
                }
                const resultsCheck = checkBattleField(x, y, ship.deck,stateField, shipDirection)
                if(resultsCheck.checkCell){
                    const cell = resultsCheck.cell
                    const shipCell = resultsCheck.shipCell
                    shipCell.map((cell)=>state[state.gameState.move].shipsCell.push(cell))
                    cell.map(cell=> stateField[cell.y][cell.x].block = true)
                    shipCell.map(cell=>{
                        stateField[cell.y][cell.x].containsShip = true
                        stateField[cell.y][cell.x].isShipVisible = true
                        stateField[cell.y][cell.x].shipId = ship.shipId
                        return null
                    } )
                    return resultsCheck
                }else{
                    return randomGeneration(stateField, ship, shipDirection)
                }
            }
            shipsData.map((ship)=>{
                randomGeneration(stateField, ship)
                return null;
            })
            state[state.gameState.move].ships = []
        },
        initNewGame(state){
            state.player1 = {
                name: '',
                field: [],
                ships: shipsData,
                shipsCell:[],
                shipsShot:[]
            }
            state.player2 = state.player1
            state.gameState ={
                move: "player1",
                component: "start", //arragement, changePlayer, move, win, game
                directionShips: 'horizontally',
                gameLog:[],
                winner:''
            }

        }

    }
})

export const { changeGameState, changeMove, initFieldMatrix, changeVisible, clickCell, changeDirectionShips, returnShips, changePlayerName, initGame, shot, randomShipGeneration, initNewGame} = gameSlice.actions
export const gameSliceReducer = gameSlice.reducer