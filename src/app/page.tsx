
import SalesCampaignBanner from "@/components/layout/SalesCampaignBanner";
import ProductGrid from "@/components/product/ProductGrid";
import { getAllProduct } from "@/sanity/lib/client";


const HomePage = async () => {
 
  const products = await getAllProduct();

  return (
    <div>
      <SalesCampaignBanner /> 

      <section className="container mx-auto px-4 py-16">
        <ProductGrid products={products}/> 
      </section>
    </div>
  );
}
export default HomePage