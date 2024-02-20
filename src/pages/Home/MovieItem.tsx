import { IMovie } from '../../models'
import { Rating } from '@mui/material'
import StarIcon from '@mui/icons-material/Star'

type Props = {
  movie: IMovie
  showRating?: boolean
  showCategory?: boolean
  titleClassName?: string
  imageContainerClassName?: string
}

function MovieItem(props: Props) {
  const {
    movie,
    showRating = false,
    showCategory = false,
    titleClassName = '',
    imageContainerClassName = ''
  } = props

  return (
    <div className={`relative pt-[148%] ${imageContainerClassName}`}>
      <img
        src={movie?.background_url}
        alt={movie?.title}
        className='absolute top-0 left-0 img-cover rounded-lg'
      />
      <div className='absolute bottom-4 px-6 w-full'>
        {showCategory && (
          <div className='flex flex-wrap gap-2 mb-1'>
            {movie?.categories?.map((category: string) => {
              return (
                <div
                  key={category}
                  className='bg-categoryBg rounded uppercase py-1 px-2 text-xs font-semibold'
                >
                  {category}
                </div>
              )
            })}
          </div>
        )}
        <p
          className={`text-lg uppercase font-semibold line-clamp-1 mb-1 ${titleClassName}`}
        >
          {movie?.title}
        </p>
        {showRating && (
          <div className='h-[18px]'>
            {movie?.rating && (
              <Rating
                size='small'
                precision={0.5}
                value={movie?.rating}
                readOnly
                emptyIcon={
                  <StarIcon
                    style={{ opacity: 0.55, color: '#fff' }}
                    fontSize='inherit'
                  />
                }
              />
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default MovieItem
