import { apiProvider } from './utils/Provider'

export async function getAllReports(mobile) {
    return await apiProvider.getAll('getReport', [{ name: 'mobileNo', value: mobile || 8333022040 }])
}