import { useSelector } from "react-redux"
import { useRef, useEffect} from "react"
const GameLog = ()=>{
const gameLog = useSelector(state=> state.gameState.gameLog)
const messagesEndRef = useRef(null)
const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [gameLog]);
return(
    <div className = {'game-log'}>
        <h2 className={'title'}> Game log:</h2>
        <div className={'game-log__wrapper'}>
        {gameLog.length>0? 
        gameLog.map(({player, message}, index)=> <span className={'gamelog-message'} key={index}>{`${player}: ${message}`}</span>):
        null
        }
        <div ref={messagesEndRef}/>
        </div>
       
    </div>
)
}
export default GameLog