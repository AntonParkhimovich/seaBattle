import { useDispatch} from "react-redux"
import { clickCell } from "../store/gameSlice"
import { useDrop } from "react-dnd"
export const CellArragement = ({ cell, index}) => {
    const dispatch = useDispatch()
    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'box',
        drop: (item) => {
            dispatch(clickCell({ x: cell.x, y: cell.y, shipIndex: item.index}))
        }
    }))
    return (
        <div ref={drop} className={cell.isShipVisible? 'cell visible' : 'cell'} id={index}/>
    )
}
