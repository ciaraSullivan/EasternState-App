import React, { Component } from "react"
import { View, Text, Image, Linking, Button, TouchableOpacity } from "react-native"

class Map extends Component {
	static navigationOptions = {
		title: "Map",
	}

	render() {
		return (
			<View style={{ marginVertical: 75 }}>
				<TouchableOpacity
					onPress={() => {
						Linking.openURL(
							"https://www.easternstate.org/sites/easternstate/files/inline-images/ESP_Summer-Map-vertical-for-phone-May-2021.jpg"
						)
					}}
					style={{
						alignItems: "center",
						backgroundColor: "grey",
						justifyContent: "center",
						height: 50,
						padding: 5,
						marginHorizontal: 50,
						marginBottom: 50,
					}}
				>
					<Text style={{ color: "white", fontWeight: "bold", fontSize: 22 }}>
						PDF of Map
					</Text>
				</TouchableOpacity>
				<Image
					style={{ width: 400, height: 400 }}
					source={require("../assets/espMap.jpg")}
				/>
			</View>
		)
	}
}

export default Map
