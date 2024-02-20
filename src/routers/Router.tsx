import { Route, Routes } from 'react-router-dom'
import LayoutMain from '../layouts/LayoutMain'
import Home from '../pages/Home'

function Routers() {
  const RequireAuth = ({ children }: { children: JSX.Element }) => {
    // const token = store.getState().token
    // const location = useLocation()

    // if (!token) {
    //   // Redirect them to the /login page, but save the current location they were
    //   // trying to go to when they were redirected. This allows us to send them
    //   // along to that page after they login, which is a nicer user experience
    //   // than dropping them off on the home page.
    //   const name = encodeURIComponent(location.pathname)
    //   return (
    //     <Navigate
    //       to={`login?redirect=${name}`}
    //       state={{ from: location }}
    //       replace
    //     />
    //   )
    // }
    return children
  }

  return (
    <Routes>
      {/* <Route element={<LayoutAuth />}>
        <Route path='login' element={<Login />} />
        <Route path='line-login' element={<LineLogin />} />
      </Route> */}
      <Route
        element={
          <RequireAuth>
            <LayoutMain />
          </RequireAuth>
        }
      >
        <Route path='/' element={<Home />} />
      </Route>
    </Routes>
  )
}

export default Routers
