import { API_BASE_URL, ACCESS_TOKEN } from '../../constants/Connect';

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })
    
    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
    .then(response => 
        response.json().then(json => {
            if(!response.ok) {
                return Promise.reject(json);
            }
            return json;
        })
    );
};

export function getCurrentUser() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/user/me",
        method: 'GET'
    });
}


export function getCurrentAdmin() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/admin/me",
        method: 'GET'
    });
}

// Login and Signup

export function forgotPassword(emailRequest) {
    return request({
        url: API_BASE_URL + "/auth/forgot-password",
        method: 'POST',
        body: JSON.stringify(emailRequest)
    });
}

export function changeConfirmedStatus(emailRequest) {
    return request({
        url: API_BASE_URL + "/auth/confirmed",
        method: 'POST',
        body: JSON.stringify(emailRequest)
    });
}

export function resetPassword(resetPassword) {
    return request({
        url: API_BASE_URL + "/auth/reset-password",
        method: 'POST',
        body: JSON.stringify(resetPassword)
    });
}

export function login(loginRequest) {
    return request({
        url: API_BASE_URL + "/auth/login",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}

export function signup(signupRequest) {
    return request({
        url: API_BASE_URL + "/auth/signup",
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}

export function changePassword(changePasswordRequest) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/auth/change-password",
        method: 'POST',
        body: JSON.stringify(changePasswordRequest)
    });
}


export function addCategory(category) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/category/create",
        method: 'POST',
        body: JSON.stringify(category)
    });
}

export function addStore(store) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/store/create-store",
        method: 'POST',
        body: JSON.stringify(store)
    });
}

export function addSupply(supply) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/supply/create",
        method: 'POST',
        body: JSON.stringify(supply)
    });
}

export function getAllCategory(pageNo, pageSize, name) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/category/getAll?page="+pageNo+"&pageSize="+pageSize+"&name="+name,
        method: 'GET'
    });
}

export function getAllStore(pageNo, pageSize, name) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/store/get-all?page="+pageNo+"&pageSize="+pageSize+"&name="+name,
        method: 'GET'
    });
}

export function getAllSupply(pageNo, pageSize, name) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/supply/getall-supply?page="+pageNo+"&pageSize="+pageSize+"&name="+name,
        method: 'GET'
    });
}

export function getAllProduct() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/product",
        method: 'GET'
    });
}