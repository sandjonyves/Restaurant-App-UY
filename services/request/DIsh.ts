import { Dispatch } from "redux";
import Axios from "../Axios";
import { dish, dish_choise } from "@/redux/slices/DishSlice";
import { NumberInputField } from "native-base";
import { Alert } from "react-native";

type dish_props = {
    // restaurant_id?:any,
    // name?:string,
    // dish_id :number,
    dispatch? : Dispatch
}
// type dish_dispatch ={
//     dispatch : Dispatch
// }



type props = {
    data : dish_props
}

export class Dishes{

    async register ({data}:props){
        try {
            const response = await Axios.post('store/dish/',data)
        }
        catch(error) {
            console.error('Erreur lors de la requête', error);

        }
    }

    async   choise_dish({dispatch}:dish_props){
        try{
            // const response  = await Axios.get(`store/dish/${dish_id}/`)
            const ws = new WebSocket('ws://192.168.43.84:8001/ws/dish_choise/')

            ws.onopen = () => {
              console.log('test')
                console.log('Connexion WebSocket établie');
            };
      
            ws.onmessage = (event) => {
                const data = JSON.parse(event.data);
                if (data.message) {
                    dispatch?dispatch(dish(data.message)):null
                    console.log('all data o  ' , data.message)
                  } else if (data.error) {
                    console.error('Erreur:', data.error);
                }
            };
      
            ws.onclose = () => {
                console.log('Connexion WebSocket fermée');
            };
      
            // setSocket(ws);

            return () => {
                ws.close();
            };
        }
        catch(error){
                console.error('une erreur',error)
        }
    }

    async get_dish({dispatch}:dish_props  ){
        try {
        

            const response = await Axios.get(`store/dish/choises/`)
            console.log(response.data)
            dispatch?dispatch(dish(response.data)):null
           
        }
        catch(error){
            console.error('une erreur ',error)
        }
    }
}