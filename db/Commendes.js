import { Buffer } from "buffer";

export const DataOfCommande = {
    id:1,
    matricule:'22T2922',
    num_Plat : 2,
    pay_mode: 'mobile money'
}


export function createToken(data) {
    // Convertir les données en chaîne JSON
    const jsonData = JSON.stringify(data);
    
    // Encoder les données en Base64
    const token = Buffer.from(jsonData).toString('base64');
    
    return token;
  }
  

  const data = {
    userId: 123,
    username: 'etudiant',
    role: 'student'
  };
  

 

  export function decodeToken(token) {
    const jsonData = Buffer.from(token, 'base64').toString('utf-8');
    return JSON.parse(jsonData);
  }
  

