import React from "react"
import { Image, TouchableOpacity } from "react-native"
import AudioController from "./components/AudioComponent"
import FAQ from "./components/FAQComponent"
import Map from "./components/MapComponent"
import { createBottomTabNavigator } from "react-navigation-tabs"
import { createAppContainer } from "react-navigation"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { Header, Icon } from "react-native-elements"

const TabNavigator = createBottomTabNavigator(
	{
		Audio: AudioController,
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
	const renderCustomIconA = () => {
		return (
			<TouchableOpacity>
				<Image
					style={{ height: 70, width: 225, paddingVertical: 5 }}
					source={require("./assets/ESPLogo.jpg")}
				/>
			</TouchableOpacity>
		)
	}

	return (
		<SafeAreaProvider>
			<Header
				rightComponent={{ icon: "settings", style: { color: "#000" } }}
				rightContainerStyle={{ flex: 1 }}
				leftComponent={() => renderCustomIconA()}
				leftContainerStyle={{ flex: 8 }}
				containerStyle={{
					justifyContent: "space-around",
					backgroundColor: "white",
					height: 125,
				}}
			/>
			<AppNavigator />
		</SafeAreaProvider>
	)
}
