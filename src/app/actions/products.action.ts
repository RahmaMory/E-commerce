
'use server'
import axios from 'axios'

 async function getProducts(){

try{
    const response =await axios.get(
    `https://ecommerce.routemisr.com/api/v1/products`
  );

  return{
    data:response?.data.data,
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


  async function getProductsDetails(id:string){

try{
    const response =await axios.get(
    `https://ecommerce.routemisr.com/api/v1/products/${id}`
  );

  return{
    data:response?.data.data,
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

export {getProductsDetails , getProducts}