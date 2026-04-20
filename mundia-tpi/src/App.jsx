import Footer from "./components/layout/footer/Footer"
import NavBar from "./components/layout/navBar/NavBar"
import Outlet from "./components/outlet/Outlet"


function App() {

  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default App
