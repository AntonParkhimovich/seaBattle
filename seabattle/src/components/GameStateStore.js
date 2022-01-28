class GameReducerStore{
   initialState = {
       gameState:{
           gameComponent: 'start',
           move:'player1'
       },
       player1:{
           field:[],
           shipsCell:[],
           ships:[]
       },
       player2:{
           field:[],
           shipsCell:[],
           ships:[]
       }
   }
   dispatchActions(action){
       let {type, value} = action
       switch (type) {
           case 'changeGameComponent':
               this.initialState.gameState.gameComponent = value
               break
           case 'changeMove':
               this.changeMove()
               break
           case  'initField':
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
   addShip(value){
       this.initialState[this.initialState.gameState.move].ships.push(value)
   }
   addShipCell(value){
       this.initialState[this.initialState.gameState.move].shipsCell.push(value)
   }
   blockCellOnField(value){
       value.forEach(cell=>{
           let cellOnField = this.initialState[this.initialState.gameState.move].field[cell.y][cell.x]
           cellOnField.block = true
       })
   }
   changeMove(){
       this.initialState.gameState.move === 'player1'? this.initialState.gameState.move ='player2': this.initialState.gameState.move = 'player1'
   }
   addLocalStorage(){
       const localStorage = window.localStorage
       this.initialState.player1 = this.initialState.player2
       localStorage.setItem('state',JSON.stringify(this.initialState))
   }
   getLocalstorage(){
       this.initialState = JSON.parse(window.localStorage.getItem('state'))
   }

}
const store = new GameReducerStore()
export default store