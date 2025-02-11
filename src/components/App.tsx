import { lazy, Suspense, useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
const ShopRouter = lazy(() => import('shop/Router'))
const AdminRouter = lazy(async () => await import('admin/Router'))

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
				<Link to='/admin'>Admin</Link>
				<Link to='/shop'>Shop</Link>{' '}
			</nav>
			<Routes>
				<Route
					path='/shop'
					element={
						// Исправлено: добавлен basename /app
						<Suspense fallback={<div>Loading Shop...</div>}>
							<ShopRouter />
							{/* <div>Admion</div> */}
						</Suspense>
					}
				/>
				<Route
					path='/admin'
					element={
						// Исправлено: добавлен basename /app
						<Suspense fallback={<div>Loading Admin...</div>}>
							<AdminRouter />
						</Suspense>
					}
				/>
				<Route path='/' element={<div>Home Page Content</div>} />{' '}
				{/* Добавлен Route для Home */}
			</Routes>
			{/* Outlet больше не нужен */}
		</div>
	)
}
export default App

// <BrowserRouter basename='/app'>

// </BrowserRouter>
