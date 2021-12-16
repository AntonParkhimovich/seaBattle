import { useDispatch, useSelector } from "react-redux"
import { clickCell } from "../store/gameSlice"
import { useDrop } from "react-dnd"
export const Cell = ({ cell, index }) => {
    const move = useSelector(state => state.gameState.move)
    const { field } = useSelector(state => state[move])
    const dispatch = useDispatch()
    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'box',
        drop: (item) => dispatch(clickCell({ x: cell.x, y: cell.y, shipId: item.shipId, field: field }))
    }))

    return (
        <div ref={drop} className={cell.containsShip? 'cell visible' : 'cell'} id={index}>

        </div>
    )
}
