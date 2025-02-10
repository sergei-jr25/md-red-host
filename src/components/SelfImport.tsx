import { lazy, Suspense } from 'react'
import ErrorBoundary from './ErrorBoundary'

const SafeImport = (importFunc: any, fallback: JSX.Element) => {
	const LazyComponent = lazy(importFunc)
	return (props: any) => (
		<Suspense fallback={<div>Загрузка...</div>}>
			<ErrorBoundary fallback={fallback}>
				<LazyComponent {...props} />
			</ErrorBoundary>
		</Suspense>
	)
}
export default SafeImport
