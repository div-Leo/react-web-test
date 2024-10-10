import { observer } from "mobx-react-lite"

import "./App.css";

import { productSearchStore } from "./stores/products";

import { Box, SearchBox, InlineSpinner, Text } from "./ui";
import { Product } from "./components/product"

const App = observer(() => {  
  return (
    <Box width='70vw'>
      <h1>Product store</h1>
      <SearchProducts/>
      <ProductList/>
    </Box>
  );
})

const ProductList = observer(() => {
  const { products, error } = productSearchStore;
  
  return (
      <Box mx={4}>
        {error ?
          <Text fontSize='large'> Something bad happend! Retry later... </Text>
          : products?.map((product) =>
            <Product
              key={product.id}
              title={product.title}
              thumbnail={product.thumbnail}
              description={product.description}
              price={product.price}
              brand={product.brand}
            />
          )}
      </Box>
  );
})

const SearchProducts = observer(() => {
  const { query, isLoading, setQuery } = productSearchStore;

  return (
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
  );
})

export default App;
