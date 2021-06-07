import React from "react"
import { StyleSheet, Text, View, Image } from "react-native"
import Audio from "./components/AudioComponent"
import FAQ from "./components/FAQComponent"
import Map from "./components/MapComponent"
import { createBottomTabNavigator } from "react-navigation-tabs"
import { createAppContainer } from "react-navigation"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"
import { Header, Icon } from "react-native-elements"

const TabNavigator = createBottomTabNavigator(
	{
		Audio: Audio,
		FAQ: FAQ,
		Map: Map,
	},
	{
		defaultNavigationOptions: ({ navigation }) => ({
			tabBarIcon: ({ focused, horizontal, tintColor }) => {
				const { routeName } = navigation.state
				let iconName
				if (routeName === "Audio") {
					iconName = "headphones"
				} else if (routeName === "FAQ") {
					iconName = "question"
				} else {
					iconName = "map"
				}
				return <Icon name={iconName} type='font-awesome' size={25} color={tintColor} />
			},
		}),
		tabBarOptions: {
			activeTintColor: "red",
			inactiveTintColor: "gray",
		},
	}
)

const AppNavigator = createAppContainer(TabNavigator)

export default function App() {
	return (
		<SafeAreaProvider>
			<Header
				rightComponent={{ icon: "settings", style: { color: "#000" } }}
				leftComponent={{
					text: "EASTERN STATE PENITENTIARY",
					style: { color: "#000" },
				}}
				backgroundImage='./assets/ESP_LogoBlackText.jpg'
				containerStyle={{
					justifyContent: "space-around",
					backgroundColor: "white",
				}}
			/>
			<AppNavigator />
		</SafeAreaProvider>
	)
}
