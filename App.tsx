import {StyleSheet, View, Text, ScrollView} from 'react-native';
import { SafeAreaProvider } from "react-native-safe-area-context";
import Deck from "./src/Deck";
import {Icon, Button} from "@rneui/base";
import {Card} from '@rneui/themed';

const DATA = [
  { id: 1, text: 'Card #1', uri: 'C:\\Users\\hyavi\\IdeaProjects\\simple-card-swiper\\assets\\splash.png' },
  { id: 2, text: 'Card #2', uri: 'C:\\Users\\hyavi\\IdeaProjects\\simple-card-swiper\\assets\\splash.png' },
  { id: 3, text: 'Card #3', uri: 'C:\\Users\\hyavi\\IdeaProjects\\simple-card-swiper\\assets\\splash.png' },
  { id: 4, text: 'Card #4', uri: 'C:\\Users\\hyavi\\IdeaProjects\\simple-card-swiper\\assets\\splash.png' },
  { id: 5, text: 'Card #5', uri: 'C:\\Users\\hyavi\\IdeaProjects\\simple-card-swiper\\assets\\splash.png' },
  { id: 6, text: 'Card #6', uri: 'C:\\Users\\hyavi\\IdeaProjects\\simple-card-swiper\\assets\\splash.png' },
  { id: 7, text: 'Card #7', uri: 'C:\\Users\\hyavi\\IdeaProjects\\simple-card-swiper\\assets\\splash.png' },
  { id: 8, text: 'Card #8', uri: 'C:\\Users\\hyavi\\IdeaProjects\\simple-card-swiper\\assets\\splash.png' },
  { id: 9, text: 'Card #9', uri: 'C:\\Users\\hyavi\\IdeaProjects\\simple-card-swiper\\assets\\splash.png' },
];

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
                <Icon name={'code'} />
            </Button>
        </Card>
    );
  }

  const renderNoMoreCards = () => {
    return (
        <Card>
            <Text style={{ margin: 10 }}>
                No more cards here man
            </Text>
            <Button
                title="Get more"
                type="outline"
            />
        </Card>
    );
  }

  return (
      <SafeAreaProvider>
          <ScrollView>
              <View style={styles.container}>
                  <Deck
                      // @ts-ignore
                      data={DATA}
                      renderCard={renderCard}
                      renderNoMoreCards={renderNoMoreCards}
                  />
              </View>
          </ScrollView>
      </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
