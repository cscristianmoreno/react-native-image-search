
import { Image, Text, StyleSheet, View, Pressable, Dimensions, ScrollView, Alert } from "react-native"
import { useEffect, useRef, useState, useContext } from "react"

const elementWidth = Dimensions.get("window").width * 0.90;

import { db, prepareQuery } from "../../db/db.js";
import { ToastMessage } from "../ToastMessage/ToastMessage.js";
import GlobalContext from "../GlobalContext/GlobalContext.js";
import { styleComponentHeader, textDescriptionCapitalize } from "../Search/Search.js";
import { globalStyle, themeColorBackground, themeColorText } from "../Styles/Styles.js";

import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

const ImageContainer = ({props}) => {
    const { setShowImage } = useContext(GlobalContext);

    const [images, setImages] = useState([]);
    const [labels, setLabels] = useState([]);
 
    useEffect(() => {
        setImages(props);
        // console.log(props);

        images.forEach((str) => {
            // console.log(str);
        })

        const getLabels = async () => {
            const result = await prepareQuery("SELECT image_category FROM images GROUP BY image_category", []);
            setLabels(result.rows.raw());
        }
        
        getLabels();
    }, []);

    const handleDeleteImage = async (props) => {
        const result = await prepareQuery("DELETE FROM images WHERE image_id = ?", [props.image_id]);
        ToastMessage(`La imagen ${props.image_name} (ID: ${props.image_id}) se eliminó con éxito`);
    }

    const handleShowImage = (image, name) => {
        const imageStat = {
            "name": name,
            "url": image
        }
        
        setShowImage(imageStat);
    } 

    return(
        <>
            <View style={style.classHeaderContainer}>

                <Text style={style.classImageContainerTitle}>{props.length} imágen{(props.length === 1) ? "" : "es"} guardada{(props.length === 1) ? "" : "s"}</Text>

                <View style={style.classLabelsContainer}>
                    <ScrollView contentContainerStyle={style.classLabelsScrollView}>
                    {
                        labels.map((str, num) => {
                            return <Text key={num} style={style.classLabels}>#{str.image_category}</Text>
                        })
                    }
                    </ScrollView>
                </View> 
            </View>
            
            
            <View style={style.classScrollViewContainer}>
                <ScrollView contentContainerStyle={style.classImageContainer}>
                {
                    props.map((str, num) => {
                        return (
                            <Pressable key={num}>

                                <View style={style.classResultImageContainer} key={num}>
                                    <View style={style.classImage}>
                                        <Pressable onPress={() => handleShowImage(str.image_name_url_large, str.image_name)}>
                                        
                                        <Image style={style.classImageComponent} source={{
                                            uri: `${str.image_name_url_tiny}`
                                        }}
                                        />
                                        </Pressable>
                                    </View>

                                    

                                    <View style={style.classResultImageDescriptionContainer}>
                                        <Text style={globalStyle.classResultImageDescriptionTitle} numberOfLines={1} ellipsizeMode="tail">{textDescriptionCapitalize(str.image_name)}</Text>
                                        <Pressable>
                                            <Text style={globalStyle.classResultImageDescriptionSubtitle}>{str.image_author}</Text>
                                        </Pressable>

                                        {/* <Text style={globalStyle.classResultImageDescriptionSubtitle}>{str.date}</Text>
                                        <Text style={[globalStyle.classResultImageDescriptionSubtitle, style.classCategory]}>#{str.image_category}</Text> */}

                                        <Pressable onPress={() => handleDeleteImage(str)} style={[globalStyle.classButton, { marginTop: 30}]}>
                                            <Text style={globalStyle.classButton.title}>Eliminar</Text>
                                        </Pressable>
                                    </View>
                                </View>
                                        
                            </Pressable>
                            // <Text>asd</Text>
                        )
                    })
                }
                </ScrollView>
            </View>
        </>
    )
}

const style = StyleSheet.create({
    classHeaderContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // backgroundColor: "gray",
    },
    classImageContainer: {
        display: "flex",
        width: elementWidth,
    },
    classResultImageContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginTop: 15,
    },
    classResultImageDescriptionContainer: {
        height: "80%",
        marginLeft: 25
    },
    classScrollViewContainer: {
        display: "flex",
        alignItems: "center",
        width: "100%",
        height: "70%",
        marginTop: 10
    },
    classImage: {
        width: 150,
        height: 150,
        // shadowColor: "blue",
        elevation: 5,
        shadowOpacity: 1,
        shadowRadius: 6.27,
        shadowOffset: {
            width: 0,
            height: 12
        },
        padding: 3,
        borderRadius: 10
    },
    classImageComponent: {
        width: "100%", 
        height: "100%", 
        borderRadius: 10
    },
    classImageContainerTitle: {
        color: themeColorText,
        fontWeight: "800",
        fontSize: 30
    },
    classCategory: {
        fontWeight: "900",
        fontStyle: "italic"
    },
    classLabelsContainer: {
        // flex: 1,
        width: "75%",
        marginTop: 5,
        marginBottomm: 5,
        maxHeight: 50
    },
    classLabelsScrollView: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap",
    }, 
    classLabels: {
        backgroundColor: "#e6e6e6",
        padding: 5,
        borderRadius: 10,
        color: "black",
        fontWeight: "500",
        marginTop: 7,
        marginBottom: 5,
        marginLeft: 20
    }
})

export default ImageContainer;