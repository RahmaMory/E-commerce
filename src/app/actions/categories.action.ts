
'use server'
import axios from 'axios'

export default async function getCatigories(){

try{
    const response =await axios.get(
    `https://ecommerce.routemisr.com/api/v1/categories`
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


export async function getCategoryProducts(id: string) {
  try {
    const response = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products?category=${id}`
    );
    return response.data?.data || [];
  } catch (error) {
    console.error("Error fetching category products:", error);
    return [];
  }
}

export async function getCategoryById(id: string) {
  try {
    const response = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/categories/${id}`
    );
    return response.data?.data || null;
  } catch (error) {
    console.error("Error fetching category by id:", error);
    return null;
  }
}
