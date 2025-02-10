export const checkRemote = async (url: string) => {
	try {
		const response = await fetch(url, { method: 'HEAD' })
		if (response.ok) {
			return {}
		}
	} catch {
		return false
	}
}
