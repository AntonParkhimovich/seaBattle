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
           default: return this.initialState
       }
   }
}
const store = new GameReducerStore()
export default store