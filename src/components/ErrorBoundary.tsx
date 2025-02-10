import { Component, ReactNode } from 'react'

interface Props {
	children: ReactNode
	fallback?: ReactNode
}

interface State {
	hasError: boolean
}

class ErrorBoundary extends Component<Props, State> {
	constructor(props: Props) {
		super(props)
		this.state = { hasError: false }
	}

	static getDerivedStateFromError() {
		return { hasError: true }
	}

	componentDidCatch(error: any, errorInfo: any) {
		console.error('Ошибка в микрофронте:', error, errorInfo)
	}

	render() {
		if (this.state.hasError) {
			return this.props.fallback || <div>Что-то пошло не так...</div>
		}
		return this.props.children
	}
}

export default ErrorBoundary
