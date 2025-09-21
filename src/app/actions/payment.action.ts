'use server'
import { getUserToken } from "@/lib/tokenUser.utils";
import axios from "axios";

interface shippingAddressTypes{
       details: string,
        phone: string,
        city: string
}

  async function getPyamentCash(cardId:string , shippingAddress:shippingAddressTypes){

      const token= await getUserToken()
    
try{
    const response =await axios.post(
    `https://ecommerce.routemisr.com/api/v1/orders/${cardId}`,{shippingAddress},{
      headers:{
        token:token as string,
      }
    }
  );
  console.log(response,'payment cash');
  

  return{
    data:response?.data,
    message:response?.data.message,
    status:response?.data.status,
  }
  
}

catch(error:unknown){
if(axios.isAxiosError(error)){
  return{
      data:[],
    message:error?.response?.data.message || 'an error accured',
    status:error?.response?.status,
}
}
}
}

  async function getPyamentOnline(cardId:string , shippingAddress:shippingAddressTypes){

      const token= await getUserToken()
    
try{
    const response =await axios.post(
    `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cardId}?url=http://localhost:3000`,{shippingAddress},{
      headers:{
        token:token as string,
      }
    }
  );
  console.log(response,'payment online');
  

  return{
    data:response?.data,
    message:response?.data.message,
    status:response?.data.status,
  }
  
}

catch(error:unknown){
if(axios.isAxiosError(error)){
  return{
      data:[],
    message:error?.response?.data.message || 'an error accured',
    status:error?.response?.status,
}
}
}
}


export {getPyamentCash , getPyamentOnline}