
export interface Products {
  sold: number;
  images: string[];
  subcategory: SubCategory[];
  ratingsQuantity: number;
  _id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  imageCover: string;
  category: Entity;
  brand: Entity;
  ratingsAverage: number;
  createdAt: string; 
  updatedAt: string; 
  id: string;
}

 interface Entity {
  _id: string;
  name: string;
  slug: string;
  image?: string;
}

interface SubCategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}