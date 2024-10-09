import Axios from "../Axios";
import { Dispatch } from "redux";

import { saveCommand } from "@/redux/slices/CommandSlice";
import { R1_disabled, R1_valid_disabled, R2_disabled, R2_valid_disabled } from "@/redux/slices/AutorisationSlice";



type formData = {
    // restaurant_number?:number,
    dish_number: number,
    operator: string,
    etudiant_id:number,
    restaurant_id:number
  }

type Params = {
    data: formData
    dispatch: Dispatch  
}

type params_validCommand = {
    dispatch?: Dispatch ,
    command_id:number,
    etudiant_id:number,
    restaurant_id:number
}

export class Command {
   async register({data,dispatch}:Params){
        try{
            const response = await Axios.post('app/order/',data)
            dispatch(saveCommand(response.data))

            // data.restaurant_id ==1 ? dispatch(R1_disabled(true)):dispatch(R2_disabled(true))
          
            console.log(response.data)
        }catch (error) {
            console.error('Erreur lors de la requête', error);
            if (error.response) {
                console.error('Erreur du serveur', error.response.status, error.response.data);
               
            } else {
                console.error('Erreur de requête', error.message);
            }
        }
    }

    async ValidatedCommand ({command_id,dispatch,etudiant_id,restaurant_id}:params_validCommand) {
        try{
            const response = await Axios.post(`app/order/${command_id}/valid/`)

            const ws = new WebSocket(`ws://192.168.43.84:8000/ws/student/${etudiant_id}/`); 

            ws.onopen = () => {
              console.log('test')
                console.log('Connexion WebSocket établie');
            };
      
            ws.onmessage = (event) => {
                const data = JSON.parse(event.data);
                if (data.message) {
                    console.log('message',restaurant_id)
                    // dispatch?dispatch(restaurant_id==1?R1_valid_disabled(true):R2_valid_disabled(true)):null

                    console.log(data.message)
                  } else if (data.error) {
                    console.error('Erreur:', data.error);
                }
            };
      
            ws.onclose = () => {
                console.log('Connexion WebSocket fermée');
            };
      
       
      
            // Nettoyage de l'effet
            return () => {
                ws.close();
            };

            console.log(response.data)



        }catch (error) {
            console.error('Erreur lors de la requête', error);
            if (error.response) {
                console.error('Erreur du serveur', error.response.status, error.response.data);
               
            } else {
                console.error('Erreur de requête', error.message);
            }
        }
    }
}