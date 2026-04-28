import React, { useState, lazy, Suspense } from 'react' // Tambahkan lazy & Suspense
import "./assets/tailwind.css"
import { Route, Routes } from 'react-router-dom'
import Loading from './components/Loading'

// Ganti import statis menjadi lazy loading
const Dashboard = React.lazy(() => import('./pages/Dashboard'))
const Order = React.lazy(() => import('./pages/Order'))
const Customer = React.lazy(() => import('./pages/Customer'))
const NotFound = React.lazy(() => import('./pages/NotFound'))
const Login = React.lazy(() => import('./pages/auth/Login'))
const Register = React.lazy(() => import('./pages/auth/Register'))
const Forgot = React.lazy(() => import('./pages/auth/Forgot'))
const ErrorPage = React.lazy(() => import('./pages/ErrorPage'))

// MainLayout & AuthLayout biasanya dibiarkan statis karena sering langsung dipakai
const MainLayouts = React.lazy(() => import('./layouts/MainLayouts'))
const AuthLayout = React.lazy(() => import('./layouts/AuthLayout'))


function App() {
  const [count, setCount] = useState(0)

  const errorImg = "https://img.freepik.com/premium-vector/403-error-forbidden-with-police-concept-illustration_114360-1904.jpg";
  const errorImg1 = "https://static.vecteezy.com/system/resources/previews/069/722/287/non_2x/error-401-unauthorized-access-attempt-glyph-multi-circle-vector.jpg"
  return (
    <Suspense fallback={<Loading />}>
          <Routes>
            <Route element={<MainLayouts />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/order" element={<Order />} />
            <Route path="/customer" element={<Customer />} />

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

            <Route element={<AuthLayout/>}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register/>} />
            <Route path="/forgot" element={<Forgot/>} />
        </Route>
    </Routes>
    </Suspense>
  
        
     
  );
}

export default App;
