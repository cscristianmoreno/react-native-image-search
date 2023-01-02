import { useEffect, useState } from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native"

import { db, prepareQuery } from "../../db/db.js"

import ImageContainer from "../ImageContainer/ImageContainer.js";
import Spinner from "../Spinner/Spinner.js";
import { globalStyle, themeColorBackground } from "../Styles/Styles.js";

const Gallery = () => {
    const [gallery, setGallery] = useState([]);
    const [load, setLoad] = useState(0);

    useEffect(() => {
        const getGallery = async () => {
            setLoad(1);
            const result = await prepareQuery("SELECT * FROM images ORDER BY unixtime DESC", []);

            if (typeof result !== "undefined") {
                console.log(result.rows.raw());
                setGallery(result.rows.raw());
            }

            setLoad(0);
        }

        getGallery();
    }, []);

    useEffect(() => {
        if (gallery.length === 0) {
            return;
        }

        // console.log(gallery);
    }, [gallery]);  

    if (load) {
        return (
            <View style={style.classGalleryContainer}>
                <Text style={style.classGalleryTitle}>Tu galería está cargando...</Text>
                <Spinner/>
            </View>
        )
    }

    if (gallery.length === 0) {
        return (
            <View style={style.classGalleryContainer}>
                <Text style={style.classGalleryTitle}>Aún no hay imágenes almacenadas...</Text>
            </View>
        )
    }

    return (
        <View style={style.classGalleryContainer}>
            <ImageContainer props={gallery}/>
        </View>
    )
}

const style = StyleSheet.create({
    classLoaderContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: Dimensions.get("window").width
    },
    classTextLoader: {
        fontSize: 20,
        color: "black"
    },
    classGalleryContainer: {
        display: "flex",
        alignItems: "center",
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
        backgroundColor: themeColorBackground
    },
    classGalleryTitle: {
        fontWeight: "700",
        color: "white", 
        fontSize: 20,
        marginTop: 25
    }
})

export default Gallery;