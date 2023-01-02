import { useContext } from "react"
import { View, StyleSheet, Text, Dimensions, Pressable } from "react-native"

import IconMenu from "../../images/IconMenu.js"

import GlobalContext from "../GlobalContext/GlobalContext.js"

const Header = () => {
    const { openMenu, setOpenMenu } = useContext(GlobalContext);

    return(
        <View style={style.classHeadercontainer}>
            <Text style={style.classHeaderTitle}>Image Search</Text>

            <Pressable onPress={() => setOpenMenu(!(openMenu))} style={style.classIconContainer}>
                <IconMenu/>
            </Pressable>
        </View>
    )
}

const style = StyleSheet.create({
    classHeadercontainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        width: Dimensions.get("window").width,
        height: 75,
        backgroundColor: "black"
    },
    classIconContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 35, 
        height: 35,
        padding: 7,
        marginRight: 10,
        borderRadius: 100,
        backgroundColor: "white"
    },
    classHeaderTitle: {
        fontWeight: "900",
        marginLeft: 20,
        color: "white",
        fontSize: 20
    }
})

export default Header;