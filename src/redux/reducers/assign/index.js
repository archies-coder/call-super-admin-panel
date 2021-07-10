import { hideAddDataCategoryForm, HIDE_ADD_CALLING_AGENT_FORM, HIDE_ADD_DATA_FORM, HIDE_UPDATE_DATA_FORM, setAddDataCategoryInput, SET_ADD_CALLING_AGENT_INPUT, SET_ADD_DATA_INPUT, SET_ASSIGN_DATA, SET_DATA_CATEGORIES, SET_GROUPS, SET_INDIVIDUALS, SET_SELECTED_CLIENT, SET_UPDATE_DATA_INPUT, showAddDataCategoryForm, SHOW_ADD_CALLING_AGENT_FORM, SHOW_ADD_DATA_FORM, SHOW_UPDATE_DATA_FORM } from "../../constants/assign"

export const defaultAddInput = {
    name: '',
    email: '',
    mobile: '',
    stream: '',
    company: '',
    location: '',
    assignTo: ''
}
export const defaultUpdateInput = {
    name: '',
    email: '',
    mobile: '',
    stream: '',
    company: '',
    location: '',
    assignTo: ''
}

const initialState = {
    addDataFormVisible: false,
    addCallingAgentFormVisible: false,
    addDataCategoryFormVisible: false,
    updateDataFormVisible: false,
    updateDataInput: defaultUpdateInput,
    data: [],
    individuals: [],
    groups: [],
    selectedClient: '',
    dataCategories: [],
    addDataInput: defaultAddInput,
    addCallingAgentInput: {
        mobile: '',
        otp: ''
    },
    addDataCategoryInput: {
        dataCategory: ''
    }
}

const assignReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_ADD_DATA_FORM:
            return { ...state, addDataFormVisible: true }
        case HIDE_ADD_DATA_FORM:
            return { ...state, addDataFormVisible: false }
        case SHOW_ADD_CALLING_AGENT_FORM:
            return { ...state, addCallingAgentFormVisible: true }
        case HIDE_ADD_CALLING_AGENT_FORM:
            return { ...state, addCallingAgentFormVisible: false }
        case SHOW_UPDATE_DATA_FORM:
            return { ...state, updateDataFormVisible: true }
        case HIDE_UPDATE_DATA_FORM:
            return { ...state, updateDataFormVisible: false }
        case SET_ADD_DATA_INPUT:
            return { ...state, addDataInput: action.input }
        case SET_ADD_CALLING_AGENT_INPUT:
            return { ...state, addCallingAgentInput: action.input }
        case SET_UPDATE_DATA_INPUT:
            return { ...state, updateDataInput: action.input }
        case SET_ASSIGN_DATA:
            return { ...state, data: action.data }
        case SET_INDIVIDUALS:
            return { ...state, individuals: action.data }
        case SET_GROUPS:
            return { ...state, groups: action.data }
        case SET_SELECTED_CLIENT:
            return { ...state, selectedClient: action.client }
        case SET_DATA_CATEGORIES:
            return { ...state, dataCategories: action.data }
        case showAddDataCategoryForm:
            return { ...state, addDataCategoryFormVisible: true }
        case hideAddDataCategoryForm:
            return { ...state, addDataCategoryFormVisible: false }
        case setAddDataCategoryInput:
            return { ...state, addDataCategoryInput: action.data }
        default:
            return state
    }
}

export default assignReducer