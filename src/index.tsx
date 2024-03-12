import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import store from 'stores/store'
import reportWebVitals from './reportWebVitals'
import i18n from './langs'
import './validation'
import { I18nextProvider } from 'react-i18next'
import './index.css'
import './assets/scss/index.scss'
import Routers from 'routers/Router'

const container = document.getElementById('root')!
const root = createRoot(container)

root.render(
  <Provider store={store}>
    <I18nextProvider i18n={i18n}>
      <Routers />
    </I18nextProvider>
  </Provider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
