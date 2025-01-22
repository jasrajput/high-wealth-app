import AsyncStorage from '@react-native-async-storage/async-storage';

export default class API {
    static baseUrl = "https://api.thecodecutter.com/api/";
    
    auth_token = "";


    static put(url, headers, body, resolve, reject) {
        fetch(`${this.baseUrl}${url}`, {
            headers: headers,
            method: "PUT",
            body: JSON.stringify(body)
        })
            .then(resp => {
                resolve(resp.json())
            })
            .catch(err => reject(err));
    }

    static post(url, headers, body, resolve, reject) {
        fetch(`${this.baseUrl}${url}`, {
            headers: headers,
            method: "POST",
            body: JSON.stringify(body)
        })
            .then(resp => {
                resolve(resp.json())
            })
            .catch(err => {
                reject(err)
            });
    }

    static get(url, headers, resolve, reject) {
        fetch(`${this.baseUrl}${url}`, {
            headers: headers
        })
            .then(resp => {
                resolve(resp.json());
            })
            .catch(err => reject(err));
    }

    static getToken() {
        return AsyncStorage.getItem("token");
    }

    static requestToBackend(endpoint, data, resolve, reject, token, method, requiresToken = true) {
        const headers = {
            "Content-Type": "application/json",
            'Accept': 'application/json',
        };


        if (requiresToken && token) {
            headers['Authorization'] = `Bearer ${token}`;
        }


        if (method === 'POST') {
            this.post(endpoint, headers, data, resolve, reject);
        } else if (method === 'PUT') {
            this.put(endpoint, headers, data, resolve, reject);
        } else {
            this.get(endpoint, headers, resolve, reject);
        }
    }

    static makeAPICall(endpoint, data, method, requiresToken = true) {
        return new Promise((resolve, reject) => {
            if (requiresToken) {
                this.getToken().then(token => {
                    if (token) {
                        this.requestToBackend(endpoint, data, resolve, reject, token, method, requiresToken);
                    }
                }).catch(error => {
                    console.error("Error getting token:", error);
                    reject("Error getting token");
                });
            } else {
                this.requestToBackend(endpoint, data, resolve, reject, null, method, requiresToken);
            }
        });
    }


    // static image_upload(data) {
    //     return new Promise((resolve, reject) => {
    //         AsyncStorage.getItem("token").then(token => {
    //             if (token) {
    //                 auth_token = token;
    //                 this.post(
    //                     "auth/driver-upload",
    //                     {
    //                         "Content-Type": "multipart/form-data",
    //                         "Accept": "application/json",
    //                         'Authorization': `Bearer ${auth_token}`,
    //                     },
    //                     data,
    //                     resolve,
    //                     reject
    //                 );
    //             } else {
    //             }
    //         });
    //     }
    // }

    // static getCategories() {
    //     return this.makeAPICall(`categories`, null, 'GET', false);
    // }

    // static getCarByCategory(id) {
    //     return this.makeAPICall(`cars/${id}`, null, 'GET', false);
    // }

    static userLogout() {
        return this.makeAPICall("auth/logout", null, 'POST', false);
    }

    static userLogin(data) {
        return this.makeAPICall("auth/login", data, 'POST', false);
    }

    static createOrder(data) {
        return this.makeAPICall('orders/create', data, 'POST', true)
    }

    static trade(data) {
        return this.makeAPICall('auth/trade', data, 'POST', true)
    }

    static subscribe(data) {
        return this.makeAPICall('subscription/subscribe', data, 'POST', true)
    }

    static claim(data) {
        return this.makeAPICall('auth/claim-credit', data, 'POST', true)
    }

    static withdraw(data) {
        return this.makeAPICall('auth/withdraw', data, 'POST', true)
    }

    // static sendOtp(data) {
    //     return this.makeAPICall("auth/sendOtp", data, 'POST', false);
    // }

    // static verifyOTP(data) {
    //     return this.makeAPICall("auth/verifyOtp", data, 'POST', false);
    // }

    static userRegister(data) {
        return this.makeAPICall("auth/register", data, 'POST', false);
    }

    static getUserDetails() {
        return this.makeAPICall("auth/me", null, 'GET', true);
    }

    static getTeamDetails() {
        return this.makeAPICall("auth/get-team", null, 'GET', true);
    }

    static getNotifications() {
        return this.makeAPICall("auth/notifications", null, 'GET', true);
    }

    static getNews() {
        return this.makeAPICall("auth/news", null, 'GET', true);
    }

    static getFundHistory() {
        return this.makeAPICall("orders/order-history", null, 'GET', true);
    }

    static getBonusHistory() {
        return this.makeAPICall("auth/bonus-history", null, 'GET', true);
    }
    // static getUserDetails() {
    //     return new Promise((resolve, reject) => {
    //         AsyncStorage.getItem("token").then(token => {
    //             if (token) {
    //                 auth_token = token;
    //                 this.get(
    //                     "user",
    //                     {
    //                         "Content-Type": "application/json",
    //                         'Accept': 'application/json',
    //                         'Authorization': `Bearer ${auth_token}`,
    //                     },
    //                     resolve,
    //                     reject
    //                 );
    //             } else {
    //             }
    //         });
    //     });
    // }

    static addBank(data) {
        return this.makeAPICall("auth/add-bank", data, 'PUT', true);
    }
    static markAllNotificationsAsRead(data) {
        return this.makeAPICall("auth/notifications/markAllAsRead", data, 'PUT', true);
    }

    static fetchBankDetails(data) {
        return this.makeAPICall("auth/bank-details", data, 'GET', true);
    }

    static transferAmount(data) {
        return this.makeAPICall('auth/transfer', data, 'POST', true)
    }

    static updatePersonalDetails(data) {
        return this.makeAPICall("auth/update-profile", data, 'POST');
    }

    static editDetails(data) {
        return this.makeAPICall("auth/update", data, 'PUT');
    }
}