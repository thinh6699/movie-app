import Button from '@mui/material/Button'
import { useLocation, useNavigate } from 'react-router-dom'
import Path from 'routers/Path'
import { useState, useEffect } from 'react'
import { IMovie } from 'models'
import { movieList } from 'services/MovieService'
import { useTranslation } from 'react-i18next'
import { Rating } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { PER_PAGE } from 'helpers/constants'
import { removeFieldEmptyValue } from 'helpers'
import LayoutMain from 'layouts/LayoutMain'

function Movies() {
  const location = useLocation()
  const paramSearch = new URLSearchParams(location.search)
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [lstMovie, setLstMovie] = useState<IMovie[]>([])
  const [loading, setLoading] = useState(false)
  const [totalItem, setTotalItem] = useState(0)
  const [filterValues, setFieldValues] = useState({
    page: paramSearch.get('page') || 1,
    per_page: paramSearch.get('per_page') || PER_PAGE,
    search: paramSearch.get('search') || ''
  })

  const getListMovies = async () => {
    // handle url
    const url = new URLSearchParams(removeFieldEmptyValue({ ...filterValues }))
    navigate(`?${url}`, { replace: true })

    setLoading(true)
    const response = await movieList({
      ...removeFieldEmptyValue(filterValues)
    }).finally(() =>
      setTimeout(() => {
        setLoading(false)
      }, 700)
    )
    setLstMovie([...response.data.data])
    setTotalItem(response.data.total)
  }

  useEffect(() => {
    getListMovies()
    // eslint-disable-next-line
  }, [filterValues.page])

  const onPaginationModelChange = (model: any) => {
    const newPage = model?.page
    setFieldValues({ ...filterValues, page: newPage + 1 })
  }

  const columns = [
    {
      field: 'title',
      headerName: t('validation_field.title'),
      minWidth: 250,
      headerClassName: 'custom'
    },
    {
      field: 'description',
      headerName: t('validation_field.description'),
      minWidth: 250,
      flex: 1,
      headerClassName: 'custom'
    },
    {
      field: 'categories',
      headerName: t('validation_field.categories'),
      minWidth: 300,
      flex: 1,
      headerClassName: 'custom',
      valueGetter: (params: any) => {
        const categories = params?.row?.categories
        return categories.map((item: any) => item.name).join(', ')
      }
    },
    {
      field: 'background_url',
      headerName: t('validation_field.background_url'),
      headerClassName: 'custom',
      width: 200,
      renderCell: (item: any) => {
        const backgroundUrl = item?.row?.background_url
        return (
          <div className='w-[100px] flex-shrink-0 h-full pr-2 py-2'>
            <img
              className='w-full h-full object-cover'
              src={backgroundUrl}
              alt=''
            />
          </div>
        )
      }
    },
    {
      field: 'rating',
      headerName: t('validation_field.rating'),
      headerClassName: 'custom',
      width: 200,
      renderCell: (item: any) => {
        const rating = item?.row?.rating
        return <Rating readOnly value={rating} />
      }
    }
  ]

  return (
    <LayoutMain>
      <div className='container'>
        <div className='flex items-center justify-between gap-3 mb-6'>
          <div className='text-[24px]'>{t('movies.list_title')}</div>
          <Button
            variant='contained'
            classes={{
              root: '!uppercase !bg-loginBtnBg !font-semibold'
            }}
            onClick={() => navigate(Path.movie_create)}
          >
            {`+ ${t('movies.create_movie')}`}
          </Button>
        </div>

        <div className='mb-6 flex items-center gap-3'>
          <input
            className='input max-w-[200px] w-full'
            placeholder='Search a movie by title'
            value={filterValues.search}
            onChange={e => {
              const { value } = e.target
              setFieldValues({ ...filterValues, search: value })
            }}
            onKeyDown={(event: any) => {
              if (event.key === 'Enter') {
                if (filterValues.page === 1) {
                  getListMovies()
                } else {
                  setFieldValues({ ...filterValues, page: 1 })
                }
              }
            }}
          />
          <Button
            variant='contained'
            classes={{
              root: '!uppercase !bg-loginBtnBg !font-semibold'
            }}
            onClick={() => {
              if (filterValues.page === 1) {
                getListMovies()
              } else {
                setFieldValues({ ...filterValues, page: 1 })
              }
            }}
          >
            {t('common.search')}
          </Button>
        </div>

        <div className='list-movies'>
          <div className='w-full bg-white rounded-lg overflow-hidden'>
            <DataGrid
              autoHeight
              getRowId={(item: any) => item.id}
              getRowClassName={() => 'cursor-pointer'}
              rows={lstMovie}
              columns={columns}
              loading={loading}
              rowCount={totalItem}
              paginationMode='server'
              disableColumnMenu
              paginationModel={{
                pageSize: PER_PAGE,
                page: Number(filterValues.page) - 1
              }}
              pageSizeOptions={[PER_PAGE]}
              onPaginationModelChange={model => {
                onPaginationModelChange(model)
              }}
              rowHeight={72}
              onRowClick={(params, event) => {
                event.preventDefault()
                navigate(Path.movie_edit(params?.id))
              }}
            />
          </div>
        </div>
      </div>
    </LayoutMain>
  )
}

export default Movies
