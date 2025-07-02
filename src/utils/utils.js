import $ from 'cash-dom'

function getCards() {
    if (
        (localStorage.getItem('extensions') !== null && JSON.parse(localStorage.getItem('extensions')).length == 0) || localStorage.getItem('extensions') === null
    ) {
        fetch('/data.json')
            .then(res => res.json())
            .then(data => {
                localStorage.setItem('extensions', JSON.stringify(data))
            })
    }

    const extensions = JSON.parse(localStorage.getItem('extensions'))

    // Membuat card dan append ke section
    extensions.forEach(e => {
        if (e.isActive) {
            const card = $(
                `<div data-id=${e.id} class="card bg-white p-5 mb-5 rounded-xl shadow-md clear-both dark:bg-slate-800 dark:ring dark:ring-gray-50/50">
					<div>
						<img src="${e.logo}" alt="${e.name}" class="float-left mr-3">
						<div>
							<h3 class="font-bold text-2xl text-slate-800 dark:text-gray-50">${e.name}</h3>
							<p class="text-slate-800 text-[1rem] dark:text-gray-300">${e.description}</p>
						</div>
					</div>
					<div class="mt-5 flex justify-between items-center">
						<button
							class="remove-extension bg-white text-slate-600 px-4 py-2 rounded-full font-bold cursor-pointer border border-zinc-300 dark:text-gray-50 dark:bg-slate-800 dark:border-0 dark:ring dark:ring-gray-50/50">Remove</button>
						<label for="activate--${e.id}"
							class="relative block h-6 w-11 rounded-full bg-red-700 dark:bg-red-500 transition-colors [-webkit-tap-highlight-color:_transparent] has-checked:bg-green-500">
							<input type="checkbox" checked="true" id="activate--${e.id}" class="peer sr-only card-toggle" />

							<span
								class="absolute inset-y-0 start-0 m-1 size-4 rounded-full bg-white transition-[inset-inline-start] peer-checked:start-5"></span>
						</label>
					</div>
				</div>`
            )
            $('#main').append(card)
        } else {
            const card = $(
                `<div data-id=${e.id} class="card bg-white p-5 mb-5 rounded-xl shadow-md clear-both dark:bg-slate-800 dark:ring dark:ring-gray-50/50">
					<div>
						<img src="${e.logo}" alt="${e.name}" class="float-left mr-3">
						<div>
							<h3 class="font-bold text-2xl text-slate-800 dark:text-gray-50">${e.name}</h3>
							<p class="text-slate-800 text-[1rem] dark:text-gray-300">${e.description}</p>
						</div>
					</div>
					<div class="mt-5 flex justify-between items-center">
						<button
							class="remove-extension bg-white text-slate-600 px-4 py-2 rounded-full font-bold cursor-pointer border border-zinc-300 dark:text-gray-50 dark:bg-slate-800 dark:border-0 dark:ring dark:ring-gray-50/50">Remove</button>
						<label for="activate--${e.id}"
							class="relative block h-6 w-11 rounded-full bg-red-700 dark:bg-red-500 transition-colors [-webkit-tap-highlight-color:_transparent] has-checked:bg-green-500">
							<input type="checkbox" id="activate--${e.id}" class="peer sr-only card-toggle" />

							<span
								class="absolute inset-y-0 start-0 m-1 size-4 rounded-full bg-white transition-[inset-inline-start] peer-checked:start-5"></span>
						</label>
					</div>
				</div>`
            )
            $('#main').append(card)
        }
    })
}


export { getCards }