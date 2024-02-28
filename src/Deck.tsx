import React, { Component } from "react";
import {PanResponder, View, Animated, Dimensions} from "react-native";

const SCREEN_WIDTH = Dimensions.get('window').width
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH
const SWIPE_OUT_DURATION = 250

class Deck extends Component {

    static defaultProps = {
        onSwipeRight: () => {},
        onSwipeLeft: () => {}
    }

    constructor(props: any) {
        // @ts-ignore
        super();

        const position = new Animated.ValueXY();

        const panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (event, gestureState) => {
                position.setValue({ x: gestureState.dx, y: gestureState.dy });
            },
            onPanResponderRelease: (event, gestureState) => {
                if (gestureState.dx > SWIPE_THRESHOLD) {
                    this.forceSwipe(1)
                } else if (gestureState.dx < -SWIPE_THRESHOLD) {
                    this.forceSwipe(0)
                } else {
                    this.resetPosition();
                }
            }

        })
        this.state = { panResponder, position, index: 0};
    }

    forceSwipe(direction: number) {
        const x = direction === 0 ? -SCREEN_WIDTH : SCREEN_WIDTH
        // @ts-ignore
        Animated.timing(this.state.position, {
            toValue: {x, y: 0},
            useNativeDriver: false,
            duration: SWIPE_OUT_DURATION
        }).start(() => this.onSwipeComplete(direction))
    }

    onSwipeComplete(direction: number) {
        // @ts-ignore
        const { onSwipeLeft, onSwipeRight, data } = this.props
        // @ts-ignore
        const item = data[this.state.index]
        direction === 0 ? onSwipeLeft(item) : onSwipeRight(item)
        // @ts-ignore
        this.state.position.setValue({ x: 0, y: 0 })
        // @ts-ignore
        this.setState({ index: this.state.index + 1 })
    }

    resetPosition() {
        // @ts-ignore
        Animated.spring(this.state.position, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false
        }).start();
    }

    getCardStyle() {
        // @ts-ignore
        const { position } = this.state;

        const rotate = position.x.interpolate({
            inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
            outputRange: ['-120deg', '0deg', '120deg']
        });

        return {
            // @ts-ignore
            ...this.state.position.getLayout(),
            transform: [{ rotate }]
        }
    }

    renderCards() {
        // @ts-ignore
        if (this.state.index >= this.props.data.length) {
            // @ts-ignore
            return this.props.renderNoMoreCards()
        }

        // @ts-ignore
        return this.props.data.map((item: any, i: number) => {
            // @ts-ignore
            if (i < this.state.index) { return null }

            // @ts-ignore
            if (i === this.state.index) {
                return (
                    // @ts-ignore
                    <Animated.View
                        key={item.id}
                        style={this.getCardStyle()}
                        {...this.state.panResponder.panHandlers}>
                        {this.props.renderCard(item)}
                    </Animated.View>
                )
            }


            // @ts-ignore
            return this.props.renderCard(item);
        });
    }

    render() {
        return (
            <View>
                {this.renderCards()}
            </View>
        )
    }
}

export default Deck;
