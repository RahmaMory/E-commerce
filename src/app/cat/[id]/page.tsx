import React from "react";
import ProductCart from "@/components/productGrid-comp/ProductCart";
import { getCategoryById, getCategoryProducts } from "@/app/actions/categories.action";

export default async function CategoryPage({ params }: { params: { id: string } }) {


  const categories = await getCategoryProducts(params.id);
    const category = await getCategoryById(params.id);


  return (
    <div className="container mx-auto my-10">
      <h2 className="text-3xl font-bold my-7">  {category ? `${category.name} Category:` : "Category Products"}</h2>

      {categories.length === 0 ? (
        <p className="text-red-400">No products found for this category.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {categories.map((cat:any) => (
            <ProductCart key={cat._id} product={cat} />
          ))}
        </div>
      )}
    </div>
  );
}
