import { Cell } from "./Cell"
export const Row =({row, index})=>{
  
    return(
        <div className = {'row'} id={index} >
            {row.map((cell, index)=> <Cell cell={cell} index= {index}/>)}
        </div>
    )
}