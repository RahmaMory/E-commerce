// app/brand/[id]/page.tsx
import { getBrandById, getBrandProducts } from "@/app/actions/brand.action";
import ProductCart from "@/components/productGrid-comp/ProductCart";

export default async function BrandProductsPage({ params }: { params: { id: string } }) {
  const { data: products } = await getBrandProducts(params.id);
      const brand = await getBrandById(params.id);
  

  return (
    <div className="container mx-auto my-10">
      <h2 className="text-3xl font-bold mb-6"> {brand ? `${brand.name} Products:` : "Brand Products"}</h2>


      {products.length === 0 ? (
        <p className="text-red-400">No products found for this brand.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {products.map((product: any) => (
            <ProductCart key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
