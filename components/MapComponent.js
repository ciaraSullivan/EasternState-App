import React, { Component } from "react"
import { View, Text, Image, Dimensions, Linking, Button, SafeAreaView } from "react-native"

class Map extends Component {
	static navigationOptions = {
		title: "Map",
	}

	render() {
		return (
			<View>
				<Button
					title='PDF of Map'
					onPress={() => {
						Linking.openURL(
							"https://www.easternstate.org/sites/easternstate/files/inline-images/ESP_Summer-Map-vertical-for-phone-May-2021.jpg"
						)
					}}
				/>
				<Image
					style={{ width: 400, height: 400 }}
					source={require("../assets/espMap.jpg")}
				/>
			</View>
		)
	}
}

export default Map
