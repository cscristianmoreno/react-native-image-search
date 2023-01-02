import { StyleSheet, Dimensions } from "react-native";

export const globalStyle = StyleSheet.create({
    classButton: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 30,
        backgroundColor: "#e7e57c",
        padding: 10,
        // height: 40,
        width: 100,
        textAlign: "center",
        textAlignVertical: "center",
        borderRadius: 25,

        title: {
            color: "#202020",
            fontWeight: "700",
            // fontSize: 16
        }
    },
    classResultImageDescriptionTitle: {
        color: "white",
        fontWeight: "900",
        fontSize: 20,
        maxWidth: 215
    },
    classResultImageDescriptionSubtitle: {
        color: "orange",
        fontWeight: "bolder",
        marginTop: 10
        // textDecorationLine: "underline"
    },
    classTitle: {
        color: "white",
        fontWeight: "bolder",
        fontSize: 30
    }
})

export const themeColorBackground = "#222121";
export const themeColorText = "#e6e488"; 