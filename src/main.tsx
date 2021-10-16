import React from 'react'
import ReactDOM from 'react-dom'
import './index.sass'
import App from './components/App'

if (import.meta.env.MODE === 'development') {
  // @ts-ignore
  import('./mocks/browser').then(
    ({ worker }) => worker.start()
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
