import { apiProvider } from "./utils/Provider"


export async function registerSuperAdmin(data) {
    try {
        const resp = await apiProvider.post('superAdminRegister', data)
        console.log(resp)
        return resp
    } catch (error) {
        console.log(error)
    }
}
export async function loginSuperAdmin(data) {
    try {
        const resp = await apiProvider.post('superAdminLogIn', data)
        console.log(resp)
        return resp
    } catch (error) {
        console.log(error)
    }
}