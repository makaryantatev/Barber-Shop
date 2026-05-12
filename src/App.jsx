import { Route, Routes } from "react-router-dom"
import Header from "./containers/header"
import Main from "./containers/main"
import Footer from "./containers/footer"
import './assets/css/darkmode.css'

import ThemeToggle from "./components/themeToggle/index"
import SignUp from "./components/signup"
import SignIn from "./components/signIn"
import Profile from "./components/profile"
import Contact from "./components/contact"
import Barber from "./components/barber"
import About from "./components/about"
import Navbar from "./components/navbar"
import Service from "./components/service"
import Pricing from "./components/pricing"
import Blog from "./components/blog"
import SingleBlog from "./components/eachBlog"
import AllReviews from "./components/allReviews"


function App() {

  return (
    <>
      <ThemeToggle />

      <Navbar />
      <Routes>
        <Route path="/" element={
          <>
            <Header />
            <Main />
          </>
        } />

        <Route path="/signUp" element={<SignUp />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/barber" element={<Barber />} />
        <Route path="/about" element={<About />} />
        <Route path="/servicesFull" element={<Service />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<SingleBlog />} />
        <Route path="/allReviews" element={<AllReviews />} />
      </Routes>
      <Footer />

    </>
  )
}


export default App
