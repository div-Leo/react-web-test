import { Card, Box, Text, Image } from "../ui";

import type { Product } from "../stores/products";

export function Product ({ thumbnail, title, brand, description, price }: Partial<Product>) {
  return (
    <Card my={2} p={2} level={200}>
      <Box textAlign='left' p={3} pb={2} display='flex'>
        <Image height='100%' width='25%' src={thumbnail} />
        <Box ml={3}>
          <Text as='h1'>{title}</Text>
          <Text>{brand}</Text>
          <Text as='p' variant='secondary' fontSize={1}>{description}</Text>
          <Text>Price: <Text as='strong'>{price}€</Text></Text>
        </Box>
      </Box>
    </Card>
  )
}