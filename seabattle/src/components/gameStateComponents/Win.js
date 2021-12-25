import { useSelector, useDispatch } from "react-redux"
import {initNewGame} from "../../store/gameSlice"
export const Win= ()=>{
    const winner = useSelector(state=> state.gameState.winner)
    const dispatch = useDispatch()
    const clickHandler = ()=>{
       dispatch(initNewGame())
    }
    return(
        <div className = {'winner-section'}>
            <h2 className={'title-win'}>{`Congratulations admiral ${winner}, you are win!`}</h2>
            <button className={'button'} onClick={clickHandler}>New Game</button>
        </div>    
    )
}