import { observer } from "mobx-react-lite"

import "./App.css";

import { productSearchStore } from "./stores/products";

import { Box, SearchBox, InlineSpinner } from "./ui";
import { Product } from "./components/product"

import type { Product as ProductType } from "./stores/products";


const App = observer(() => {  
  const { query, products, isLoading, setQuery } = productSearchStore;

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
})

const ProductList = ({products}: { products: ProductType[]}) => {
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
