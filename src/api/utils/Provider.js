import { apis, serverUrl } from '../Api'
import { handleError, handleResponse } from './response'

const BASE_URL = serverUrl

async function getAll(
    resource,
    params
) {
    let query = ''
    if (params && params.length > 0) {
        const parts = params.map((param) => {
            return `${encodeURIComponent(param.name)}=${encodeURIComponent(param.value)}`
        })
        query = parts.join('&')
    }
    const url = params ? `${BASE_URL}/${resource}?${query}` : `${BASE_URL}/${resource}`
    return await apis.get(url).then(handleResponse).catch(handleError)
}

async function getSingle(resource, id) {
    return await apis
        .get(`${BASE_URL}/${resource}/${id}`)
        .then(handleResponse)
        .catch(handleError)
}

async function post(resource, model) {
    return await apis
        .post(`${BASE_URL}/${resource}`, model)
        .then(handleResponse)
        .catch(handleError)
}

async function put(resource, model) {
    return await apis
        .put(`${BASE_URL}/${resource}`, model)
        .then(handleResponse)
        .catch(handleError)
}

async function patch(resource, model) {
    return await apis
        .patch(`${BASE_URL}/${resource}`, model)
        .then(handleResponse)
        .catch(handleError)
}

async function remove(resource, id) {
    return await apis
        .delete(`${BASE_URL}/${resource}/${id}`)
        .then(handleResponse)
        .catch(handleError)
}

export const apiProvider = {
    getAll,
    getSingle,
    post,
    put,
    patch,
    remove
}
