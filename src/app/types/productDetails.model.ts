export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface SubCategory {
  _id: string;
  name: string;
  slug: string;
  category: string; // ممكن يتغير لو بيرجع object مش string
}

export interface review{
  // تقدر تعملي interface خاصة بالـ review لو عندك details
}
export interface ProductDetails {
  _id: string;
  id: string;
  title: string;
  description: string;
  slug: string;
  imageCover: string;
  images: string[];
  price: number;
  quantity: number;
  sold: number;
  ratingsAverage: number;
  ratingsQuantity: number;
  brand: Brand;
  category: Category;
  subcategory: SubCategory[];
  reviews: review[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}
