import { useState } from "react";
import "./App.css";

import { Box, SearchBox, InlineSpinner } from "./ui";
import { useProducts } from './hooks/useProducts';

import { Product } from './components/product'

import type { Product as ProductType } from "./hooks/useProducts";


function App() {  
  const [query, setQuery] = useState('')
  const { products, isLoading } = useProducts(query)

  return (
    <Box width='70vw'>
      <Box mb={3} position='sticky' display='flex' top={0} width='100%' background='white' p={4}>
        <SearchBox 
          placeholder="Search for products..." 
          width='90%' 
          value={query}
          onInputChange={setQuery}
        />
        <Box width='10%' display='flex' justifyContent='center' alignItems='center'>
          {isLoading && <InlineSpinner size='large' />}
        </Box>
      </Box>
        <ProductList products={products}/>
    </Box>
  );
}

function ProductList({products}: { products: ProductType[]}) {
  return (
    <Box mx={4}>
      {products?.map((product) =>
        <Product
          title={product.title}
          thumbnail={product.thumbnail}
          description={product.description}
          price={product.price}
          brand={product.brand}
        />
      )}
    </Box>
  )
}

export default App;
