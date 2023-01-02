import { ToastAndroid } from "react-native"

export const ToastMessage = (message) => {
    return ToastAndroid.show(
        message,
        ToastAndroid.LONG
    )
}