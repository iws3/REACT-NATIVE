
// screens/FoodsScreen.js
import React from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  Image, 
  StyleSheet 
} from 'react-native';
import { vegetarianFoods } from '../data';

//  selectedFood: { 
//     id: 1, 
//     name: "Avocado Salad", 
//     primaryColor: "#2E7D32", // deep avocado green 
//     type: "Salad", 
//     image: require("./assets/foods/avocado.png") 
//   },

const FoodsScreen = ({ route }) => {
  // route.params contains data passed from other screens
  // We use optional chaining (?.) because params might be undefined
  const selectedFood = route.params?.selectedFood;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>All Vegetarian Foods</Text>
        {/* Only show this text if a food was selected */}
        {selectedFood && (
          <Text style={styles.highlightText}>
            Selected: {selectedFood.name}
          </Text>
        )}
      </View>
      
      <View style={styles.section}>
        {vegetarianFoods.map(food => (
          <View 
            key={food.id}
            style={[
              styles.foodCard,
              { backgroundColor: food.primaryColor },
              // Add selected style if this food matches the selected one
              selectedFood?.id === food.id && styles.selectedFood
            ]}
          >
            <Image source={food.image} style={styles.foodImage} />
            <Text style={styles.foodName}>{food.name}</Text>
            <Text style={styles.foodType}>{food.type}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1B5E20',
  },
  highlightText: {
    fontSize: 14,
    color: '#2E7D32', // Deep green accent for emphasis
    marginTop: 8,
    fontWeight: '600',
  },
  section: {
    padding: 20,
  },
  foodCard: {
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 2,
  },
  selectedFood: {
    borderWidth: 3,
    borderColor: '#1B5E20', // Thick dark green border highlights selection
    shadowOpacity: 0.15, // Stronger shadow makes it pop more
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
    color: '#fff',
  },
  foodType: {
    fontSize: 14,
    color: '#fff',
    marginTop: 4,
    opacity: 0.9,
  },
});

export default FoodsScreen;