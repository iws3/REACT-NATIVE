import { createContext } from 'react'

export {createContext} from 'react'
export const FavoriteContext=createContext({
    id:[],
    addFavorite:(id)=>{},
    removeFavorite:()=>{},
})


function FavoriteContextProvider({children}){
   return <FavoriteContext.Provider>{children}</FavoriteContext.Provider> 
}

export default FavoriteContextProvider