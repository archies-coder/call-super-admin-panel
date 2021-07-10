import { apiProvider } from './utils/Provider'

export async function createSubAdmin(input) {
    return await apiProvider.post('settings', input)
}
export async function createSecret(input) {
    return await apiProvider.post('settings', input)
}
export async function createCategory(input) {
    return await apiProvider.post('settings', input)
}