import { useEffect, useState } from "react"
import { Animated, View, StyleSheet, Dimensions } from "react-native"

const Spinner = () => {
    const [animation, setAnimation] = useState(new Animated.Value(0));

    useEffect(() => {

        const anim = Animated.timing(animation, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true
        });

        Animated.loop(anim, {
            iterations: -1
        }).start();
    }, [animation]);

    return(
        <Animated.View style={[style.classLoader, {
            transform: [{
                rotate: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["0deg", "360deg"]
                })
            }]
        }]}/>
    )
}

const style = StyleSheet.create({
    classLoader: {
        width: 50,
        height: 50,
        borderWidth: 5,
        padding: 5,
        borderColor: "#e6e488",
        borderTopColor: "orange",
        marginTop: 25,
        borderRadius: 100
    }
})

export default Spinner;