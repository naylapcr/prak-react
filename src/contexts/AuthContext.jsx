import { createContext, useContext, useEffect, useMemo, useState } from "react"
import { supabase } from "../services/supabaseClient"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    const [session, setSession] = useState(null)
    const [profile, setProfile] = useState(null)
    const [loading, setLoading] = useState(true)

    const loadProfile = async (userId) => {
        if (!userId) {
            setProfile(null)
            return null
        }

        const { data, error } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", userId)
            .single()

        if (error) {
            setProfile(null)
            return null
        }

        setProfile(data)
        return data
    }

    useEffect(() => {
        let active = true

        const initAuth = async () => {
            setLoading(true)
            const { data } = await supabase.auth.getSession()

            if (!active) return

            setSession(data.session)
            await loadProfile(data.session?.user?.id)
            setLoading(false)
        }

        initAuth()

        const { data: listener } = supabase.auth.onAuthStateChange(async (_event, nextSession) => {
            setSession(nextSession)
            await loadProfile(nextSession?.user?.id)
            setLoading(false)
        })

        return () => {
            active = false
            listener.subscription.unsubscribe()
        }
    }, [])

    const value = useMemo(() => ({
        session,
        user: session?.user || null,
        profile,
        loading,
        isAdmin: profile?.role === "admin",
        isMember: profile?.role === "member",
        refreshProfile: (userId = session?.user?.id) => loadProfile(userId),
    }), [session, profile, loading])

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}
