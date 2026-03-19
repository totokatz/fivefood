import { useState, useEffect } from 'react'
import './App.css'
import LoadingScreen from './components/LoadingScreen'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import ProductSpotlight from './components/ProductSpotlight'
import BrandStory from './components/BrandStory'
import Lifestyle from './components/Lifestyle'
import Footer from './components/Footer'

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <LoadingScreen isLoading={isLoading} />
      <Navbar />
      <main>
        <Hero />
        <Features />
        <ProductSpotlight />
        <BrandStory />
        <Lifestyle />
      </main>
      <Footer />
    </>
  )
}

export default App
