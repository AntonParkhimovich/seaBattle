import { useDispatch } from "react-redux";
import {shot} from '../store/gameSlice'
export const CellGame = ({ cell, index, player}) => {
    const dispatch = useDispatch()
    
    const clickHandler = ()=>{
        if(player === 'enemy'){
         dispatch(shot(cell))
        }
    }
    const classHandler= ()=>{
        if(cell.shot === true && cell.containsShip === true){
            return 'ship-shot'
        }
        if(cell.isShipVisible){
            return 'cell visible'
        }if(cell.shot===true&& cell.containsShip === false){
            return 'cell shot'
        }
        else{
            return 'cell'
        }
    }

    return (
        <div  className={classHandler()}
            onClick={clickHandler}
        />
    )
}