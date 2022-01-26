class GameReducerStore{
   initialState = {
       gameState:{
           gameComponent: 'Start',
           move:'player1'
       },
       player1:{
           field:[],
           ships:[]
       },
       player2:{
           field:[],
           ships:[]
       }
   }
   dispatchActions(action){
       let {type, value} = action
       switch (type){
           case 'changeGameComponent':
               this.initialState.gameState.gameComponent = value
               break
           case 'changeMove':
               this.initialState.gameState.move = value
           case  'initField':
               this.initField()
           default: return this.initialState
       }
   }
   initField(){
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
                   shipId:0
               });
           }
       }
       this.initialState[this.initialState.gameState.move].field = fieldMatrix
   }
}
const store = new GameReducerStore()
export default store