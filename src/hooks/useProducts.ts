import { useFetch } from './useFetch';


export interface Product {
  title: string
  description: string
  brand: string
  price: number
  thumbnail: string
}

interface ProductResponse {
  products: Product[]
}

const BASE_URL = 'https://dummyjson.com'

const mapper = (data: ProductResponse) => data.products;

export function useProducts(query: string) {
  const { data: products = [], ...state } = useFetch<ProductResponse, Product[]>({
    baseUrl: BASE_URL,
    path: `/products/search?q=${query}`,
    mapper
  });
  return { products, ...state }
}