import { disbale } from "@/redux/slices/AutorisationSlice";
import { Dispatch } from "redux"

// const Time = new Data

type params ={
    dispatch : Dispatch
}


export default function times ({dispatch}:params){
    const options = {
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      

    const TimeOfTisMoment = new Date()

    const localTime  = TimeOfTisMoment.toLocaleString('fr-FR', options);
   console.log(localTime)   

   if(String(localTime)>'15:55:00'){
    dispatch(disbale(false) )
   }


}