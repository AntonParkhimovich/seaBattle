import { useDispatch } from "react-redux"
import { changeGameState, initFieldMatrix } from "../../store/gameSlice"
export const Start = ()=>{
    const dispatch = useDispatch()
    const clickHandler = ()=>{
        dispatch(initFieldMatrix())
        dispatch(changeGameState('arragement'))
    }
    return(
        <>
    <h1>Start</h1>
    <button onClick = {clickHandler}>Start Game</button>
    </>
    )
}