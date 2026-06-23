import React, { useState, lazy, Suspense } from 'react' // Tambahkan lazy & Suspense
import "./assets/tailwind.css"
import { Navigate, Route, Routes } from 'react-router-dom'
import Loading from './components/Loading'
import ProtectedRoute from './components/ProtectedRoute'
import GuestRoute from './components/GuestRoute'
import { useAuth } from './contexts/AuthContext'

// Ganti import statis menjadi lazy loading
const Dashboard = React.lazy(() => import('./pages/Dashboard'))
const Order = React.lazy(() => import('./pages/Order'))
const Product = React.lazy(() => import('./pages/Products'))
const Customer = React.lazy(() => import('./pages/Customer'))
const NotFound = React.lazy(() => import('./pages/NotFound'))
const Login = React.lazy(() => import('./pages/auth/Login'))
const Register = React.lazy(() => import('./pages/auth/Register'))
const ErrorPage = React.lazy(() => import('./pages/ErrorPage'))
const ProductDetail = React.lazy(() => import('./pages/ProductDetail'))
const MainLayouts = React.lazy(() => import('./layouts/MainLayouts'))
const AuthLayout = React.lazy(() => import('./layouts/AuthLayout'))
const Components = React.lazy(() => import("./pages/Components"))
const FiturXyz = React.lazy(() => import("./pages/FiturXyz"))
const Notes = React.lazy(() => import("./pages/Notes"))
const MemberDashboard = React.lazy(() => import("./pages/member/MemberDashboard"))

function HomeRedirect() {
  const { loading, profile } = useAuth()

  if (loading) return <Loading />
  if (!profile) return <Navigate to="/login" replace />

  return <Navigate to={profile.role === "admin" ? "/admin/dashboard" : "/member/dashboard"} replace />
}

function App() {
  const [count, setCount] = useState(0)

  const errorImg = "https://img.freepik.com/premium-vector/403-error-forbidden-with-police-concept-illustration_114360-1904.jpg";
  const errorImg1 = "https://static.vecteezy.com/system/resources/previews/069/722/287/non_2x/error-401-unauthorized-access-attempt-glyph-multi-circle-vector.jpg"
  return (
    <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<HomeRedirect />} />

            <Route element={<ProtectedRoute role="admin" />}>
            <Route element={<MainLayouts />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/orders" element={<Order />} />
            <Route path="/admin/customers" element={<Customer />} />
            <Route path="/admin/products" element={<Product />} />
            <Route path="/admin/products/:id" element={<ProductDetail />} />
            </Route>
            </Route>

            <Route element={<ProtectedRoute role="member" />}>
            <Route element={<MainLayouts />}>
            <Route path="/member/dashboard" element={<MemberDashboard />} />
            </Route>
            </Route>

            <Route element={<ProtectedRoute role="admin" />}>
            <Route element={<MainLayouts />}>
            <Route path="/orders" element={<Order />} />
            <Route path="/customers" element={<Customer />} />
            <Route path="/products" element={<Product />} />
            <Route path="/products/:id" element={<ProductDetail />} /> 
            <Route path="/components" element={<Components />} />
            <Route path="/fitur-xyz" element={<FiturXyz />} />
            <Route path="/notes" element={<Notes />} />
            
            {/* Route khusus Error Pages sesuai perintah */}
            <Route 
              path="/error/400" 
              element={
                <ErrorPage  
                  errorCode="400" 
                  errorDescription="Bad Request: Permintaan tidak dapat diproses." 
                  errorImage={errorImg} 
                />
              } 
            />
            <Route 
              path="/error/401" 
              element={
                <ErrorPage 
                  errorCode="401" 
                  errorDescription="Unauthorized: Anda tidak memiliki akses ke halaman ini." 
                  errorImage={errorImg1} 
                />
              } 
            />
            <Route 
              path="/error/403" 
              element={
                <ErrorPage 
                  errorCode="403" 
                  errorDescription="Forbidden: Akses ditolak secara permanen." 
                  errorImage={errorImg} 
                />
              } 
            />
            {/* Fallback Route */}
            <Route path="*" element={<NotFound />} />
            </Route>
            </Route>
            
            <Route element={<GuestRoute />}>
            <Route element={<AuthLayout/>}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register/>} />
            <Route path="/forgot" element={<Navigate to="/login" replace />} />
            </Route>
        </Route>
    </Routes>
    </Suspense>
  
        
     
  );
}

export default App;
