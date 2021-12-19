
 export const getRandom = (min, max)=>{
    return Math.floor(Math.random() * (max - min)) + min;
}
export const  randomDirection = ()=>{
    return (Math.floor(Math.random() * 2) === 0) ? "vertically" : "horizontally";
  }
