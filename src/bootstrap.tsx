// import { createRoot } from 'react-dom/client'
// import { RouterProvider } from 'react-router-dom'
// import { router } from './components/router/Routes'
// const root = document.querySelector('#root')

// if (!root) {
// 	throw new Error('root not found')
// }

// const container = createRoot(root)
// container.render(<RouterProvider router={router} />)
import { createRoot } from 'react-dom/client'
import App from './components/App'
const root = document.querySelector('#root')

if (!root) {
	throw new Error('root not found')
}

const container = createRoot(root)
container.render(<App />)
