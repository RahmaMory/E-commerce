'use server'
import axios from 'axios'

 async function getBrands(){

try{
    const response =await axios.get(
    `https://ecommerce.routemisr.com/api/v1/brands`
  );

    console.log(response,'response brands');

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


 async function getBrandProducts(id: string) {
  try {
    const response = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products?brand=${id}`
    );

    return {
      data: response?.data?.data || [],
      message: response?.data?.message,
      status: response?.status,
    };
  } catch(error:unknown){
if(axios.isAxiosError(error)){
  return{
      data:[],
    message:error?.response?.data.message || 'an error accured',
    status:error?.response?.status,
}
}
}
}


export async function getBrandById(id: string) {
  try {
    const response = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/brands/${id}`
    );
    return response.data?.data || null;
  } catch (error) {
    console.error("Error fetching category by id:", error);
    return null;
  }
}

export{
getBrands,
getBrandProducts
}