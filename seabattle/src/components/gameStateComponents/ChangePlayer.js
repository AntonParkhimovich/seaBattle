import { useDispatch, useSelector } from "react-redux"
import { changeGameState, changeMove, initGame} from "../../store/gameSlice"
export const ChangePlayer = ()=>{
    const move = useSelector(state=> state.gameState.move)
    const playerName =  useSelector(state=> state[move === 'player1'?'player2':'player1'].name)
    const dispatch= useDispatch()
    const clickHandler = ()=>{
        dispatch(changeMove())
        dispatch(initGame())
        dispatch(changeGameState('game'))
    }
    
    return(<>
    <div className={'change-player'}>
        <h1 className={'title'}>{`Get ready ${playerName}`}</h1>
        <button  className = {'button'}onClick={clickHandler}>Start!</button>
    </div>
   
   </>
    )
}