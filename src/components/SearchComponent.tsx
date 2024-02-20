import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import SearchIcon from '@mui/icons-material/Search'

function SearchComponent() {
  return (
    <div className='container sticky top-0 z-[9999]'>
      <div className='border-4 border-solid border-black flex'>
        <Select
          value=''
          classes={{
            select:
              '!w-[120px] md:!w-[150px] !p-3 !bg-searchInputBg !rounded-none !text-white !text-base'
          }}
          MenuProps={{
            classes: {
              paper: '!bg-searchInputBg !text-white !rounded-none !top-[151px]'
            }
          }}
        >
          <MenuItem value='movie'>Movie</MenuItem>
          <MenuItem value='cast'>Cast</MenuItem>
        </Select>
        <div className='flex-grow bg-searchInputBg text-headerMenuColor flex justify-between items-center'>
          <input
            type='text'
            placeholder='Search'
            className='flex-grow outline-0 border-l border-solid border-black bg-searchInputBg p-3 text-base w-full'
          />
          <SearchIcon className='relative -left-2' />
        </div>
      </div>
    </div>
  )
}

export default SearchComponent
