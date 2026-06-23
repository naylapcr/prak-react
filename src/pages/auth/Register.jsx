import { useState } from "react"
import { BsFillExclamationDiamondFill } from "react-icons/bs"
import { ImSpinner2 } from "react-icons/im"
import { useNavigate } from "react-router-dom"
import { supabase } from "../../services/supabaseClient"

export default function Register() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [dataForm, setDataForm] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
    })

    const handleChange = (evt) => {
        const { name, value } = evt.target
        setDataForm({
            ...dataForm,
            [name]: value,
        })
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault()
        setError("")
        setSuccess("")

        if (dataForm.password !== dataForm.confirmPassword) {
            setError("Password dan konfirmasi password tidak sama.")
            return
        }

        setLoading(true)

        const { data, error: signUpError } = await supabase.auth.signUp({
            email: dataForm.email,
            password: dataForm.password,
            options: {
                data: {
                    full_name: dataForm.fullName,
                    role: "member",
                },
            },
        })

        if (signUpError) {
            setError(signUpError.message)
            setLoading(false)
            return
        }

        if (data.user) {
            await supabase
                .from("profiles")
                .upsert({
                    id: data.user.id,
                    full_name: dataForm.fullName,
                    role: "member",
                    tier: "bronze",
                    total_points: 0,
                })
        }

        setSuccess("Registrasi berhasil. Silakan login.")
        setLoading(false)
        setTimeout(() => navigate("/login"), 1200)
    }

    return (
        <div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
                Create Your Account
            </h2>

            {error && (
                <div className="bg-red-200 mb-5 p-5 text-sm font-light text-gray-600 rounded flex items-center">
                    <BsFillExclamationDiamondFill className="text-red-600 me-2 text-lg" />
                    {error}
                </div>
            )}

            {success && (
                <div className="bg-green-100 mb-5 p-5 text-sm font-light text-green-700 rounded">
                    {success}
                </div>
            )}

            {loading && (
                <div className="bg-gray-200 mb-5 p-5 text-sm rounded flex items-center">
                    <ImSpinner2 className="me-2 animate-spin" />
                    Mohon Tunggu...
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="mb-5">
                    <label
                        htmlFor="fullName"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Full Name
                    </label>
                    <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={dataForm.fullName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm
                            placeholder-gray-400"
                        placeholder="Nama lengkap"
                    />
                </div>

                <div className="mb-5">
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Email Address
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={dataForm.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm
                            placeholder-gray-400"
                        placeholder="you@example.com"
                    />
                </div>

                <div className="mb-5">
                    <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={dataForm.password}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm
                            placeholder-gray-400"
                        placeholder="********"
                    />
                </div>

                <div className="mb-6">
                    <label
                        htmlFor="confirmPassword"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={dataForm.confirmPassword}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm
                            placeholder-gray-400"
                        placeholder="********"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4
                        rounded-lg transition duration-300 disabled:opacity-50"
                >
                    {loading ? "Memproses..." : "Register"}
                </button>
            </form>
        </div>
    )
}
