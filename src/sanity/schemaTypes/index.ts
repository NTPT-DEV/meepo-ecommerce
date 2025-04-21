import { order, orderItem, shippingAddress } from '@/sanity/schemaTypes/schemas/order'
import { product } from '@/sanity/schemaTypes/schemas/product'
import { productCategory } from '@/sanity/schemaTypes/schemas/product-category'
import { promotionCampaign } from '@/sanity/schemaTypes/schemas/promotion-campaign'
import { promotionCode } from '../schemaTypes/schemas/promotion-code'
import { type SchemaTypeDefinition } from 'sanity'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    promotionCode,
    promotionCampaign,

    
    productCategory,
    product,
    
    shippingAddress,
    orderItem,
    order,
  ],
}
