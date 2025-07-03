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

function createCard(e) {
	const card = $(
		`<div data-id=${e.id} class="card bg-white p-5 mb-5 rounded-xl shadow-md clear-both dark:bg-slate-800 dark:ring dark:ring-gray-50/50 lg:flex lg:flex-col lg:justify-between">
					<div>
						<img src="${e.logo}" alt="${e.name}" class="float-left mr-3">
						<div>
							<h3 class="font-bold text-2xl text-slate-800 dark:text-gray-50">${e.name}</h3>
							<p class="text-slate-800 text-[1rem] dark:text-gray-300">${e.description}</p>
						</div>
					</div>
					<div class="mt-10 flex justify-between items-center">
						<button
							class="remove-extension bg-white hover:bg-gray-100 active:bg-gray-50 text-slate-600 px-4 py-2 rounded-full font-bold cursor-pointer border border-zinc-300 dark:text-gray-50 dark:bg-slate-800 dark:hover:bg-slate-700 dark:active:bg-slate-800 dark:border-0 dark:ring dark:ring-gray-50/50">Remove</button>
						<label for="activate--${e.id}"
							class="relative block h-6 w-11 rounded-full bg-gray-400 transition-colors [-webkit-tap-highlight-color:_transparent] has-checked:bg-red-700 dark:has-checked:bg-red-500">
							<input type="checkbox" ${e.isActive ? 'checked' : ''} id="activate--${e.id}" class="peer sr-only card-toggle" />

							<span
								class="absolute inset-y-0 start-0 m-1 size-4 rounded-full bg-white transition-[inset-inline-start] peer-checked:start-5"></span>
						</label>
					</div>
				</div>`
	)

	return card
}

async function getCards() {
	const extensions = await getExtensions()

	extensions.forEach(e => {
		const card = createCard(e)
		$('#main').append(card)
	})
}

export { getCards } 