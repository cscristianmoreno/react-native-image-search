import React, { useEffect } from "react";

import { Text, Pressable } from "react-native";

import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Search from "./src/Search/Search.js";

import { db } from "./db/db.js";

import Arrow from "./images/Arrow.js";
import { ScrollView } from "react-native-gesture-handler";
import Gallery from "./src/Gallery/Gallery.js";
import GlobalContext, { ContextProvider } from "./src/GlobalContext/GlobalContext.js";

import ImageModal from "./src/ImageModal/ImageModal.js";
import Header from "./src/Header/Header.js";
import Menu from "./src/Menu/Menu.js";
import Project from "./src/Project/Project.js";
  
const Stack = createNativeStackNavigator();

const App = () => {

  useEffect(() => {
    let query;
    
    
    // dropTable();
    createTable();
  }, []);
  
  return(
    <ContextProvider>
      
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerShown: false
        }}>
          <Stack.Screen
              name="Search"
              component={ScreenSearch}
              />
          <Stack.Screen
            name="Gallery"
            component={ScreenGallery}
          />
          <Stack.Screen
            name="Project"
            component={ScreenProject}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ContextProvider>
  )
}

const ScreenSearch = () => {
  return(
    <>
      <Header/>
      <Menu/>
      <ImageModal/>
      <Search/>
    </>
  )
}

const ScreenGallery = () => {
  return(
    <>
      <Header/>
      <ImageModal/>
      <Menu/>
      <Gallery/>
    </>
  )
}

const ScreenProject = () => {
  return(
    <>
      <Header/>
      <Menu/>
      <Project/>
    </>
  )
}

const dropTable = () => {
  const sql = "DROP TABLE images";

  db.executeSql(sql, [], () => {
    console.log("Tabla eliminada");
  })
}

const createTable = () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS images (
        id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        image_id INTEGER NOT NULL UNIQUE,
        image_name VARCHAR(32) NOT NULL DEFAULT '',
        image_name_url_tiny VARCHAR(128) NOT NULL DEFAULT '',
        image_name_url_large VARCHAR(128) NOT NULL DEFAULT '',
        image_author VARCHAR(32) NOT NULL DEFAULT '',
        image_author_url VARCHAR(128) NOT NULL DEFAULT '',
        image_category VARCHAR(128) NOT NULL DEFAULT '',
        date VARCHAR(32) NOT NULL DEFAULT '',
        unixtime INTEGER NOT NULL DEFAULT '0'
    )
  `;

  db.transaction((tx) => {

    // console.log(tx);

    tx.executeSql(sql, [], () => {
      console.log("Tabla creada!");
    }, (error) => {
      console.log(error.message);
    })
  })
}

export default App;