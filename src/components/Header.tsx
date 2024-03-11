import logo from '../assets/images/logo.png'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import { ChangeThemeSwitch } from '../helpers'
import MenuIcon from '@mui/icons-material/Menu'
import { IHeaderMenu } from '../models'
import Path from '../routers/Path'

function Header() {
  const lstMenu: IHeaderMenu[] = [
    {
      id: 1,
      title: 'Movies',
      url: Path.movies
    },
    {
      id: 2,
      title: 'Celebrities',
      url: Path.celebrities
    }
  ]

  return (
    <header className='bg-headerBg py-5'>
      <div className='container'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center'>
            <Link to={Path.home} className='logo'>
              <img src={logo} alt='logo'></img>
            </Link>

            <div className='hidden md:flex items-center gap-5 text-headerMenuColor uppercase font-semibold ml-10'>
              {lstMenu.map((item: IHeaderMenu) => {
                return (
                  <Link key={item.id} to={item.url}>
                    {item.title}
                  </Link>
                )
              })}
            </div>
          </div>

          <div className='flex items-center'>
            <FormGroup className='!hidden !md:flex'>
              <FormControlLabel
                control={<ChangeThemeSwitch sx={{ m: 1 }} />}
                label=''
                classes={{
                  root: '!m-0'
                }}
              />
            </FormGroup>

            <Button
              variant='contained'
              classes={{
                root: '!rounded-full !uppercase !bg-loginBtnBg !font-semibold'
              }}
            >
              Login
            </Button>

            <MenuIcon className='md:!hidden ml-3' fontSize='large' />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
