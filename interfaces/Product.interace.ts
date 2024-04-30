export interface ProductModel {
  _id: string;
  categories: string[];
  tags: string[];
  title: string;
  image: string;
  description: string;
  link: string;
  price: number;
  credit: number;
  oldPrice: number;
  characteristics: ProductsCharacteristic[];
  advantages?: string;
  initialRating: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
  html: string;
  companyId: string;
  clicks: number;
  reviews: ReviewModal[];
  reviewCount: number;
  reviewAvg?: number;
}

export interface ProductsCharacteristic {
  name: string;
  value: string;
}

export interface ReviewModal {
  _id: string;
  name: string;
  title: string;
  description: string;
  rating: number;
  productId: string;
  createdAt: string;
}
