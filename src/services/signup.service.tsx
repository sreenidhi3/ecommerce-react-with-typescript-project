import axios from 'axios'
import { SignUpRequestType, SignUpResponseType } from '../types/signup.types';

export const signup=(data:SignUpRequestType):Promise<SignUpResponseType>=>{
    return axios.post('https://reqres.in/api/register', {
        email: data.email,
        password: data.password
      })
      .then(response =>{console.log(response.data); return response.data})
      .catch(function (error) {
        console.log(error.response.data);
        // return error
        throw(error.response.data.error)
      });
}