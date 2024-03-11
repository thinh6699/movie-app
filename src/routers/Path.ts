const routes = {
  home: '/',
  movies: '/movies',
  movie_create: '/movies/create',
  celebrities: '/celebrities',
  movie_edit: (id?: any) => (id ? `/movies/${id}` : '/movies/:id')
}

export default routes
