import { Product } from "@/sanity.types"
import ProductItem from "./ProductItem"

type ProductGridProps = {
    products : Product[]
}


const ProductGrid = ({products} : ProductGridProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {products.map((product , index) =>( 
            <ProductItem 
            key={index}
            product={product}
            />
        ))}

    </div>

)
}
export default ProductGrid