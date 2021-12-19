import { useDispatch,useSelector } from "react-redux"
import { initFieldMatrix, returnShips, changeGameState} from "../../store/gameSlice"
import { changeDirectionShips } from "../../store/gameSlice"
import { changeMove } from "../../store/gameSlice"
import { Ship } from "../Ship"
import { RandomGenerationShips } from "../RandomGenerationShips"


const ShipContainer = ()=>{
    const dispatch = useDispatch()
    const {move, directionShips} = useSelector(state=> state.gameState)
    const player =  useSelector(state=> state[move].name)
    const shipsData = useSelector(state => state[move].ships)
    const clickHandler = ()=>{
        dispatch(initFieldMatrix(move))
        dispatch(returnShips())
    }
    return(
        <div className= {'ship-container'}>
            <div className={'ship-container__main'} style={{flexDirection: directionShips=== 'horizontally'?'column':'row'}}>
                {shipsData.map((ship, index)=> <Ship ship= {ship} key={index} index={index}/>)}
            </div>
            <button className={'button'} onClick={()=>dispatch(changeDirectionShips())}> change direction ships</button>
            <button className={'button'} onClick={clickHandler}>clear battlefield</button>
            <RandomGenerationShips/>
            {shipsData.length === 0&& player ?
             <button className={'button'} onClick={()=>move==='player1'? dispatch(changeMove()): dispatch(changeGameState('changePlayer'))}>{move === 'player2'?'Start Battle!':'Go next' }</button>
             :null}
        </div>
    )
}
export default ShipContainer