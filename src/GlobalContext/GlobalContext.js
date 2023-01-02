import { createContext, useEffect, useState } from "react";

const GlobalContext = createContext();

export const ContextProvider = ({children}) => {
    const [showImage, setShowImage] = useState({});
    const [openMenu, setOpenMenu] = useState(0);

    useEffect(() => {
        console.log(Object.keys(showImage).length);
    }, [showImage]);

    return(
        <GlobalContext.Provider value={{showImage, setShowImage, openMenu, setOpenMenu}}>
            {children}
        </GlobalContext.Provider>
    )
}


export default GlobalContext;