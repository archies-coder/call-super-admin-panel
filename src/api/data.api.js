import { apiProvider } from "./utils/Provider"

export const getDataByDepartment = async (deptId) => {
    return await apiProvider.getAll('dataCategory', [{ name: 'dataCategory', value: deptId }])
}

export const getAllDepartments = async () => {
    return await apiProvider.getAll('getDepartment')
}

export const addNewData = async (data) => {
    return await apiProvider.post('addData', data)
}
export const updateNewData = async (data) => {
    return await apiProvider.post('updateData', data)
}