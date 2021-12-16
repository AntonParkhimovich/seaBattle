import { useDispatch,useSelector } from "react-redux"
import { initFieldMatrix, returnShips } from "../../store/gameSlice"
import { changeDirectionShips } from "../../store/gameSlice"
import { Ship } from "../Ship"

const ShipContainer = ()=>{
    const dispatch = useDispatch()
    const move = useSelector(state=> state.gameState.move)
    const shipsData = useSelector(state => state[move].ships)
    const clickHandler = ()=>{
        dispatch(initFieldMatrix(move))
        dispatch(returnShips())
    }
    return(
        <div className= {'ship-container'}>
            <div className={'ship-container__main'}>
                {shipsData.map((ship)=> <Ship ship= {ship}/>)}
            </div>
            <button onClick={()=>dispatch(changeDirectionShips())}> change direction ships</button>
            <button onClick={clickHandler}>clear battlefield</button>
        </div>
    )
}
export default ShipContainer