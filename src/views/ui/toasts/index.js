import { toast } from "react-toastify"

export const successToast = (message) => toast(message || "Success!", { type: "success" })
export const errorToast = (message) => toast(message || "Error!", { type: "error" })