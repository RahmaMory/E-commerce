import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { ZoomIn } from "lucide-react";
import Link from "next/link";
import { Brand } from "@/app/types/brand.model";

export default function BrandCart({ brand }: { brand: Brand }) {
  return (
    <Card className='relative group overflow-hidden'>
         <div className="absolute top-[100px] right-[-100px] z-1 flex flex-col gap-2 group-hover:right-0 transition-all duration-500">
        <Link href={`/brands/${brand._id}`}>
          <button className=" bg-slate-200 px-2 py-2 text-black hover:text-blue-600">
            <ZoomIn />
          </button>
        </Link>
      </div>

      <CardHeader>
        <CardTitle className="text-start z-30 relative">
          {brand?.name+ `:`}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="relative w-full h-[150px]">
          {brand?.image ? (
            <Image
              src={brand.image}
              fill
              className="object-contain"
              sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 25vw"
              alt={brand?.name || "brand"}
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              No Image
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
