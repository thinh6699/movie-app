import { Navigate, Outlet, useLocation } from 'react-router-dom'
import store from 'stores/store'

export default function AuthRoute() {
  const token = store.getState().token
  const location = useLocation()

  if (token) {
    return <Outlet />
  }

  // Redirect them to the /login page, but save the current location they were
  // trying to go to when they were redirected. This allows us to send them
  // along to that page after they login, which is a nicer user experience
  // than dropping them off on the home page.
  const name = encodeURIComponent(location.pathname)
  return (
    <Navigate
      to={`login?redirect=${name}`}
      state={{ from: location }}
      replace
    />
  )
}
