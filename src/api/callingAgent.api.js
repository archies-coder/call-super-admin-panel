import { apiProvider } from "./utils/Provider"

export async function createCallingAgent(mobileNo, status) {
    return await apiProvider.post('createCallingAgentNo', { mobileNo, status })
}

export async function getCallingAgents() {
    return await apiProvider.getAll('getAllCallingAgents')
}