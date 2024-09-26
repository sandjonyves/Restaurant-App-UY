import { Dispatch } from "redux";
import Axios from "../Axios";
import { dish, dish_choise } from "@/redux/slices/DishSlice";
import { NumberInputField } from "native-base";

type dish_props = {
    restaurant_id?:any,
    name?:string,
    dish_id :number,
    dispatch? : Dispatch
}
// type dish_dispatch ={
//     dispatch : Dispatch
// }



type props = {
    data : dish_props
}

export class Dish{

    async register ({data}:props){
        try {
            const response = await Axios.post('store/dish/',data)
        }
        catch(error) {
            console.error('Erreur lors de la requête', error);

        }
    }

    async choise_dish({dish_id,dispatch}:dish_props){
        try{
            const response  = await Axios.post(`store/dish/${dish_id}/valid/`)
            const ws = new WebSocket('ws://192.168.43.84:8000/ws/dish_choise/')

            ws.onopen = () => {
              console.log('test')
                console.log('Connexion WebSocket établie');
            };
      
            ws.onmessage = (event) => {
                const data = JSON.parse(event.data);
                if (data.message) {
                    dispatch?dispatch(dish_choise(data.message)):null
                    console.log('all data of dish ' , data.message)
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

    async get_dish({dish_id,dispatch}:dish_props  ){
        try {
            const response = await Axios.get(`store/dish/${dish_id}/`)
            dispatch?dispatch(dish(response.data)):null
        }
        catch(error){
            console.error('une erreur ',error)
        }
    }
}