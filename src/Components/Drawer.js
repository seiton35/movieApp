import React, { useRef } from "react";
import { Button, DrawerLayoutAndroid, StyleSheet, View } from "react-native";

export default function Drawer() {
  const drawer = useRef(null);
  const drawerPosition = "left";


  const navigationView = () => (
    <View style={[styles.container, styles.navigationContainer]}>
      <Button
        title="Close drawer"
        onPress={() => drawer.current.closeDrawer()}
      />
    </View>
  );

  return (
    <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={300}
      drawerPosition='left'
      renderNavigationView={navigationView}
    >
    </DrawerLayoutAndroid>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16
  },
  navigationContainer: {
    backgroundColor: "#ecf0f1"
  },
});