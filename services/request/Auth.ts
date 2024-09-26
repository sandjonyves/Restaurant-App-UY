import axios from 'axios';
import { Dispatch } from 'redux';  // Utilise le bon type de dispatch
import { login } from '@/redux/slices/authSlice';
import Axios from '../Axios';
type FormData = {
    username: string,
    matricule: string,
    password: string,
    confirmPassword: string
}

type FormDataLogin = {
  
    matricule: string,
    password: string,
  

}


type Params = {
    data: FormData 
    dispatch: Dispatch  // Corrige la typo et utilise le type Dispatch de redux
}


// function getCSRFToken() {
//     const cookies = document.cookie.split(';');
//     for (let i = 0; i < cookies.length; i++) {
//         const cookie = cookies[i].trim();
//         if (cookie.startsWith('csrftoken=')) {
//             return cookie.split('=')[1];
//         }
//     }
//     return null;
// }

// const csrfToken = getCSRFToken();

export default class Auth {
    async register({ data, dispatch }: Params) {
        console.log('reaghggh',data)
        try {
            const response = await Axios.post('/account/register/', data,{
                // headers :{
                //     Authorization:'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI2NzE3MzEyLCJpYXQiOjE3MjY3MTcwMTIsImp0aSI6IjYyZmViZTVjMmYxOTQ5NDhiYWFlOWE2YjJkMGM4MDQ1IiwidXNlcl9pZCI6NCwicm9sZSI6IkVUVURJQU5UIiwibWF0cmljdWxlIjoiRmciLCJ1c2VybmFtZSI6IlRlcyJ9.W8ymY01EihKyya6S_5uD36pJfGAgWUZd_XxfdDOwPqY'
                // }
            });
            console.log(response.data);
           
            dispatch(login(response.data));
        } catch (error) {
            console.error('Erreur lors de la requête', error.request);
            if (error.response) {
                console.error('Erreur du serveur', error.response.status, error.response.data);
               
                // dispatch({ type: 'REGISTER_FAILURE', payload: error.response.data });
            } else {
                console.error('Erreur de requête', error.message);
            }
        }
    }

    async login({ data, dispatch }: Params) {
        try {
            const response = await axios.post('http://192.168.43.84:8000/account/login', data,{
                // headers :{
                //     Authorization:'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI2NzE3MzEyLCJpYXQiOjE3MjY3MTcwMTIsImp0aSI6IjYyZmViZTVjMmYxOTQ5NDhiYWFlOWE2YjJkMGM4MDQ1IiwidXNlcl9pZCI6NCwicm9sZSI6IkVUVURJQU5UIiwibWF0cmljdWxlIjoiRmciLCJ1c2VybmFtZSI6IlRlcyJ9.W8ymY01EihKyya6S_5uD36pJfGAgWUZd_XxfdDOwPqY'
                // }
            });
            console.log(response.data);
           
            dispatch(login(response.data));
        } catch (error) {
            console.error('Erreur lors de la requête', error);
            if (error.response) {
                console.error('Erreur du serveur', error.response.status, error.response.data);
               
                // dispatch({ type: 'REGISTER_FAILURE', payload: error.response.data });
            } else {
                console.error('Erreur de requête', error.message);
            }
        }
    }
}
