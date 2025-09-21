
'use server'
import { getUserToken } from '@/lib/tokenUser.utils';
import axios from 'axios'

 async function getUserCart(){
  
  const token= await getUserToken()

try{
    const response =await axios.get(
    `https://ecommerce.routemisr.com/api/v1/cart`,{
      headers:{
        token:token as string,
      }
    }
  );
  console.log(response?.data,'cart');
  

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


 async function addProductToCart(productId:string){
  
  const token= await getUserToken()

try{
    const response =await axios.post(
    `https://ecommerce.routemisr.com/api/v1/cart`,{productId},{
      headers:{
        token:token as string,
      }
    }
  );
  console.log(response?.data,'add to cart');
  
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

 async function removeFromCart(productId:string){
  
  const token= await getUserToken()

try{
    const response =await axios.delete(
    `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{
      headers:{
        token:token as string,
      }
    }
  );
  console.log(response?.data,'remove from cart');
  
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

 async function updateFromCart(productId:string ,count:number){
  
  const token= await getUserToken()

try{
    const response =await axios.put(
    `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{count},{
      headers:{
        token:token as string,
      }
    }
  );
  console.log(response?.data,'updated cart');
  
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



export{
  getUserCart, addProductToCart , removeFromCart , updateFromCart
}