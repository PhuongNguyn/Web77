
const saveTokenToLocalstorage = (token) => {
    localStorage.setItem("accesstoken", token)
}

const removeTokenFromLocalstorage = () => {
    localStorage.removeItem("accesstoken")
}

const getTokenFromLocalStorage = () => {
    const token = localStorage.getItem("accesstoken")

    return token
}

const saveUserToLocalstorage = (user) => {
    localStorage.setItem("user", JSON.stringify(user))
}

const removeUserFromLocalstorage = () => {
    localStorage.removeItem("user")
}

const getUserFromLocalstorage = () => {
    const userString = localStorage.getItem("user")

    if (!userString) {
        return {}
    }

    const user = JSON.parse(userString)

    return user
}

export {
    saveUserToLocalstorage,
    removeUserFromLocalstorage,
    getUserFromLocalstorage,
    saveTokenToLocalstorage,
    removeTokenFromLocalstorage,
    getTokenFromLocalStorage
}