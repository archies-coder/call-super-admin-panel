import { apiProvider } from './utils/Provider.js'
export async function getPackages() {
    return await apiProvider.getAll('packages')
}