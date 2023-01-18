const authTokenKey: string = 'authToken'


function setAuthToken(newToken: string) {
    localStorage.setItem(authTokenKey, newToken)
}


function cleanAuthToken() {
    localStorage.removeItem(authTokenKey)
}


function getAuthToken() {
    return localStorage.getItem(authTokenKey) || ""
}


function isAuthenticated() {
    if (typeof window !== 'undefined') {
        return (localStorage.getItem(authTokenKey)) ? true : false
    }
    return false
}


function getAuthHeader() {
    const authHeaders = {
        headers: {
            'Authorization': `Token ${getAuthToken()}`
        }
    }
    return authHeaders
}

export { getAuthHeader, setAuthToken, cleanAuthToken, isAuthenticated, getAuthToken }
