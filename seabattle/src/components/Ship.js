import { useDrag } from "react-dnd"
import { useSelector } from "react-redux";
export const Ship = ({ship, index})=>{
    const directionShips = useSelector(state=> state.gameState.directionShips)
    const [{ opacity }, drag, preview] = useDrag(() => ({
        type: 'box',
        item:{index},
        collect: (monitor) => ({
            opacity: monitor.isDragging() ? 0.4 : 0.8,
        }),
    }));
    return (<div ref={preview} style={{opacity}} className={`ship${ship.deck}${directionShips}`}>
			<div ref={drag} className={'button-drag'}/>
		</div>);
}