import { createSlice } from '@reduxjs/toolkit'
import { checkBattleField } from '../checkBattlefield'
import shipsData from '../shipsData'
export const gameSlice = createSlice({
    name: 'game',
    initialState: {
        player1: {
            name: '',
            field: [],
            ships: shipsData,
        },
        player2: {
            name: '',
            field: [],
            ships: shipsData,
        },
        gameState: {
            move: "player1",
            component: "start", //arragement, changePlayer, move, win
            directionShips: 'horizontally'
        }
    },
    reducers: {
        changeGameState(state, { payload }) {
            state.gameState.component = payload
        },
        changePlayerName(state, {payload}){
            state[state.gameState.move].name = payload
        },
        changeMove(state, { payload }) {
            state.gameState.move = payload
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
        },
        clickCell(state, { payload }) {
            const { x, y, shipId, field } = payload
            const ship = state[state.gameState.move].ships[shipId]
            const shipDirection = state.gameState.directionShips
            const stateField = state[state.gameState.move].field
            const resultsCheck = checkBattleField(x, y, ship.deck, stateField, shipDirection)
            if (resultsCheck.checkCell) {
                resultsCheck.shipCell.map((cell)=>{
                    stateField[cell.y][cell.x].containsShip = true
                    stateField[cell.y][cell.x].isShipVisible = true
                    stateField[cell.y][cell.x].shipId = shipId
                })
                resultsCheck.cell.map((cell)=>{
                    stateField[cell.y][cell.x].block = true
                })
                state[state.gameState.move].ships.splice(shipId, 1)
                state[state.gameState.move].ships.map((item, index) => { item.shipId = index })
            }
        },
        changeDirectionShips(state) {
            if (state.gameState.directionShips === 'horizontally') {
                state.gameState.directionShips = 'vertically'
            } else {
                state.gameState.directionShips = 'horizontally'
            }
        }

    }
})

export const { changeGameState, changeMove, initFieldMatrix, changeVisible, clickCell, changeDirectionShips, returnShips, changePlayerName} = gameSlice.actions
export const gameSliceReducer = gameSlice.reducer