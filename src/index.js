import App from './App.js'

// components (custom web components)
import './components/va-app-header'
import './components/va-recipe-card'

// styles
import './scss/master.scss'

// app.init
document.addEventListener('DOMContentLoaded', () => {
  App.init()
})