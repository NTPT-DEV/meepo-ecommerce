import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'
import { sanityFetch } from './live'
import { Product, ProductCategory } from '@/sanity.types'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
})

export const getAllProduct = async () => {
  const query = `*[_type == "product"]`
  const products = await sanityFetch({query : query})
  return products.data as Product[];
}
export const getAllCatagories = async () => {
  const query = `*[_type == "productCategory"]`
  const products = await sanityFetch({query : query})
  return products.data as ProductCategory[];
}

export const getCategoryBySlug = async ( slug : string ) => {
  const query = `*[_type == "productCategory" && slug.current == $slug][0]`
  const category = await sanityFetch({query : query, params : {slug}});
  return category.data as ProductCategory;
}

export const getProductByCategorySlug = async (slug: string) => {
  const category = await getCategoryBySlug(slug);
  const query = `*[_type == "product" && references($categoryId)]`;
  const products = await sanityFetch({ query: query, params: { categoryId: category._id } });
  return products.data as Product[];
}

export const getProductById = async (id : string) => {
 const query = `*[_type == "product" && _id == $id][0]`; 
 const product = await sanityFetch({query : query , params : {id}})
 return product.data as Product;
}

  
export const searchProducts = async (searchQuery : string ) => {
 const query = `*[_type == "product" && (
 title match "*" + $searchQuery + "*"  || 
 description match "*" + $searchQuery + "*"  || 
 category->title match "*" + $searchQuery + "*"  || 
 category->slug.current match "*" + $searchQuery + "*" 
 )]`;
 const products = await sanityFetch({query : query , params : {searchQuery}});
 return products.data as Product[]; 
}

