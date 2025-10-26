import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Image,
  StatusBar
} from 'react-native';
import { vegetarianFoods } from '../data';

//  selectedFood: { 
//     id: 1, 
//     name: "Avocado Salad", 
//     primaryColor: "#2E7D32", // deep avocado green 
//     type: "Salad", 
//     image: require("./assets/foods/avocado.png") 
//   },

const HomeScreen = ({ navigation }) => {
  // This function handles when a user taps a food card
  // It navigates to the Foods screen and passes the selected food data
  const handleFoodPress = (food) => {
    navigation.navigate('Foods', { selectedFood: food });
  };

  return (
    <ScrollView style={styles.container}>
      {/* StatusBar controls the top system bar appearance */}
      <StatusBar barStyle="light-content" backgroundColor="#1B5E20" />
      
      {/* Header section with app mission */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Vegetarian Living</Text>
        <Text style={styles.headerSubtitle}>Healthy • Fresh • Plant-Based</Text>
      </View>

      {/* Hero cover image */}
      <View style={styles.imgBg}>
        <Image 
          source={require('../assets/foods/cover.png')} 
          style={styles.img} 
        />
      </View>
      
      {/* Featured foods section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Featured Dishes</Text>
        {vegetarianFoods.map(food => (
          <TouchableOpacity 
            key={food.id}
            style={[styles.foodCard, { backgroundColor: food.primaryColor }]}
            onPress={() => handleFoodPress(food)}
          >
            <Image source={food.image} style={styles.foodImage} />
            <Text style={styles.foodName}>{food.name}</Text>
            <Text style={styles.foodType}>{food.type}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA', // Very light gray background
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA', // Subtle border for depth
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1B5E20', // Our deep forest green for brand consistency
  },
  headerSubtitle: {
    fontSize: 15,
    color: '#444',
    marginTop: 4,
  },
  imgBg: {
    width: '100%',
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: '90%',
    height: 200,
    borderRadius: 15, // Rounded corners for modern look
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: '#222',
  },
  foodCard: {
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
    // Shadow creates depth and makes cards pop off the screen
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 2, // Android shadow
  },
  foodImage: {
    width: 60,
    height: 60,
    marginBottom: 8,
    borderRadius: 10,
  },
  foodName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff', // White text for contrast against colored backgrounds
  },
  foodType: {
    fontSize: 14,
    color: '#fff',
    marginTop: 4,
    opacity: 0.9, // Slightly transparent for hierarchy
  },
});

export default HomeScreen;
