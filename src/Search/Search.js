import { useState, useEffect, useRef, useContext } from "react";

import { PermissionsAndroid, View, Text, Pressable, StyleSheet, Dimensions, TextInput, ScrollView, Image, Linking, Alert, Keyboard } from "react-native";

import axios from "axios";

const elementWidth = Dimensions.get("window").width * 0.90;
const elementHeight = Dimensions.get("window").height;

import { usePagination, DOTS, Pagination } from "../Pagination/Pagination.js";

import { ToastMessage } from "../ToastMessage/ToastMessage.js";

import { ImageExists, db, prepareQuery } from "../../db/db.js";

import GlobalContext from "../GlobalContext/GlobalContext.js";

import RNFS from "react-native-fs";
import Spinner from "../Spinner/Spinner.js";
import { globalStyle, themeColorBackground, themeColorText } from "../Styles/Styles.js";

// const URL = 
const API_KEY = "563492ad6f91700001000001978db621f0d74001ac85226d1c682049";
const URL_IMAGE_SEARCH = "https://api.pexels.com/v1/search";
const URL_IMAGE_RANDOM = "https://api.pexels.com/v1/curated";

const Search = () => {
    const { showImage, setShowImage } = useContext(GlobalContext);

    const [arrayImage, setArrayImage] = useState([]);
    const [search, setSearch] = useState("");
    const [searchAux, setSearchAux] = useState("");
    const [searchMaxResults, setSearchMaxResults] = useState(0);
    const [page, setPage] = useState(1);
    const [load, setLoad] = useState(0);

    const imageRef = useRef([]);

    useEffect(() => {
        const getImages = async () => {
            try {
                setLoad(1);
                const response = await axios({
                    method: "GET",
                    url: (search.length) ? URL_IMAGE_SEARCH : URL_IMAGE_RANDOM,
                    headers: {
                        "Authorization": API_KEY
                    },
                    params: {
                        "per_page": 20,
                        "page": page,
                        "locale": "es-ES",
                        "query": search
                    }
                })

                
                setArrayImage(response.data.photos);
                setLoad(0);
                setSearchMaxResults(response.data.total_results);
                
                // const array = response.data.photos;

                // array.forEach((str) => {
                //     const replace = str.src.tiny.split("crop").pop().replace("&h=200&w=280", "&h=50&w=50");

                //     const url = str.src.tiny.split("crop").shift() + "crop" + replace;
                //     const url_original = str.src.tiny;
                //     str.src.tiny = url;
                // })

                // setArrayImage(array);
            }
            catch(error) {
                console.log(error);
            }
        }

        console.log(RNFS.CachesDirectoryPath);
        getImages();
        imageRef.current = [];
        setArrayImage([]);
    }, [search, page]);

    useEffect(() => {
        setPage(1);
    }, [search]);

    const handleOpenLink = async (url) => {
        const supportLink = await Linking.canOpenURL(url);

        if (!supportLink) {
            Alert.alert("No se puede abrir esta URL");
            return;
        }

        await Linking.openURL(url);
    }

    const handleSearch = () => {
        // if (searchAux.length === 0) {
        //     return;
        // }

        Keyboard.dismiss();

        if (searchAux.length) {
            ToastMessage("Buscando imágenes de " + searchAux + "...");
        }

        setSearch(searchAux);
    }

    const addImageRef = (ev) => {
        // console.log(ev.target);
        if (ev && !imageRef.current.includes(ev)) {
            imageRef.current.push(ev);
        }
    }

    const handleSaveImage = async (str) => {
        const request = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES, {
                title: "Permiso de almacenamiento de imágenes",
                message: "Esta app quiere almacenar imágenes en tu galería",
                buttonPositive: "Aceptar",
                buttonNegative: "Rechazar"
            }
        )

        // if (ImageExists(str.id) === 1) {
        //     console.log(ImageExists(str.id));
        //     return; 
        // }

        const image = await ImageExists(str.id);

        if (image) {
            ToastMessage("Esta imagen ya está guardada.");
            return;
        }
        

        const sql = `
            INSERT INTO images 
                (image_id, image_name, image_name_url_tiny, image_name_url_large, image_author, image_author_url, image_category, date, unixtime) 
            VALUES 
                (?, ?, ?, ?, ?, ?, ?, DATETIME(), ?)
        `

        const image_name = (str.alt.length) ? str.alt : "Sin descripción";

        const result = await prepareQuery(sql, [
            str.id,
            image_name, 
            str.src.tiny, 
            str.src.large, 
            str.photographer,
            str.photographer_url,
            (search.length) ? search.toLocaleLowerCase() : "general",
            Date.now()]
        )

        if (typeof result !== "undefined") {
            ToastMessage("La imagen fue almacenada con éxito.");
        }
        else {
            ToastMessage("Ocurrió un error al guardar la imagen.");
        }
    }

    const handleShowImage = (image, name) => {
        // console.log(name);
        const imageStat = {
            "name": (name.length) ? name : "Sin descripción",
            "url": image
        }
        
        setShowImage(imageStat);
    } 

    return(
        <View style={style.container}>
            <View style={styleComponentHeader.classHeaderContainer}>
                <Text style={style.mainTitle}>Busca <Text style={style.titleHeader}>imágenes</Text> & <Text style={style.titleHeader}>videos</Text></Text>

                <View style={style.classInputContainer}>
                    <TextInput onChangeText={(text) => setSearchAux(text)}
                        style={style.input}
                        placeholder="Busca tus fotos y videos."
                    />

                    <Pressable onPress={() => handleSearch()} style={[globalStyle.classButton, style.classButtonAbsolute]}>
                        <Text style={globalStyle.classButton.title}>Buscar</Text>
                    </Pressable>
                </View>
            </View>

            {  
                (arrayImage.length) ? 
                    <ScrollView style={style.classScrollViewContainer}>
                        {
                            (search) ?
                                <Text style={style.classImageContainerTitle}>{searchMaxResults} resultados</Text>
                            :
                                null
                        }

                            <View style={style.classImageContainer}>
                            {     
                                arrayImage.map((str, num) => {
                                    return (
                                        <Pressable key={num} ref={addImageRef}>

                                            <View style={style.classResultImageContainer} key={num}>
                                                <View style={style.classImage}>

                                                <Pressable onPress={() => handleShowImage(str.src.large, str.alt)}>
                                                    <Image  style={style.classImageComponent} source={{
                                                        uri: `${str.src.tiny}`
                                                    }}
                                                    />
                                                </Pressable>
                                                </View>

                                                

                                                <View style={style.classResultImageDescriptionContainer}>
                                                    <Text style={globalStyle.classResultImageDescriptionTitle} numberOfLines={1} ellipsizeMode="tail">{(str.alt.length) ? textDescriptionCapitalize(str.alt) : "Sin descripción"}</Text>
                                                    <Pressable onPress={() => handleOpenLink(str.photographer_url)}>
                                                        <Text style={globalStyle.classResultImageDescriptionSubtitle}>{str.photographer}</Text>
                                                    </Pressable>

                                                    <Pressable onPress={() => handleSaveImage(str)} style={[globalStyle.classButton, { marginTop: 30}]}>
                                                        <Text style={globalStyle.classButton.title}>Guardar</Text>
                                                    </Pressable>
                                                </View>
                                            </View>
                                                    
                                        </Pressable>
                                    )
                                })
                            }
                        </View>
                    </ScrollView>
                :
                    
                    (load) ?
                        <View style={style.classLoaderContainer}>
                            <Text style={style.classLoaderText}>Las imágenes están cargando...</Text>
                            <Spinner/>
                        </View> 
                    :
                        <View style={style.classLoaderContainer}>
                            <Text style={style.classLoaderText}>No se encontraron imágenes...</Text>
                            <Spinner/>
                        </View> 
            }

            <Pagination
                currentPage={page}
                totalCount={(searchMaxResults > 20) ? searchMaxResults : 20}
                pageSize={20}
                onPageChange={(page) => setPage(page)}
            />
        </View>
    )
}

export const textDescriptionCapitalize = (str) => {
    const text = str.split(", ").pop();
    return text.charAt(0).toUpperCase() + text.slice(1);
}

export const styleComponentHeader = StyleSheet.create({
    classHeaderContainer: {
        backgroundColor: themeColorBackground,
        width: "100%",
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
    },
})

const style = StyleSheet.create({
    container: {
        display: "flex",
        alignItems: "center",
        width: Dimensions.get("window").width,
        backgroundColor: themeColorBackground,
    },
    mainTitle: {
        color: "white",
        fontWeight: "800",
        marginTop: 25,
        marginTop: 25,
        fontSize: 30,
        marginLeft: 25,
        maxWidth: 250
    },
    classInputContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: Dimensions.get("window").width,
        height: 100,
    },
    input: {
        borderWidth: 3,
        borderColor: "white",
        backgroundColor: "white",
        padding: 10,
        width: "90%",
        borderRadius: 20,
    },
    classImageContainer: {
        display: "flex",
        width: elementWidth,
    },
    classResultImageContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        height: 150,
        marginTop: 15,
    },
    classResultImageDescriptionContainer: {
        height: "80%",
        marginLeft: 25
    },
    classScrollViewContainer: {
        maxHeight: elementHeight * 0.47,
        marginTop: 25
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
    classButtonAbsolute: {
        position: "absolute",
        right: 0,
    },
    classImageContainerTitle: {
        color: "white",
        fontWeight: "800",
        fontSize: 30
    },
    classPageContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: Dimensions.get("window").width * 0.95,
        height: 50,
        marginTop: 20
    },
    classPage: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 43,
        height: 40,
        color: "white",
        // backgroundColor: "white",
    },
    classPageText: {
        color: "black"
    },
    classPageSelected: {
        // backgroundColor: "orange",
        borderRadius: 100
    },
    classPageTextSelected: {
        color: "white"
    },
    classButtonContainer: {
        display: "flex",
        flexDirection: "row",
        marginTop: 30
    },
    classButtonSave: {
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        padding: 5,
        width: 75
    },
    classButtonViewColor: {
        backgroundColor: "#d34242"
    },
    classButtonSaveColor: {
        backgroundColor: "#5050e9"
    },
    classLoaderContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: Dimensions.get("window").height * 0.51
    },
    titleHeader: {
        color: themeColorText
    },
    classLoaderText: {
        color: "white",
        fontSize: 16,
        fontWeight: "700"
    }
})


export default Search;