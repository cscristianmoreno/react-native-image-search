import { View, Text, StyleSheet, Dimensions, Animated, Pressable } from "react-native";
import { useContext, useEffect, useState } from "react";
import GlobalContext from "../GlobalContext/GlobalContext.js";

import { useNavigation, useRoute } from "@react-navigation/native";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import { faSearch, faImages, faBriefcase } from "@fortawesome/free-solid-svg-icons";

import IconGlass from "../../images/IconGlass.js";
import IconGallery from "../../images/IconGallery.js";
import IconProject from "../../images/IconProject.js";
import IconLogo from "../../images/IconLogo.js";
import { themeColorBackground, themeColorText } from "../Styles/Styles.js";

const MENU_ITEMS = [
    { title: "Buscar", icon: faSearch, path: "Search" },
    { title: "Galería", icon: faImages, path: "Gallery" },
    { title: "Proyecto", icon: faBriefcase, path: "Project" },
]

const Menu = () => {
    const { openMenu, setOpenMenu } = useContext(GlobalContext);

    const [animation, setAnimation] = useState(new Animated.Value(0))

    const navigation = useNavigation();
    const router = useRoute();

    useEffect(() => {
        Animated.timing(animation, {
            toValue: (openMenu) ? 0 : -200,
            duration: 500,
            useNativeDriver: "true"
        }).start()

        // const router = useRoute();

        console.log(router.name);
    }, [openMenu]);

    const handleNavigation = (str) => {
        setOpenMenu(0);
        navigation.navigate(str);
    }

    return(
        <Animated.View style={[
            style.classMenuContainer,
            {
                transform: [{
                    translateX: animation
                }]
            }
        ]}>
            <View style={style.classMenuContainer}>
                <View style={style.classIconLogoContainer}>
                    <View style={style.classIconLogo}>
                        <IconLogo/>
                    </View>
                    
                    <Text style={style.classMenuTitle}>Image Search</Text>
                </View>
                {
                    MENU_ITEMS.map((str, num) => {
                        return (
                            <Pressable key={num} onPress={() => handleNavigation(str.path)} style={style.classMenuItemContainer}>
                                <FontAwesomeIcon style={[style.classMenuIcon, (router.name === str.path) ? style.classMenuItemPath : null]} size={20} icon={str.icon}/>
                                <Text style={[style.classMenuItem, (router.name === str.path) ? style.classMenuItemPath : null]}>{str.title}</Text>
                            </Pressable>
                        )
                    })
                }
            </View>
        </Animated.View>
    )
}

const style = StyleSheet.create({
    classMenuContainer: {
        display: "flex",
        alignItems: "center",
        position: "absolute",
        width: 200,
        zIndex: 999,
        backgroundColor: themeColorBackground,
        height: Dimensions.get("window").height,
        elevation: 10,
        shadowColor: "black",
        shadowOpacity: 1,
        shadowRadius: 10,
    },
    classMenuItemContainer: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        padding: 15,
        borderColor: "gray"
    },
    classMenuIcon: {
        color: "white",
    },
    classMenuItem: {
        color: "white",
        fontWeight: "700",
        marginLeft: "7%"
    },
    classMenuItemPath: {
        fontWeight: "900",
        color: themeColorText
    },
    classIconLogoContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 30,
        height: 30,
        width: "100%",
        height: 75,
        borderColor: "gray",
    },
    classIconLogo: {
        width: 30, 
        height: 30
    },
    classMenuTitle: {
        color: "white",
        fontSize: 16,
        fontWeight: "700"
    }
})

export default Menu;