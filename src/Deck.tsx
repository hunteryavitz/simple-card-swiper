import React, { Component } from "react";
import {PanResponder, View, Animated} from "react-native";

class Deck extends Component {

    constructor(props: any) {
        // @ts-ignore
        super();

        const position = new Animated.ValueXY();

        const panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (event, gestureState) => {
                position.setValue({ x: gestureState.dx, y: gestureState.dy });
            },
            onPanResponderRelease: () => {}

        })
        this.state = { panResponder, position };
    }

    renderCards() {
        // @ts-ignore
        return this.props.data.map((item: any) => {
            // @ts-ignore
            return this.props.renderCard(item);
        });
    }

    render() {
        return (
            <Animated.View
                // @ts-ignore
                style={this.state.position.getLayout()}
                // @ts-ignore
                {...this.state.panResponder.panHandlers}>
                {this.renderCards()}
            </Animated.View>
        )
    }
}

export default Deck;
