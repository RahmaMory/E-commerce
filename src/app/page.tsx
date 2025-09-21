import SliderImg from "@/components/slider-comp/SliderImg";
import getCatigories from "./actions/categories.action";
import SliderCatComp from "@/components/slider-comp/SliderCatComp";
import ProductsGrid from "@/components/productGrid-comp/ProductsGrid";
  import {getProducts} from "./actions/products.action";
import { getServerSession } from "next-auth";
import { OPTIONS } from "./api/auth/[...nextauth]/route";
import SliderBrandComp from "@/components/slider-comp/SliderBrandComp";
import { getBrands } from "./actions/brand.action";
import Footer from "@/components/footer/Footer";


export default async function Home() {
 const response=await  getCatigories();
  const data=response?.data;
  console.log(data,'data home');

  const session=await getServerSession(OPTIONS);
  // console.log(session, 'session data');
  
  const {data: producuts} =await getProducts();
    const {data: brand} =await getBrands();


  return (
  <>
  <div className="container mx-auto">
    <SliderImg/>
      {/* <SliderCat/> */}
<div className="my-5">
              <SliderCatComp category={data}/>
</div>      

<div className="my-5">
    <ProductsGrid products={producuts}/>

</div>

<div className="my-5">
  <SliderBrandComp brand={brand}/>
</div>
  </div>

  <Footer/>

  
  </>
  );
}
