import { StyleSheet, View, Text, ScrollView } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Deck from './src/Deck'
import { Icon, Button } from '@rneui/base'
import { Card } from '@rneui/themed'

// TODO: Using `item.uri` in `CardImage` doesn't render the image
const DATA = [
  { id: 1, text: 'Card #1', uri: './assets/image-01.jpg' },
  { id: 2, text: 'Card #2', uri: './assets/image-01.jpg' },
  { id: 3, text: 'Card #3', uri: './assets/image-01.jpg' },
  { id: 4, text: 'Card #4', uri: './assets/image-01.jpg' },
  { id: 5, text: 'Card #5', uri: './assets/image-01.jpg' },
  { id: 6, text: 'Card #6', uri: './assets/image-01.jpg' },
  { id: 7, text: 'Card #7', uri: './assets/image-01.jpg' },
  { id: 8, text: 'Card #8', uri: './assets/image-01.jpg' },
  { id: 9, text: 'Card #9', uri: './assets/image-01.jpg' },
]

export default function App() {

  const renderCard = (item: any) => {
    return (
        <Card key={item.id}>
            <Card.Title>{item.text}</Card.Title>
            <Card.Divider/>
            <Card.Image
                source={require('./assets/image-01.jpg')}
                />
            <Text style={{ marginBottom: 10 }}>
                I can customize the card further.
            </Text>
            <Button title={'fav'}>
                // TODO: This button doesn't do anything yet
                <Icon name={'code'} />
            </Button>
        </Card>
    )
  }

  const renderNoMoreCards = () => {
    return (
        <Card>
            <Text style={{ margin: 10 }}>
                No more cards
            </Text>
            // TODO: This button doesn't do anything yet
            <Button
                title="GET MORE CARDS"
                type="outline"
            />
        </Card>
    )
  }

  return (
      <SafeAreaProvider>
          <ScrollView>
              <View style={styles.container}>
                  <Deck
                      data={DATA}
                      renderCard={renderCard}
                      renderNoMoreCards={renderNoMoreCards}
                  />
              </View>
          </ScrollView>
      </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})
