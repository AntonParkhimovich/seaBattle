import { useDrag } from "react-dnd"
import { useSelector } from "react-redux";
export const Ship = ({ship})=>{
    const directionShips = useSelector(state=> state.gameState.directionShips)
    const [{ opacity }, drag, preview] = useDrag(() => ({
        type: 'box',
        item:{shipId:ship.shipId},
        collect: (monitor) => ({
            opacity: monitor.isDragging() ? 0.4 : 1,
            transform: monitor.isDragging()? 'rotate(90deg)': ''
        }),
    }));
    return (<div ref={preview} style={{opacity}} className={`ship${ship.deck}${directionShips}`}>
			<div ref={drag} className={'button-drag'}/>
		</div>);
}