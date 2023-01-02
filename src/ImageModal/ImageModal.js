import { Image, StyleSheet, Dimensions, View, Pressable, Text } from "react-native"

import { useContext, useRef, useEffect } from "react"

import GlobalContext from "../GlobalContext/GlobalContext.js";

import { textDescriptionCapitalize } from "../Search/Search.js";

const ImageModal = () => {
    const { showImage, setShowImage } = useContext(GlobalContext);
    
    const modalRef = useRef();

    

    useEffect(() => {
        modalRef.current.setNativeProps({
            display: (Object.keys(showImage).length) ? "flex" : "none"
        })

        // console.log("");
    }, [showImage]);

    return(
        <View ref={modalRef} style={style.classModalImageContainer}>
            <View style={style.classModalImage}>
                <Pressable onPress={() => setShowImage({})} style={style.classButtonExitContainer}>
                    <Text style={style.classButtonExit}>&times;</Text>
                </Pressable>
                
                <Image style={style.classImage} source={{
                    uri: (Object.keys(showImage).length) ? showImage.url : null
                }}
                />


                <View style={style.classTextDescriptionContainer}>
                    <Text style={style.classTextDescription}>{showImage.name}</Text>
                </View>
            </View>
       </View>
    )
}

const style = StyleSheet.create({
    classModalImageContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        zIndex: 100,
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
        backgroundColor: "#000000bf"
    },
    classModalImage: {
        width: Dimensions.get("window").width * 0.95,
        height: Dimensions.get("window").height * 0.90,
        borderRadius: 10
    },
    classImage: {
        width: "100%",
        height: "100%", 
        borderRadius: 10
    },
    classButtonExitContainer: {
        marginLeft: "95%",
        position: "absolute",
        top: -40,
    },
    classButtonExit: {
        color: "white",
        fontWeight: "900",
        fontSize: 30
    },
    classTextDescriptionContainer: {
        display: "flex",
        justifyContent: "center",
        position: "absolute",
        bottom: 0,
        width: "100%",
        height: "20%",
        backgroundColor: "#000000bf"
    },
    classTextDescription: {
        color: "white",
        textAlign: "center",
        fontWeight: "900"
    }
})

export default ImageModal;