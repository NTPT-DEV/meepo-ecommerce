'use client'
import { logoutUser } from "@/actions/auth"
import { User } from "@prisma/client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import HeaderSeachBar from "./HeaderSearchBar"
import { useShallow } from "zustand/shallow"
import { useCartStore } from "@/app/stores/cart-store"


const AnouncementBar = () => {
    return (
        <div className="w-full bg-black py-2">
            <div className="container mx-auto flex items-center justify-center px-8">
                <span className="text-center text-sm font-medium text-white tracking-wide">
                    FREE SHIPPING ON ORDER OVER $15.00 / FREE RETURN
                </span>
            </div>
        </div>
    )
}

type HeaderProps ={ 
   user: Omit<User, "password"> | null;
   categorySelector : React.ReactNode

}

const Header = ({user , categorySelector} : HeaderProps) => {
    const router = useRouter();
    const [ isOpen , setIsOpen ] = useState<boolean>(true)
    const [ prevScrollY , setPrevScrollY ] = useState<number>(0)

    const { open , getTotalItems } = useCartStore(
        useShallow((state) => ({
            open : state.open , 
            getTotalItems : state.getTotalItems
        }))
    )

    useEffect(()=> {
        const handleScroll = () => {
            const currentScrollY = window.scrollY ;
            const scrolledUp = currentScrollY < prevScrollY

            if (scrolledUp) { 
                setIsOpen(true); 
            } else if(currentScrollY > 100) {
                setIsOpen(false); 
            }

            setPrevScrollY(window.scrollY); 
        }
        setPrevScrollY(window.scrollY)
        window.addEventListener('scroll' , handleScroll);

        return () => {
            window.removeEventListener('scroll' , handleScroll)
        }

    },[prevScrollY])


  return (
    <header className="w-full sticky top-0 z-60">
        <div className={`w-full transform transition duration-300 ease-in-out ${isOpen ? 'translate-y-0' : '-translate-y-full opacity-0'}`}>
            <AnouncementBar/>

            <div className="w-full flex justify-between items-center py-3 sm:py-4 bg-white/50 shadow-sm border-b border-gray-100 backdrop-blur-xs">
                <div className="flex justify-between items-center container mx-auto px-8">
                    <div className="flex flex-1 justify-start imtems-center gap-4 sm:gap-6">
                        <button className="text-gray-700 hover:text-gray-900 md:hidden">
                        <svg className="w-5 h-5 sm:w-6 sm:h-6"  width="800px" height="800px" viewBox="0 0 20 20" fill="none">
  <path fill="currentColor" fillRule="evenodd" d="M19 4a1 1 0 01-1 1H2a1 1 0 010-2h16a1 1 0 011 1zm0 6a1 1 0 01-1 1H2a1 1 0 110-2h16a1 1 0 011 1zm-1 7a1 1 0 100-2H2a1 1 0 100 2h16z"/>
                        </svg>
                        </button>
                        <nav className="hidden md:flex gap-4 lg:gap-6 text-sm font-medium">
                            {categorySelector}
                            <Link href='#'>New Arrivals</Link>
                            <Link href='#'>Sale</Link>
                        </nav>
                    </div>
                    <Link href='#' className="absolute left-1/2 -translate-x-1/2">
                    <span className='text-xl sm:text-2xl font-bold tracking-tight'>
                        DEAL
                    </span>
                    </Link>
                    <div className="flex flex-1 justify-end items-center gap-4 sm:-4">
                        <HeaderSeachBar />

                        {user ? 

                        <div className='flex items-center gap-2 sm-gap-4'>
                            <span className='text-xs text-gray-700 md:block'>{user.email}</span>
                            <Link href="#" 
                            className="text-sm text-gray-700 hover:text-gray-900"
                            onClick={async (e)=> {
                             e.preventDefault();
                             await logoutUser();
                             router.refresh()
                            }}
                            >Logout</Link>
                        </div>            
                         :
                        <>
                        <Link href="/auth/sign-in">Login</Link>
                        <Link href="/auth/sign-up">Sign up</Link>
                        </>
                        }


                        <button onClick={() => open()} className="text-gray-700 hover:text-gray-900 relative">
                              <svg 
                              className="w-5 h-5 sm:h-6 sm:w-6"
                              width="800px" height="800px" viewBox="0 0 24 24" fill="none">
                              <path d="M3.86376 16.4552C3.00581 13.0234 2.57684 11.3075 3.47767 10.1538C4.3785 9 6.14721 9 9.68462 9H14.3153C17.8527 9 19.6214 9 20.5222 10.1538C21.4231 11.3075 20.9941 13.0234 20.1362 16.4552C19.5905 18.6379 19.3176 19.7292 18.5039 20.3646C17.6901 21 16.5652 21 14.3153 21H9.68462C7.43476 21 6.30983 21 5.49605 20.3646C4.68227 19.7292 4.40943 18.6379 3.86376 16.4552Z" stroke="currentColor" strokeWidth="1.5"/>
                              <path d="M19.5 9.5L18.7896 6.89465C18.5157 5.89005 18.3787 5.38775 18.0978 5.00946C17.818 4.63273 17.4378 4.34234 17.0008 4.17152C16.5619 4 16.0413 4 15 4M4.5 9.5L5.2104 6.89465C5.48432 5.89005 5.62128 5.38775 5.90221 5.00946C6.18199 4.63273 6.56216 4.34234 6.99922 4.17152C7.43808 4 7.95872 4 9 4" stroke="currentColor" strokeWidth="1.5"/>
                              <path d="M9 4C9 3.44772 9.44772 3 10 3H14C14.5523 3 15 3.44772 15 4C15 4.55228 14.5523 5 14 5H10C9.44772 5 9 4.55228 9 4Z" stroke="currentColor" strokeWidth="1.5"/>
                              <path d="M8 13V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M16 13V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M12 13V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                              <span className='absolute -top-1.5 -right-1.5 bg-black text-white text-[10px]  sm:text-xs w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full flex items-center justify-center'>
                                {getTotalItems()}
                                </span>
                        </button>

                    </div>
                </div>
            </div>
        </div>
    </header>
  )
}
export default Header