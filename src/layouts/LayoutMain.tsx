import Footer from 'components/Footer'
import Header from 'components/Header'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function LayoutMain(props: any) {
  const { children } = props
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <main className='flex-1 py-4 main-bg'>{children}</main>
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
