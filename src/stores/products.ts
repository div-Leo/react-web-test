import { makeAutoObservable, runInAction } from "mobx";
import axios from 'axios';
import debounce from 'lodash/debounce'
import { addRetries } from "../functions/addRetries";

const BASE_URL = 'https://dummyjson.com'

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  brand: string;
  thumbnail: string;
}

interface ProductResponse {
  products: Product[]
}

class ProductSearchStore {
  products: Product[] = [];
  query: string = '';
  isLoading: boolean = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
    this.searchProducts()
  }

  setQuery = (newQuery: string): void => {
    this.query = newQuery;
    this.debouncedSearch();
  }

  private searchProducts = async (): Promise<void> => {
    runInAction(() => {
      this.isLoading = true;
      this.error = null;
    })

    try {
      const response = await axios.get<ProductResponse>(this.getSearchURL());
      runInAction(() => {
        this.products = response.data.products;
      });
    } catch (error) {
      runInAction(() => {
        this.error = error instanceof Error ? error.message : 'An unknown error occurred';
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  private getSearchURL = () => {
    const url = new URL('/products/search', BASE_URL);
    if (this.query.length > 0) {
      url.searchParams.append('q', this.query);
    }
    return url.toString();
  };

  private debouncedSearch = debounce(addRetries(this.searchProducts), 300);
}

export const productSearchStore = new ProductSearchStore();