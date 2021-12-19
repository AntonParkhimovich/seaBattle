import { useSelector, useDispatch} from "react-redux"
import {randomShipGeneration, initFieldMatrix,returnShips} from "../store/gameSlice"

export const RandomGenerationShips = ()=>{
    const move = useSelector(state=> state.gameState.move)
    const dispatch = useDispatch()
    const clickHandler=()=>{
        dispatch(returnShips())
        dispatch(initFieldMatrix(move))
        dispatch(randomShipGeneration())
    }
    return(
        <button className={'button'} onClick={clickHandler}> random generation</button>
    )
}