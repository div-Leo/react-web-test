import { observer } from "mobx-react-lite"

import "./App.css";

import { productSearchStore } from "./stores/products";

import { Box, SearchBox, InlineSpinner } from "./ui";
import { Product } from "./components/product"

const App = observer(() => {  
  const { query, products, isLoading, setQuery } = productSearchStore;

  return (
    <Box width='70vw'>
      <h1>Product store</h1>
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
      <Box mx={4}>
        {products?.map((product) =>
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
    </Box>
  );
})

export default App;
