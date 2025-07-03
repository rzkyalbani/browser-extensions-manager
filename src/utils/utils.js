import $ from 'cash-dom'

async function getExtensions() {
	let extensions

	let category = localStorage.getItem('category')

	if (
		localStorage.getItem('extensions') === null || JSON.parse(localStorage.getItem('extensions')).length == 0
	) {
		const response = await fetch('/data.json')
		extensions = await response.json()

		localStorage.setItem('extensions', JSON.stringify(extensions))
	}

	let rawData = extensions = JSON.parse(localStorage.getItem('extensions'))

	if (!category || category === 'all') {
		extensions = rawData
	} else {
		let isActive = category === 'active' ? true : false
		extensions = rawData.filter(data => data.isActive === isActive)
	}

	return extensions

}

async function getCards() {
	// let category = localStorage.getItem('category')
	let extensions = await getExtensions()
	console.log(extensions)

}

export { getCards } 