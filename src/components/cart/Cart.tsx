"use client";
import {  Loader2, ShoppingCart, X } from "lucide-react";
import { useCartStore } from "../../app/stores/cart-store";
import { useEffect, useMemo, useState } from "react";
import { useShallow } from "zustand/shallow";
import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import { createCheckoutSession } from "@/actions/stripe-actions";

const freeShippingAmount = 3000 ; // 1000 thb for Shipping 

const Cart = () => {
  const { cartId ,  updateQuantity , items, close, isOpen, syncWithUser, setLoaded , getTotalItems ,removeItem , getTotalPrice } = useCartStore(
    useShallow((state) => ({
      cartId : state.cartId , 
      updateQuantity : state.updateQuantity , 
      items: state.items,
      close: state.close,
      isOpen: state.isOpen,
      removeItem : state.removeItem,
      syncWithUser: state.syncWithUser,
      setLoaded: state.setLoaded,
      getTotalPrice : state.getTotalPrice ,
      getTotalItems : state.getTotalItems,
    }))
  );

  useEffect(() => {
    const initCart = async () => {
      await useCartStore.persist.rehydrate();
      await syncWithUser();
      setLoaded(true);
    };
    initCart();
  }, [syncWithUser , setLoaded]);

  const [ loadingProceed , setLoadingProceed ] = useState<boolean>(false) 
  const handleProceedToCheckout = async () => {
    if(!cartId || loadingProceed ) {
        return null ; 
    }
    setLoadingProceed(true)
    const checkoutUrl = await createCheckoutSession(cartId); 
    window.location.href = checkoutUrl;
    setLoadingProceed(false)
}


  const totalPrice = getTotalPrice();


   const remainingForFreeShipping = useMemo(() => {

    return Math.max(0 ,freeShippingAmount - totalPrice ) ; 
    
   },[totalPrice]) 



  return (
    <>
      {/* backdrop */}
      {isOpen && (
        <div
          onClick={close}
          className="fixed inset-0 bg-black/30 z-50 backdrop-blur-[1px] transition-all "/>
      )}
        <div className={`fixed right-0 top-0 h-full w-full sm:w-[400px] bg-white shadow-2xl
            transition-all duration-300 ease-in-out z-[60] ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
            
            <div className="flex flex-col h-full">
                {/* Cart Header */}
                <div className="flex items-center justify-between p-4 border-b bg-gray-50 border-gray-100">
                    <div className="flex items-center gap-2">
                        <ShoppingCart className="w-6 h-6" />
                        <h2 className="text-lg font-semibold ">Shopping Cart</h2>
                        <span className="bg-gray-200 px-2 py-1 rounded-full text-sm font-medium"
                        >{getTotalItems()}
                        </span>
                    </div>
                    <button onClick={close}
                    className="p-2 hover:bg-gray-200 rounded-full transition-all duration-200"
                    >
                        <X className="w-5 h-5"/>
                    </button>
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto">
                    {items.length === 0 ?
                    (
                        <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <ShoppingCart className="w-8 h-8 text-gray-400" /> 
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            Your cart is empty
                          </h3>
                          <p className="text-gray-500 mb-6">
                            Look like you have not added any items to your cart yet!
                          </p>
                          <Link href='/'
                          onClick={close}
                          className="bg-black text-white px-6 py-2 rounded-full font-medium hover:bg-gray-800 transition-all duration-200"
                          >
                            Start Shopping
                          </Link>
                        </div>
                    ) 
                    : 
                    (

                        <div className="divide-y divide-gray-100">
                            {items.map((item , index)=>( 
                                <div key={index} className="flex gap-4 p-4 hover:bg-gray-50 transition-all duration-100">
                                    <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-gray-200 border">
                                        <Image 
                                        src={item.image} 
                                        alt={item.title}
                                        fill 
                                        className="object-cover"
                                        /> 
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-medium text-gray-900 truncate">
                                            {item.title}
                                        </h3>
                                        <div className="text-sm text-gray-500 mt-1">
                                            {formatPrice(item.price)}
                                        </div>
                                        <div className="flex items-center gap-3 mt-2">
                                            <select 
                                            className="border rounded-md px-2 py-1 bg-white"
                                            value={item.quantity}
                                            onChange={(e) => updateQuantity(item.id , Number(e.target.value))}
                                            >
                                                {[1 ,2 ,3 , 4 , 5 ,6 , 7 , 8 ,9 ,10 , 11 , 12].map((num) =>(
                                                    <option className="w-5" 
                                                    value={num}
                                                    key={`cart-qty-slct-${item.id}-${num}`}>
                                                        {num}
                                                    </option>
                                                ))}
                                            </select>
                                            <button 
                                            onClick={()=> removeItem(item.id)}
                                            className="text-red-500 cursor-pointer">
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Cart Footer */}

                {items.length > 0 && (
                    <div className="border-t">
                        {/* Shipping Progress */}
                        {remainingForFreeShipping > 0 ? (
                                <div className='p-4 bg-blue-50 border-b'>
                                    <div className='flex items-center gap-2 text-blue-800 mb-2'>
                                        <span>🚚</span>
                                        <span className='font-medium'>
                                            Add {formatPrice(remainingForFreeShipping)} more for FREE shipping
                                        </span>
                                    </div>
                                    <div className='w-full bg-blue-200 rounded-full h-2'>
                                        <div
                                            className='bg-blue-600 h-2 rounded-full transition-all duration-300'
                                            style={{ width: `${Math.min(100, (totalPrice / freeShippingAmount) * 100)}%` }}
                                        />
                                    </div>
                                </div>
                            ) : (
                                <div className='p-4 bg-green-50 border-b'>
                                    <div className='flex items-center gap-2 text-green-800'>
                                        <span>✨</span>
                                        <span className='font-medium'>
                                            You have unlocked FREE shipping!
                                        </span>
                                    </div>
                                </div>
                            )}

                        {/* Order sumary & check out */}

                            <div className="p-4 space-y-4">
                                <div className='space-y-2'>
                                        <div className='flex items-center justify-between text-sm'>
                                            <span className='text-gray-500'>Subtotal</span>
                                            <span className='font-medium'>{formatPrice(totalPrice)}</span>
                                        </div>
                                        <div className='flex items-center justify-between text-sm'>
                                            <span className='text-gray-500'>Shipping</span>
                                            <span className='font-medium'>
                                                {remainingForFreeShipping > 0 ? 'Calculated at checkout' : 'FREE'}
                                            </span>
                                        </div>
                                 </div>
                                 <div className='border-t pt-4'>
                                    <div className='flex items-center justify-between mb-4'>
                                        <span className='font-medium text-lg'>Total</span>
                                        <span className='font-bold text-lg'>{formatPrice(totalPrice)}</span>
                                    </div>

                                    <button
                                        className='w-full bg-black text-white py-4 rounded-full font-bold hover:bg-gray-900 transition-colors flex items-center justify-center'
                                        onClick={handleProceedToCheckout}
                                        disabled={loadingProceed}
                                    >
                                        {loadingProceed ? 
                                        (<div className="flex items-center gap-1">
                                            Navigating to checkout...
                                            <Loader2 className="w-4 h-4 animate-spin"/>
                                        </div>):
                                        'Processed to Checkout'}
                                    </button>

                                    <div className='mt-4 space-y-2'>
                                        <div className='flex items-center gap-2 text-sm text-gray-500'>
                                            <span>🔒</span>
                                            <span>Secure checkout</span>
                                        </div>
                                        <div className='flex items-center gap-2 text-sm text-gray-500'>
                                            <span>🔄</span>
                                            <span>30-day returns</span>
                                        </div>
                                        <div className='flex items-center gap-2 text-sm text-gray-500'>
                                            <span>💳</span>
                                            <span>All major payment methods accepted</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        

                    </div>
                )}
            </div>
        </div>

    </>
  );
};
export default Cart;
