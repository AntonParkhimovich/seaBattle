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
        <div className={'start-page'}>
        <h2 className={'title'}>Ship Battle</h2>
        <button className={'button'} onClick = {clickHandler}>Start Game</button>
        </div>
    </>
    )
}