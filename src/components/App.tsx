import { checkRemote } from '@/shared/helpers/checkRemote'
import { useEffect, useState } from 'react'
import { BrowserRouter, Link, Outlet, Route, Routes } from 'react-router-dom'
// import classes from './App.module.scss'

function char(a: number) {
	console.log(a)
}

const App = () => {
	const [isAvailable1, setIsAvailable1] = useState(false)
	const [isAvailable2, setIsAvailable2] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		checkRemote(`http://localhost:5001/remoteEntry.js`)
			.then((res: boolean) => {
				setIsAvailable1(res)
				setIsLoading(true)
			})
			.finally(() => setIsLoading(false))
	}, [])
	useEffect(() => {
		checkRemote(`http://localhost:5002/remoteEntry.js`)
			.then((res: boolean) => {
				setIsAvailable2(res)
				setIsLoading(true)
			})
			.finally(() => setIsLoading(false))
	}, [])

	return (
		<div data-testid={'AppTestId'}>
			<h1 data-testid={'AppTitle'} style={{ color: 'red' }}>
				PLATFORM {__PLATFORM__}
			</h1>
			<h2>2 title</h2>
			<BrowserRouter basename='/app'>
				<Routes>
					<Route
						path='/'
						element={
							isAvailable2 ? (
								<Link to={'/about'}>About</Link>
							) : (
								<span>{'about'} (недоступно)</span>
							)
						}
					/>
					<Route
						path='/shop'
						element={
							isLoading && isAvailable1 ? (
								<Link to={'/shop'}>Shop</Link>
							) : (
								<span>{'shop'} (недоступно)</span>
							)
						}
					/>
				</Routes>
			</BrowserRouter>

			<Outlet />
		</div>
	)
}
export default App
