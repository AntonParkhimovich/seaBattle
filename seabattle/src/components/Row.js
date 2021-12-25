import { CellArragement } from "./CellArragement"
import {CellGame}from './CellGame'
import { useSelector } from "react-redux"
export const Row =({row, index, player})=>{
    const component = useSelector(state=> state.gameState.component)
    return(
        <div className = {'row'} id={index} >
            {row.map((cell, index)=> {
            if(component === 'arragement'){
                return<CellArragement cell={cell} key={index}index={index}/>
            }if(component === 'game'){
                return <CellGame cell={cell} index={index} key={index} player={player}/>
            }
            })}
        </div>
    )
}