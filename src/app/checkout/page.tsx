'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useForm} from "react-hook-form";
import { useCart } from '../context/CartContext';
import { getPyamentCash, getPyamentOnline } from '../actions/payment.action';
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
export default function checkOutPage() {
const [errorMessage, setErrorMessage] = useState(null);
const [paymentMethod, setPaymentMethod] = useState<'cash' | 'online' | null>(null)
const {cartDetails,setCartDetails}=useCart();
//console.log(cartDetails,'carttttttttttt');
const cartID=cartDetails?.cartId;


const router= useRouter()

    interface Inputs{
    details:string;
    phone:string;
    city:string

    }

  const {register, handleSubmit, formState: { errors } }  =useForm<Inputs>();

 async function onSubmit(values:Inputs){
    console.log(values,'check out');

    if(paymentMethod =='cash'){

    try{
        const response=await getPyamentCash(cartID as string,values);
        console.log(response,'response payment');
        if(response?.status=='success'){
            // clear cart context
            setCartDetails(null);
            router.push('/')
        }
        
    }
    catch(error){
        console.log(error,'error payment');
        
    }
    }
    else if(paymentMethod=='online'){
        //online checkout
           try{
        const response=await getPyamentOnline(cartID as string,values);
        console.log(response,'response payment');
        // if(response?.status=='success'){
        //     // clear cart context
        //     setCartDetails(null);
        //     router.push('')
        // }
        window.location.href=response?.data.session.url;
        
    }
    catch(error){
        console.log(error,'error payment');
        
    }

  }

}

  return (
    <>
    
    <div className="w-1/2 mx-auto my-10">
    <h2 className='text-4xl font-bold tracking-tighter my-5'>Payment</h2>
    {errorMessage && <p className='text-red-800 text-center font-bold'>{errorMessage}</p> }
    <form  onSubmit={handleSubmit(onSubmit)}>
        <Input type='text' placeholder='Enter Details' className='p-5 my-5' {...register('details',{required:'details is requird'})} />
        {errors.details && <p className='text-red-800'>{errors.details.message}</p>}
  
    <Input type='tel' placeholder='Your Phone' className='p-5 my-5 ' {...register('phone',{required:'phone is requird'})} />
            {errors.phone && <p className='text-red-800'>{errors.phone.message}</p>}
      <Input type='text' placeholder='Your City' className='p-5 my-5' {...register('city',{required:'city is requird'})} />
        {errors.city && <p className='text-red-800'>{errors.city.message}</p>}


        <RadioGroup className='my-5' onValueChange={(val)=> setPaymentMethod(val as 'cash' | 'online')}>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="cash" id="cash" />
    <Label htmlFor="cash">Cash Payment</Label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="online" id="online" />
    <Label htmlFor="online">Online Payment</Label>
  </div>
</RadioGroup>

    <Button type='submit' className='px-7 py-5'>CheckOut </Button>
    </form>

    </div>
      
    </>
  )
}
