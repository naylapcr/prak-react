import { Navigate, Outlet } from "react-router-dom"
import Loading from "./Loading"
import { useAuth } from "../contexts/AuthContext"

export default function GuestRoute() {
    const { loading, profile } = useAuth()

    if (loading) return <Loading />
    if (profile) return <Navigate to={profile.role === "admin" ? "/admin/dashboard" : "/member/dashboard"} replace />

    return <Outlet />
}
