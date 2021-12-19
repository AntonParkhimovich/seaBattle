import { useSelector } from "react-redux"
import { Field } from "../Field"
import NamePlayer from "../NamePlayer"
import ShipContainer from "./ShipContainer"
export const Arragement = ()=>{
    const field = useSelector(state=>state[state.gameState.move].field)
    return(
        <div className ={'arragement'}>
            <div className={'arragement-header'}>
             <NamePlayer/>   
            </div>
            <div className={'arragement-main'}>
            <Field field = {field}/>
            <ShipContainer/>
            </div>
        </div>
      
       
    )
}