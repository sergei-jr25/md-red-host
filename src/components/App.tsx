import { lazy, Suspense, useState } from 'react'
import { BrowserRouter, Link, Outlet, Route, Routes } from 'react-router-dom'
const ShopRouter = lazy(() => import('shop/Router'))
const AdminRouter = lazy(() => import('admin/Router'))
// import classes from './App.module.scss'

// useEffect(() => {
// 	checkRemote(`http://localhost:5001/remoteEntry.js`)
// 		.then((res: boolean) => {
// 			setIsAvailable1(res)
// 			setIsLoading(true)
// 		})
// 		.finally(() => setIsLoading(false))
// }, [])
// useEffect(() => {
// 	checkRemote(`http://localhost:5002/remoteEntry.js`)
// 		.then((res: boolean) => {
// 			setIsAvailable2(res)
// 			setIsLoading(true)
// 		})
// 		.finally(() => setIsLoading(false))
// }, [])

function char(a: number) {
	console.log(a)
}

const App = () => {
	const [isAvailable1, setIsAvailable1] = useState(false)
	const [isAvailable2, setIsAvailable2] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	return (
		<div data-testid={'AppTestId'}>
			<h1 data-testid={'AppTitle'} style={{ color: 'red' }}>
				PLATFORM {__PLATFORM__}
			</h1>
			<h2>2 title</h2>

			<nav>
				<Link to='/'>Home</Link>
				<Link to='/about'>About</Link>
				<Link to='/shop'>Shop</Link>
			</nav>
			<BrowserRouter basename='/app'>
				<Routes>
					<Route
						path='/about'
						element={
							<Suspense fallback={<div>Loading Shop...</div>}>
								<ShopRouter />
							</Suspense>
						}
					/>
					<Route
						path='/shop'
						element={
							<Link to={'/shop'}>
								<Suspense fallback={<div>Loading Admin...</div>}>
									<AdminRouter />
								</Suspense>
							</Link>
						}
					/>
				</Routes>
			</BrowserRouter>

			<Outlet />
		</div>
	)
}
export default App
