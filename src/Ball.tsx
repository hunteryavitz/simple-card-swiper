import React, { Component } from "react";
import { View, StyleSheet, Animated } from "react-native";

class Ball extends Component {

    // UNSAFE_componentWillMount() {
    //     // @ts-ignore
    //     this.position = new Animated.ValueXY(0, 0);
    //     // @ts-ignore
    //     Animated.spring(this.position, {
    //         useNativeDriver: false,
    //         toValue: { x: 320, y: 720 }
    //     }).start();
    // }

    constructor(props: any) {
        super(props);
        // @ts-ignore
        this.position = new Animated.ValueXY(0, 0);
        // @ts-ignore
        Animated.spring(this.position, {
            useNativeDriver: false,
            toValue: { x: 320, y: 720 }
        }).start();
    }

    render() {
        return (
            <Animated.View
                // @ts-ignore
                style={this.position.getLayout()}>
                <View style={styles.ball} />
            </Animated.View>
        )
    }
}

const styles = StyleSheet.create({
    ball: {
        width: 60,
        height: 60,
        borderRadius: 30,
        borderWidth: 30,
        borderColor: "black",
    },
});

export default Ball;
