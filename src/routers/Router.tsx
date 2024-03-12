import { Route, Routes, Outlet, BrowserRouter } from 'react-router-dom'
import Home from 'pages/Home'
import Movies from 'pages/Movies'
import MovieForm from 'pages/Movies/Form'
import Path from './Path'
import Login from 'pages/Authentication/Login'

function Routers() {
  const RequireAuth = () => {
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
    return <Outlet />
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RequireAuth />}>
          <Route path={Path.login} element={<Login />} />
          <Route path={Path.home} element={<Home />} />
          <Route path={Path.movies} element={<Movies />} />
          <Route path={Path.movie_create} element={<MovieForm />} />
          <Route path={Path.movie_edit()} element={<MovieForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Routers
