import SalesCampaignBanner from "@/components/layout/SalesCampaignBanner";
import AddToCartButton from "@/components/product/AddToCartButton";
import { formatPrice } from "@/lib/utils";
import { getProductById } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { ChevronRight, Home } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const ProductPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product.price) {
    return <div>Product not found</div>;
  }
  const originalPrice = product.price * 5;

  return (
    <div className="bg-gray-50">
      <SalesCampaignBanner />

      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm">
            <Link
              href="/"
              className="text-gray-600 hover:text-red-600 transition-colors flex items-center gap-1"
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-400 truncate">{product.title}</span>
          </div>
        </div>
      </div>

      {/* Product Sale Banner */}

      <div className="bg-gradient-to-r from-red-500/10 to-red-600/10 py-6 px-4">
        <div className="container mx-auto">
          <h1 className="text-2xl md:text-4xl font-bold text-center text-red-600 mb-3">
            🔥 FLASH SALE - 80% OFF 🔥
          </h1>
          <div className="flex flex-col items-center gap-2">
            <p className="text-center text-red-500 text-sm md:text-base font-semibold animate-pulse">
              ⚡Only {Math.floor(Math.random() * 10) + 1} items left at this
              price!
            </p>
            <div className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm">
              ⏳Offer ends soon!
            </div>
          </div>
        </div>
      </div>

      {/* Guaruntee Item */}
      <div className="bg-gradient-to-r grom-yellow-500/10 to-yellow-600/10 py-4">
        <div className="container mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-yellow-600">📦</span>
              <span className="font-medium">Free Express Shipping</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-yellow-600">📦</span>
              <span className="font-medium">Satisfacation Guaranteed</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-yellow-600">📦</span>
              <span className="font-medium">Secure Check out</span>
            </div>
          </div>
        </div>
      </div>
      {/* Product details */}

      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}

          <div className="bg-white rounded-2xl p-4 aspect-square overflow-hidden shadow-lg">
            {product.image && (
              <div className="relative aspect-square rounded-2xl p-2  overflow-hidden shadow-lg ">
                <Image
                  src={urlFor(product.image).url()} // Ensure the URL is a string
                  fill
                  priority
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  alt={product.title ?? "Product Image"}
                />
              </div>
            )}
          </div>

          {/* Product Information */}

          <div className="flex flex-col gap-4 px-4">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              {product.title}
            </h1>
            <p className="text-gray-600">{product.description}</p>

            {/* Price Section  */}
            <div className="flex flex-col gap-2 mt-4">
              <div className="flex items-center gap-3">
                <div className="flex items-baseline gap-1">
                  <span className="text-xs font-bold text-red-600">THB</span>
                  <span className="text-5xl font-black text-red-600 -tracking-normal ">
                    {formatPrice(product.price).replace(".00", "")}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-lg text-gray-400 line-through decoration-red-500 decoration-2">
                    {formatPrice(originalPrice).replace(".00", "")}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="bg-red-600 text-white px-2 py-0.5 rounded text-sm font-bold animate-pulse">
                      -80%
                    </span>
                    <span className="text-red-600 font-bold text-sm text-center">
                      MEGA SAVINGS
                    </span>
                  </div>
                </div>
              </div>


               <div className="flex items-center gap-2 bg-red-50 p-2 rounded-lg">
                 <span className="text-red-600 font-bold">💰</span>
                 <span className="text-red-600 fonr-medium text-sm">
                    You save {formatPrice(originalPrice - product.price)}
                    </span>
               </div>
               <div className="flex items-center gap-2 text-xs text-gray-600">
                    <span className="inline-block w-2 h-2 bg-lime-500 rounded-full animate-pulse"></span>
                    <span>{Math.floor(Math.random() * 50 ) +20 } people bought in the last hour</span>
               </div>

            </div>

            <div className="bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 p-4 rounded">
                <div className="flex items-center gap-2 text-yellow-800">
                    <span className="text-xl">⚡</span>
                    <span className="font-bold">Limited Time Offer!</span>
                </div>
                <div className="text-sm text-yellow-700 mt-1 font-medium pl-2">
                   Order Now before Price Changes! 
                </div>
            </div>

            <AddToCartButton product={product} />
            <div className="flex flex-col gap-3 mt-6 text-sm bg-white p-4 rounded-xl shadow-sm border border-gray-50">
                <div className="flex items-center gap-3 text-gray-700 ">
                    <span className="bg-green-100 p-2 rounded-full">✅</span>
                    <span className="font-medium">In stock - Ship within 24 hr</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700 ">
                    <span className="bg-green-100 p-2 rounded-full">🔄️</span>
                    <span className="font-medium">30 day money-back guranteed</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700 ">
                    <span className="bg-green-100 p-2 rounded-full">🛡️</span>
                    <span className="font-medium">Secure payment processing</span>
                </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
