const initialState = {
    departments: [],
    dataByDepartments: {},
    selectedDepartment: 'IT'
}

const dataReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_DEPARTMENT_DATA':
            const obj = { [action.id]: action.data }
            console.log({ ...state.dataByDepartments, obj })
            return {
                ...state, dataByDepartments: { ...state.dataByDepartments, [action.id]: action.data }
            }
        case 'SET_SELECTED_DEPARTMENT':
            return { ...state, selectedDepartment: action.department }
        case 'SET_DEPARTMENTS':
            return { ...state, departments: action.data }

        default:
            return state
    }
}

export default dataReducer