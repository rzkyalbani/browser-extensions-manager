import $ from 'cash-dom'

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