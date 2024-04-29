"use client"
import {PropsWithChildren} from "react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
const newClient = new QueryClient();
const Provider = ({children}: PropsWithChildren) => {
    return <QueryClientProvider client={newClient}>
        {children}
    </QueryClientProvider>
}
export default Provider
