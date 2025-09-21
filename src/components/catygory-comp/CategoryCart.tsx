import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { categories } from "@/app/types/category.model";
import { ZoomIn } from "lucide-react";
import Link from "next/link";

export default function CategoryCard({ category }: { category: categories }) {
  return (
    <Card className="relative group overflow-hidden transition rounded-2xl cursor-pointer my-7">
      <div className="absolute top-[200px] right-[-100px] z-1 flex flex-col gap-2 group-hover:right-0 transition-all duration-500">
        <Link href={`/cat/${category._id}`}>
          <button className=" bg-slate-200 px-2 py-2 text-black hover:text-blue-600">
            <ZoomIn />
          </button>
        </Link>
      </div>

      <CardHeader>
        <CardTitle className="text-center z-30 relative">
          {category?.name}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="relative w-full h-[300px]">
          {category?.image ? (
            <Image
              src={category.image}
              fill
              className="object-cover"
              sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 25vw"
              alt={category?.name || "category"}
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
