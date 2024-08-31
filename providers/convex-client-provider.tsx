"use client"
import {ClerkProvider, useAuth} from "@clerk/nextjs";
import {ConvexProviderWithClerk} from "convex/react-clerk";
import {AuthLoading, Authenticated, ConvexReactClient} from "convex/react";
import Logo from "@/components/auth/logo";

interface ConvexClientProviderProps {
    children: React.ReactNode
}

const convexURL = process.env.NEXT_PUBLIC_CONVEX_URL!

const convex = new ConvexReactClient(convexURL)

export const ConvexClientProvider = ({children}: ConvexClientProviderProps) => {
    return <ClerkProvider >
        <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
            <Authenticated>{children}</Authenticated>
            <AuthLoading>
                <Logo/>
            </AuthLoading>
        </ConvexProviderWithClerk>
    </ClerkProvider>
}