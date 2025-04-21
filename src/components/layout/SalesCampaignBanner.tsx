'use client'
import { useRouter } from "next/navigation"

const SalesCampaignBanner = () => {

  const router = useRouter()

  return (
    <div className="w-full bg-gradient-to-r from-red-500 via-orange-500 to-red-600 py-3 relative">
        <div className="container mx-auto px-4">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 text-white ">
                <div className="flex items-center gap-2">
                    <span className="text-xl sm:text-2xl font-cold animate-bounce ">
                         🔥   
                    </span>
                    <div className="text-sm sm:text-base font-semibold">
                      FLASH SALE ENDS IN:
                    </div>
                    <div className="bg-white/20 rounded px-2 py-1 font-mono font-semibold">
                      23 : 59 : 59
                    </div>

                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-vold">⚡</span>
                  <span className="font-semibold text-yellow-200 animate-pulse">UP TO 95% OFF !</span>
                </div>
                <button  
                className="bg-white text-red-600 px-4 py-1 rounded-full font-semibold text-sm hover:text-red-800 transition-color duration-200 shadow-lg"
                onClick={() => router.push('/')}
                >SHOP NOW</button>
            </div>
        </div>
    </div>
  )
}
export default SalesCampaignBanner