import { useSelector } from "react-redux"
import { Field } from "../Field"
import GameLog from "../GameLog"
export const Game = () => {
    const playerField = useSelector(state => state[state.gameState.move].field)
    const enemyField = useSelector(state => state[state.gameState.move === 'player1' ? 'player2' : 'player1'].field)
    return (<>
        <div className={'game-wrapper'}>
            <h1 className={'title'}>Shoot in your Enemy</h1>
            <div className={'game-wrapper__field'}>
            <Field field={playerField} player={'player'} />
            <Field field={enemyField} player={'enemy'} />
            </div>
            <GameLog/>
        </div>
    </>
    )
}