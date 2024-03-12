import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper'
import { ICelebrity, IMovie } from 'models'
import MovieItem from './MovieItem'
import SearchComponent from 'components/SearchComponent'
import { useEffect, useState } from 'react'
import { celebrityList } from 'services'
import { RESPONSE_STATUS } from 'helpers/constants'
import LayoutMain from 'layouts/LayoutMain'

function Home() {
  const [topRatedMovies, setTopRatedMovies] = useState<IMovie[]>([])
  const [favoriteMovies, setFavoriteMovies] = useState<IMovie[]>([])
  const [celebrities, setCelebrities] = useState<ICelebrity[]>([])

  let breakpoints = {
    320: {
      slidesPerView: 1,
      slidesPerGroup: 1
    },
    400: {
      slidesPerView: 2,
      slidesPerGroup: 2
    },
    640: {
      slidesPerView: 3,
      slidesPerGroup: 3
    },
    1024: {
      slidesPerView: 4,
      slidesPerGroup: 4
    }
  }

  useEffect(() => {
    setFavoriteMovies([])
    setTopRatedMovies([])
    // getMovieList()
    getCelebrityList()
  }, [])

  // const getMovieList = async () => {
  //   const movieResponse = await movieList()
  //   const { status, data } = movieResponse || {}
  //   if (status === RESPONSE_STATUS.SUCCESS && data) {
  //     let favoriteMovies = data.filter(
  //       (item: IMovie) => item.type === MOVIE_TYPE.FAVORITE
  //     )
  //     let topRatedMovies = data.filter(
  //       (item: IMovie) => item.type === MOVIE_TYPE.TOP_RATED
  //     )
  //     setFavoriteMovies(favoriteMovies)
  //     setTopRatedMovies(topRatedMovies)
  //   }
  // }

  const getCelebrityList = async () => {
    const celebResponse = await celebrityList()
    const { status, data } = celebResponse || {}
    if (status === RESPONSE_STATUS.SUCCESS && data) {
      setCelebrities([...data])
    }
  }

  return (
    <LayoutMain>
      <SearchComponent />

      {topRatedMovies.length > 0 && (
        <div className='top-rate-movie'>
          <div className='container'>
            <Swiper
              modules={[Autoplay]}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false
              }}
              loop={true}
              className='mySwiper'
              spaceBetween={20}
              breakpoints={breakpoints}
            >
              {topRatedMovies?.map((movie: IMovie) => {
                return (
                  <SwiperSlide key={movie?.id}>
                    <MovieItem movie={movie} showCategory showRating />
                  </SwiperSlide>
                )
              })}
            </Swiper>
          </div>
        </div>
      )}

      <div className={`container ${!topRatedMovies.length ? 'mt-[60px]' : ''}`}>
        <div className='grid lg:grid-cols-12'>
          <div className='lg:col-span-8 xl:col-span-9'>
            <div className='flex flex-col gap-10'>
              <div className='favorite'>
                <div className='flex items-center justify-between mb-6'>
                  <span className='uppercase font-semibold text-2xl text-white'>
                    in favorite
                  </span>
                  <span className='cursor-pointer text-headerMenuColor'>
                    View all
                  </span>
                </div>

                <div className='grid grid-cols-1 md:!grid-cols-4 gap-4 custom-grid'>
                  {favoriteMovies?.slice(0, 4)?.map((movie: IMovie) => {
                    return (
                      <MovieItem
                        key={movie?.id}
                        movie={movie}
                        titleClassName='text-center !text-sm'
                        imageContainerClassName='!pt-[130%]'
                      />
                    )
                  })}
                </div>
              </div>

              <div className='generes'>
                <div className='flex items-center justify-between mb-6'>
                  <span className='uppercase font-semibold text-2xl text-white'>
                    in generes
                  </span>
                  <span className='cursor-pointer text-headerMenuColor'>
                    View all
                  </span>
                </div>

                <div className='grid grid-cols-1 md:!grid-cols-4 gap-4 custom-grid'>
                  {favoriteMovies?.slice(0, 4)?.map((movie: IMovie) => {
                    return (
                      <MovieItem
                        key={movie?.id}
                        movie={movie}
                        titleClassName='text-center !text-sm'
                        imageContainerClassName='!pt-[130%]'
                      />
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className='lg:col-span-4 xl:col-span-3 mt-[60px] lg:mt-0 lg:ml-[60px]'>
            <div className='flex flex-col gap-12'>
              <div className='advertisement'>
                <div className='max-w-[400px] lg:max-w-[unset] mx-auto'>
                  <div className='text-xs font-semibold text-center mb-2'>
                    Advertisement
                  </div>
                  <div className='relative pt-[100%]'>
                    <img
                      src='https://picsum.photos/200/300?random=50'
                      alt='advertisement'
                      className='absolute top-0 left-0 img-cover'
                    />
                  </div>
                </div>
              </div>

              {celebrities.length > 0 && (
                <div className='spotlight-celeb'>
                  <div className='text-lg font-semibold uppercase pb-3 border-b border-solid border-mainBorderColor'>
                    spotlight celebrities
                  </div>

                  <div className='py-4 flex flex-col gap-4'>
                    {celebrities.map((celebritiy: ICelebrity) => (
                      <div
                        key={celebritiy?.id}
                        className='flex items-center gap-4'
                      >
                        <div className='w-[100px]'>
                          <div className='relative pt-[130%]'>
                            <img
                              src={celebritiy?.image_url}
                              alt='advertisement'
                              className='absolute top-0 left-0 img-cover rounded-lg'
                            />
                          </div>
                        </div>
                        <div className='font-semibold'>{celebritiy?.name}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </LayoutMain>
  )
}

export default Home
