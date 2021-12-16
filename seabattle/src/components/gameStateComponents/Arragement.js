
import { Field } from "../Field"
import NamePlayer from "../NamePlayer"
import ShipContainer from "./ShipContainer"
export const Arragement = ()=>{
    return(
        <div className ={'arragement'}>
            <div className={'arragement-header'}>
             <NamePlayer/>   
            </div>
            <div className={'arragement-main'}>
            <Field/>
            <ShipContainer/>
            </div>
        </div>
      
       
    )
}