import React, { Component } from 'react'
import {
    PanResponder,
    View,
    Animated,
    Dimensions,
    LayoutAnimation,
    UIManager
} from 'react-native'

const SCREEN_WIDTH = Dimensions.get('window').width
const SCREEN_HEIGHT = Dimensions.get('window').height
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH
const SWIPE_OUT_DURATION = 250

class Deck extends Component {

    // TODO: Add logic for liking / disliking cards on swipe
    static defaultProps = {
        onSwipeRight: () => {},
        onSwipeLeft: () => {}
    }

    constructor(props: any) {
        super()

        const position = new Animated.ValueXY()

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
                    this.resetPosition()
                }
            }
        })

        this.state = { panResponder, position, index: 0 }
    }

    // TODO: This is deprecated
    UNSAFE_componentWillReceiveProps(nextProps: Readonly<{}>, nextContext: any) {
        if (nextProps.data !== this.props.data) {
            this.setState({ index: 0 })
        }
    }

    // TODO: This is deprecated
    UNSAFE_componentWillUpdate() {
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true)
        LayoutAnimation.spring()
    }

    forceSwipe(direction: number) {
        const x = direction === 0 ? -SCREEN_WIDTH : SCREEN_WIDTH
        Animated.timing(this.state.position, {
            toValue: {x, y: 0},
            useNativeDriver: false,
            duration: SWIPE_OUT_DURATION
        }).start(() => this.onSwipeComplete(direction))
    }

    onSwipeComplete(direction: number) {
        const { onSwipeLeft, onSwipeRight, data } = this.props
        const item = data[this.state.index]
        direction === 0 ? onSwipeLeft(item) : onSwipeRight(item)
        this.state.position.setValue({ x: 0, y: 0 })
        this.setState({ index: this.state.index + 1 })
    }

    resetPosition() {
        Animated.spring(this.state.position, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false
        }).start()
    }

    getCardStyle() {
        const { position } = this.state

        const rotate = position.x.interpolate({
            inputRange: [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
            outputRange: ['-120deg', '0deg', '120deg']
        });

        return {
            ...this.state.position.getLayout(),
            transform: [{ rotate }]
        }
    }

    renderCards() {
        if (this.state.index >= this.props.data.length) {
            return this.props.renderNoMoreCards()
        }

        return this.props.data.map((item: any, i: number) => {
            if (i < this.state.index) { return null }

            if (i === this.state.index) {
                return (
                    <Animated.View
                        key={item.id}
                        style={[this.getCardStyle(), styles.cardStyle]}
                        {...this.state.panResponder.panHandlers}
                    >
                        {this.props.renderCard(item)}
                    </Animated.View>
                )
            }

            return (
                <Animated.View key={item.id} style={[styles.cardStyle, { top: 10 * (i - this.state.index) }]}>
                    {this.props.renderCard(item)}
                </Animated.View>
            )
        }).reverse()
    }

    render() {
        return (
            <View style={styles.container}>
                {this.renderCards()}
            </View>
        )
    }
}

const styles = {
    cardStyle: {
        position: 'absolute',
        width: SCREEN_WIDTH,
    },
    container: {
        minHeight: SCREEN_HEIGHT,
    }
}

export default Deck
