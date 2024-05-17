import { ReactNode, createContext, useMemo, useState } from "react";

export const LoadingContext = createContext<any>({})

export const LoadingContextProvider = ({children}: {children: ReactNode}) => {
    const [loading, setLoading] = useState<boolean>(false);

    const value = useMemo(()=>({loading, setLoading}), [loading]);

    console.log(loading);

    return (
        <LoadingContext.Provider value={value}>
            {children}
        </LoadingContext.Provider>
    )
}