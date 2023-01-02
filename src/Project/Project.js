import { View, Text, StyleSheet, Dimensions, Linking, Pressable } from "react-native";

import IconJavascript from "../../images/IconJavascript.js";
import IconReact from "../../images/IconReact.js";
import IconSqlite from "../../images/IconSqlite.js";
import { themeColorBackground, themeColorText } from "../Styles/Styles.js";

const Project = () => {
    return(
        <View style={style.classProjectContainer}>
            <Text style={style.classProjectTitle}>Acerca del proyecto</Text>

            <Text style={style.classProjectDescription}>Este proyecto utiliza la API REST brindada por <Text style={style.classProjectAPI}>Pexels</Text> para obtener sus imágenes / videos.</Text>
            
            <Text style={style.classProjectDescription}>El proyecto está desarrollado con la finalidad de adquirir conocimientos en cuanto a las tecnologías respecta.</Text>

            <Text style={style.classProjectTitle}>Tecnologías utilizadas</Text>

            <View style={style.classIconContainer}>
                <View style={style.classIconView}>
                    <View style={style.classIcon}>
                        <IconReact/>
                    </View>

                    <Text style={style.classIconText}>React Native</Text>
                </View>

                <View style={style.classIconView}>
                    <View style={style.classIcon}>
                        <IconJavascript/>
                    </View>

                    <Text style={style.classIconText}>JavaScript</Text>
                </View>

                <View style={style.classIconView}>
                    <View style={style.classIcon}>
                        <IconSqlite/>
                    </View>

                    <Text style={style.classIconText}>SQLite</Text>
                </View>
            </View>

            <Text style={style.classDeveloper}>Desarrollado por Cristian Moreno</Text>
        </View>
    )
}

const style = StyleSheet.create({
    classProjectContainer: {
        display: "flex",
        alignItems: "center",
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
        backgroundColor: themeColorBackground
    },
    classProjectTitle: {
        fontSize: 20,
        color: themeColorText,
        fontWeight: "700",
        marginTop: 25
    },
    classProjectDescription: {
        width: Dimensions.get("window").width * 0.80,
        marginTop: 25,
        fontSize: 16,
        color: "white"
    },
    classProjectAPI: {
        color: themeColorText,
        fontWeight: "700"
    },
    classIconContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 25,
        width: Dimensions.get("window").width * 0.80,
    },
    classIconView: {
        display: "flex",
        alignItems: "center"
    },
    classIcon: {
        width: 50,
        height: 50
    },
    classIconText: {
        color: "white",
        fontWeight: "bolder",
        marginTop: 5
        // width: 100
    },
    classDeveloper: {
        color: "#566dd3",
        marginTop: 25
    }
})

export default Project;