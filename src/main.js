import $ from 'cash-dom'
import { getCards } from './utils/utils.js'

const $toggleTheme = $('#ThemeToggle')
const $root = $('html')

// Load preferensi sebelumnya yang disimpan di localStorage
if (localStorage.getItem('theme') === 'dark') {
    $toggleTheme.prop('checked', true)
    $root.addClass('dark')
}

// Pengkondisian saat toggle dirubah
$($toggleTheme).on('change', function () {
    if ($(this).prop('checked')) {
        $root.addClass('dark')
        localStorage.setItem('theme', 'dark')
    } else {
        $root.removeClass('dark')
        localStorage.setItem('theme', 'light')
    }
})

// Mengambil data
getCards()

$('.card-toggle').on('change', function () {
    const isChecked = $(this).prop('checked')
    const $card = $(this).closest('.card')
    const $cardId = $card.data('id')
    const extensions = JSON.parse(localStorage.getItem('extensions'))

    const newExtensions = extensions.map(v => {
        if (v.id === $cardId) return { ...v, isActive: isChecked }
        return v
    })

    localStorage.setItem('extensions', JSON.stringify(newExtensions))
})

$('.remove-extension').on('click', function () {
    let confirmed = confirm('Do you want to remove this extension?')
    let $card = $(this).closest('.card')
    const $cardId = $card.data('id')
    const extensions = JSON.parse(localStorage.getItem('extensions'))

    if (confirmed) {
        const newExtensions = extensions.filter(v => v.id !== $cardId)

        localStorage.setItem('extensions', JSON.stringify(newExtensions))
        location.reload()
    }
})

if (localStorage.getItem('category') !== null) {
    $('.category-btn').attr('data-category-state', 'inactive')
    $(`[data-category="${localStorage.getItem('category')}"]`).attr('data-category-state', 'active')
}

$('.category-btn').on('click', function () {
    $('.category-btn').attr('data-category-state', 'inactive')
    $(this).attr('data-category-state', 'active')

    localStorage.setItem('category', $(this).attr('data-category'))
    location.reload()
})

