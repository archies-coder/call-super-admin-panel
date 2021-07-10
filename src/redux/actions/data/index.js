import { getAllDepartments, getDataByDepartment } from "../../../api/data.api"
import { errorToast } from "../../../views/ui/toasts"
import { startSpinner, stopSpinner } from './../spinner'

export const getDepartmentData = (deptId) => async dispatch => {
    try {
        const { data } = await getDataByDepartment(deptId)
        if (data) {
            dispatch({ type: 'SET_DEPARTMENT_DATA', id: deptId, data })
        }
    } catch (error) {
        console.log(error)
    }
}

export const getDepartments = () => async dispatch => {
    try {
        dispatch(startSpinner())
        const { data } = await getAllDepartments()
        if (data) {
            dispatch(stopSpinner())
            dispatch({ type: 'SET_DEPARTMENTS', data })
        }
    } catch (error) {
        dispatch(stopSpinner())
        errorToast(error)
    }
}

export const setSelectedDepartment = (dep) => async dispatch => {
    dispatch({ type: 'SET_SELECTED_DEPARTMENT', department: dep })
}
