"use client";
import { useCartStore } from "@/app/stores/cart-store";
import { formatPrice } from "@/lib/utils";
import { Product } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useShallow } from "zustand/shallow";

type AddtoCartProps = {
  product: Product;
};

const AddToCartButton = ({ product }: AddtoCartProps) => {

 const { addItem , open} = useCartStore(
  useShallow( (state) => ({
    addItem : state.addItem , 
    open : state.open, 
  }))
  
 )

  const [isLoading, setIsLoading] = useState(false);

  const handleAddCart = async () => {
    if(!product.title || product.price === undefined || !product.image) {
      return ; 
    }
    setIsLoading(true);
    // Add item to cart
    await new Promise(resolve => setTimeout(resolve , 500));

    addItem({
      id : product._id , 
      title : product.title , 
      price : product.price , 
      image : urlFor(product.image).url() ,
      quantity : 1 ,
    });

    setIsLoading(false);
    
    open(); // Open cart after adding item
  };

  console.log(product);
  if (!product || !product.price) {
    return null;
  }

  return (
    <button
      onClick={handleAddCart}
      disabled={isLoading}
      className={`w-full mt-6 bg-gradient-to-r from-red-500 to-red-600
            text-white py-4 rounded-full font-bold text-xl hover:from-red-600 hover:to-red-700 transition-all duration-200 transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3 disabled:
            opacity-80 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:active:scale-100 disabled:hover:from-red-500  disabled:hover:to-red-600`}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>Adding to Cart...</span>
        </>
      ) : (
        <>
          <svg 
          className="w-6 h-6"
          viewBox="0 0 24 24" 
          width="1em" 
          height="1em">
            <path
              fill="currentColor"
              d="M15.55 13c.75 0 1.41-.41 1.75-1.03l3.58-6.49A.996.996 0 0 0 20.01 4H5.21l-.94-2H1v2h2l3.6 7.59l-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7l1.1-2zM6.16 6h12.15l-2.76 5H8.53zM7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2s-.9-2-2-2m10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2s2-.9 2-2s-.9-2-2-2"
            ></path>
          </svg>
          Add to Cart = {formatPrice(product.price)}
        </>
      )}
    </button>
  );
};

export default AddToCartButton;
