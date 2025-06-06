"use server"

import Stripe from "stripe"
import { getCurrentSession } from "./auth"
import { getOrCreateCart } from "./cart-action"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY! , {
    apiVersion: '2025-03-31.basil'
})

export const createCheckoutSession = async (cardId : string) => {
    const { user } = await getCurrentSession(); 
    const cart  = await getOrCreateCart(cardId);

    if(cart.items.length === 0 ) {
        throw new Error ('Cart is empty')
    } 

    const totalPrice = cart.items.reduce((acc , item) => acc + (item.price * item.quantity) , 0 )

    const session = await stripe.checkout.sessions.create({
        mode : 'payment' , 
        line_items : cart.items.map((item)=> ({
            price_data : {
                currency : 'thb' , 
                product_data: {
                    name: item.title , 
                    images: [item.image]
                } , 
                unit_amount : Math.round(item.price * 100 )
            } , 
            quantity : item.quantity
        })) , 
        success_url : `${process.env.NEXT_PUBLIC_BASE_URL!}/checkout/success?session_id={CHECKOUT_SESSION_ID}` , 
        cancel_url : `${process.env.NEXT_PUBLIC_BASE_URL!}`,
        customer_email : user?.email , 
        metadata : { 
            cartId : cart.id ,
            userId : user?.id?.toString() || '-'
        } , 
        shipping_address_collection :  { 
            allowed_countries: ['TH']
        } , 
        shipping_options : [
            {
                shipping_rate_data : {
                    type :  'fixed_amount' ,
                    fixed_amount : {
                        currency : 'thb' , 
                        amount : totalPrice >= 3000 ? 0 : 200 

                    },
                    display_name: totalPrice >= 3000 ? 'Free Shipping' : 'Shipping' ,
                    delivery_estimate : {
                        minimum: {
                            unit : 'business_day' , 
                            value : 2
                        },
                        maximum: {
                            unit : 'business_day' , 
                            value : 4 
                        },
                    }
                }
            }
        ]
    });

    if(!session.url) {
        throw new Error('Failed to create checkout session')
    }

    return session.url

}