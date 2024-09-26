import Axios from "../Axios";
import { Dispatch } from "redux";

import { saveCommand } from "@/redux/slices/CommandSlice";



type formData = {
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
    command_id:number,
}

export class Command {
   async register({data,dispatch}:Params){
        try{
            const response = await Axios.post('app/order/',data)
            dispatch(saveCommand(response.data))
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

    async ValidatedCommand ({command_id}:params_validCommand) {
        try{
            const response = await Axios.post(`app/order/${command_id}/valid/`)

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