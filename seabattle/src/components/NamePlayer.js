import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { changePlayerName } from "../store/gameSlice"
const NamePlayer = () => {
    const dispatch = useDispatch()
    const move = useSelector(state => state.gameState.move)
    const name = useSelector(state => state[move].name)
    const [playerName, setPlayerName] = useState('')
    return (<>
        <h1 className={'arragement-header__text'}>{name ? `Hello admiral ${name}!` :
            'Hello admiral! Please identify yourself'}</h1>
        {name ? null :
            <>
                <input className={'input'} type={'text'} value={playerName} onChange={({ target }) => setPlayerName(target.value)} />
                <button className={'button'} onClick={() => dispatch(changePlayerName(playerName))}>Submit</button>
            </>
        }

    </>
    )
}
export default NamePlayer