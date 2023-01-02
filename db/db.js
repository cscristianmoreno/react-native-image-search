import { openDatabase } from "react-native-sqlite-storage";
import { ToastMessage } from "../src/ToastMessage/ToastMessage";

export const db = openDatabase({
    name: "db_images.db",
    location: "default"
})

export const ImageExists = async (id) => {
    let items = await new Promise((resolve, reject) => {

        const query = "SELECT * FROM images WHERE image_id = ?";
        
        db.transaction((tx) => {
            tx.executeSql(query, [id], (tx, result) => {
                resolve(result.rows.length);
            }, (error) => {
                ToastMessage("Ocurrió un error");
                resolve(0);
            })
        })
    })

    return items;
}

export const prepareQuery = async (query, params) => {
    const info = await new Promise((resolve, reject) => {

        db.transaction((tx) => {
            tx.executeSql(query, params, (tx, result) => {
                resolve(result);
            }, (error) => {
                reject(undefined);
            })
        })
    })

    return info;
}