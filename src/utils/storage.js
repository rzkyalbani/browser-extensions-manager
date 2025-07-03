function getAllExtensions() {
    if (localStorage.getItem('extensions')) return JSON.parse(localStorage.getItem('extensions'))
    return null
}

function updateExtensions(e) {
    localStorage.setItem('extensions', JSON.stringify(e))
}

export { getAllExtensions, updateExtensions }