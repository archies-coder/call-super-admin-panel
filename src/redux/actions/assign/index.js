import { getAllData, getAllDataCategories, getAllGroups, getAllIndividuals } from "../../../api/assign.api"
import { errorToast } from "../../../views/ui/toasts"
import { HIDE_ADD_CALLING_AGENT_FORM, HIDE_UPDATE_DATA_FORM, setAddDataCategoryInput, SET_ADD_CALLING_AGENT_INPUT, SET_ADD_DATA_INPUT, SET_ASSIGN_DATA, SET_DATA_CATEGORIES, SET_GROUPS, SET_INDIVIDUALS, SET_SELECTED_CLIENT, SET_UPDATE_DATA_INPUT, showAddDataCategoryForm, SHOW_ADD_CALLING_AGENT_FORM, SHOW_ADD_DATA_FORM, SHOW_UPDATE_DATA_FORM } from "../../constants/assign"

export const setSelectedClient = (clientId) => async dispatch => {
    dispatch({ type: SET_SELECTED_CLIENT, client: clientId })
}

export const showAddDataForm = () => {
    return async dispatch => {
        dispatch({ type: SHOW_ADD_DATA_FORM })
    }
}
export const hideAddDataForm = () => {
    return async dispatch => {
        dispatch({ type: HIDE_ADD_CALLING_AGENT_FORM })
    }
}
export const showAddCallingAgentForm = () => {
    return async dispatch => {
        dispatch({ type: SHOW_ADD_CALLING_AGENT_FORM })
    }
}
export const hideAddCallingAgentForm = () => {
    return async dispatch => {
        dispatch({ type: HIDE_ADD_CALLING_AGENT_FORM })
    }
}

export const showUpdateDataForm = () => {
    return async dispatch => {
        dispatch({ type: SHOW_UPDATE_DATA_FORM })
    }
}
export const hideUpdateDataForm = () => {
    return async dispatch => {
        dispatch({ type: HIDE_UPDATE_DATA_FORM })
    }
}

export const setAddDataInput = (input) => async dispatch => {
    dispatch({ type: SET_ADD_DATA_INPUT, input })
}
export const setAddCallingAgentInput = (input) => async dispatch => {
    dispatch({ type: SET_ADD_CALLING_AGENT_INPUT, input })
}
export const setUpdateDataInput = (input) => async dispatch => {
    dispatch({ type: SET_UPDATE_DATA_INPUT, input })
}

export const fetchAllData = () => async dispatch => {
    try {
        const { data } = await getAllData()
        dispatch({ type: SET_ASSIGN_DATA, data })
    } catch (error) {
        console.log(error)
    }
}

export const fetchAllIndividuals = () => async dispatch => {
    try {
        const { data } = await getAllIndividuals()
        dispatch({ type: SET_INDIVIDUALS, data })
    } catch (error) {
        console.log(error)
    }
}
export const fetchAllGroups = () => async dispatch => {
    try {
        const { data } = await getAllGroups()
        dispatch({ type: SET_GROUPS, data })
    } catch (error) {
        console.log(error)
    }
}

export const fetchAllDataCategories = () => async dispatch => {
    try {
        const { data } = await getAllDataCategories()
        debugger
        dispatch({ type: SET_DATA_CATEGORIES, data })
    } catch (error) {
        errorToast(error.message || 'Something went wrong')
    }
}

export const openAddDataCategoryForm = () => async dispatch => {
    dispatch({ type: showAddDataCategoryForm })
}
export const closeAddDataCategoryForm = () => async dispatch => {
    dispatch({ type: hideAddDataCategoryForm })
}
export const handleAddDataCategoryChange = (data) => async dispatch => {
    dispatch({ type: setAddDataCategoryInput, data })
}