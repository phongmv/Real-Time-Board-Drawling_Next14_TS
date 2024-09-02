"use client"
import {ClerkProvider, SignedIn, SignedOut, SignInButton, useAuth, UserButton} from "@clerk/nextjs";
import {ConvexProviderWithClerk} from "convex/react-clerk";
import {AuthLoading, Authenticated, ConvexReactClient, Unauthenticated} from "convex/react";
import Logo from "@/components/auth/logo";

interface ConvexClientProviderProps {
    children: React.ReactNode
}

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL!
const convex = new ConvexReactClient(convexUrl)

export const ConvexClientProvider = ({children}: ConvexClientProviderProps) => {
    return (
        <ClerkProvider>
            <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
                <SignedOut>
                    <SignInButton/>
                </SignedOut>
                <Authenticated>{children}</Authenticated>
                <AuthLoading>
                    <Logo/>
                </AuthLoading>
            </ConvexProviderWithClerk>
        </ClerkProvider>
    )
}

