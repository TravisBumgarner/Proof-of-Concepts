const getLocalStorage = (key: string) => {
    const result = localStorage.getItem(key)
    return result ? JSON.parse(result) : ''
}

const setLocalStorage = (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value))
}

export {
    getLocalStorage,
    setLocalStorage
}