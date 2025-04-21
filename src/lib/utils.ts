export const formatPrice = (price : number) => {
    const roundedPrice = Math.floor(price)
     return new Intl.NumberFormat("th-TH" , {
        style : 'currency' , 
        currency : 'THB'
     }).format(roundedPrice) 
}