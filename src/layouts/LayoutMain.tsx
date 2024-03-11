import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function LayoutMain() {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <main className='flex-1 py-4 main-bg'>
        <Outlet />
      </main>
      <Footer />
      <ToastContainer
        position='top-right'
        autoClose={2000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme='light'
        limit={3}
      />
    </div>
  )
}

export default LayoutMain
