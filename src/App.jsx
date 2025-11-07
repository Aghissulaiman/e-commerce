import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Landingpages from './pages/Landingpages'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Loginpage from './pages/Loginpage'
import Daftar from './components/Daftar'
import Homepages from './pages/Homepages'
import Detail from './pages/Detail'
import Checkout from './components/Checkout'
import KeranjangPege from './pages/KeranjangPege'
import ProfilPage from './pages/ProfilPage'
import Daftarpages from './pages/Daftarpages'
import Historipage from './pages/historipage'
function App() {
  return (
    <>
<BrowserRouter>
  <Routes>
    <Route index element={<Landingpages />} />
    <Route path="login" element={<Loginpage />} />
    <Route path="register" element={<Daftar />} />
    <Route path="Home" element={<Homepages />} />
    <Route path="Detail/:id" element={<Detail />} />
    <Route path="Checkout" element={<Checkout/>} />
    <Route path="Keranjang" element={<KeranjangPege/>} />
    <Route path="profil" element={<ProfilPage />} />
    <Route path="Histori" element={<Historipage />} />
  </Routes>
</BrowserRouter>
    </>
  )
}

export default App
