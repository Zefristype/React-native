import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";

const MapScreen = () => {
  const navigation = useNavigation();
  const { params } = useRoute();
  return (
    <View style={styles.container}>
      <MapView
        onPress={() => {
          navigation.navigate("PostsScreen");
        }}
        style={styles.mapStyle}
        region={{
          ...params,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
      >
        {params && (
          <Marker title="I am here" coordinate={params} description="Cords" />
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default MapScreen;
