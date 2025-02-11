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
import { BrowserRouter } from 'react-router-dom'
import App from './components/App'
const root = document.querySelector('#root')

if (!root) {
	throw new Error('root not found')
}

const container = createRoot(root)
container.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>
)
