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

export function lockedAccount(id) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL +"/auth/"+ id + "/locked",
        method: 'POST'
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

export function addInvertory(productId, storeId, quatity) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/product/inventory?productId="+productId+"&storeId="+storeId+"&quantity="+quatity,
        method: 'POST',
    });
}

export function editCategory(id,category) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/category?id="+id,
        method: 'PATCH',
        body: JSON.stringify(category)
    });
}

export function  updateCartItemQuantity(id,quantity) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/orderitem?id="+id+"&quantity="+quantity,
        method: 'PATCH',
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

export function addOrderItem(store) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/orderitem",
        method: 'POST',
        body: JSON.stringify(store)
    });
}

export function payment(store) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/payment",
        method: 'POST',
        body: JSON.stringify(store)
    });
}

export function changeOrderItem(id) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/orderitem/"+id,
        method: 'PUT',
    });
}

export function addOrder(store) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/order",
        method: 'POST',
        body: JSON.stringify(store)
    });
}

export function editStore(id, store) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/store?id="+id,
        method: 'PATCH',
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

export function editSupply(id,supply) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/supply/change-supply?id="+id,
        method: 'PATCH',
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

export function getCountProduct() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/product/count-product",
        method: 'GET'
    });
}

export function getPriceMonth() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/order/pricemonth?year=2023&month=9",
        method: 'GET'
    });
}

export function deleteCategory(id) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/category?id="+id,
        method: 'DELETE'
    });
}

export function deleteStore(id) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/store/delete-store?id="+id,
        method: 'DELETE'
    });
}

export function deleteSupply(id) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/supply/delete?id="+id,
        method: 'DELETE'
    });
}

export function deleteCartItem(id) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/orderitem?id="+id,
        method: 'DELETE'
    });
}

export function getAllProduct(pageNo, pageSize, name) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/product/all?page="+pageNo+"&pageSize="+pageSize+"&name="+name,
        method: 'GET'
    });
}
export function getAllOrderItem() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/orderitem",
        method: 'GET'
    });
}

export function getCategoryById(id) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/category/"+id,
        method: 'GET'
    });
}

export function getProductById(id) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/product/"+id,
        method: 'GET'
    });
}

export function getSupplyById(id) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/supply/"+id,
        method: 'GET'
    });
}

export function getStoreById(id) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/store/"+id,
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


export function getAllAccountOfAdmin(pageNo, pageSize, name) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/auth/get-all-account?pageNo="+pageNo+"&pageSize="+pageSize+"&keyword="+name,
        method: 'GET'
    });
}


