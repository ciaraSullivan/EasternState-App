import * as React from "react"
import { Component } from "react"
import {
	View,
	Text,
	SafeAreaView,
	TouchableOpacity,
	Alert,
	ScrollView,
	TextInput,
	Keyboard,
	TouchableWithoutFeedback,
} from "react-native"
import { Icon, Input } from "react-native-elements"

import AudioStopList from "../assets/audioStops"
import BookStopList from "../assets/bookStops"

const DismissKeyboardHOC = (Comp) => {
	return ({ children, ...props }) => (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
			<Comp {...props}>{children}</Comp>
		</TouchableWithoutFeedback>
	)
}
const DismissKeyboardView = DismissKeyboardHOC(View)

class AudioPlayer extends React.Component {
	render() {
		return (
			<View>
				<Text>AudioPlayer</Text>
				<Text>Audio Stop: {this.props.stop}</Text>
			</View>
		)
	}
}

class BookPlayer extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			selectedStop: { name: " ", content: " ", number: " " },
		}
	}

	componentDidUpdate(prevProps) {
		if (this.props.stop !== null && this.props.stop !== prevProps.stop) {
			let findStop = this.props.tour.filter((stop) => stop.number == this.props.stop)[0]

			this.setState({ selectedStop: findStop })
		}
	}

	render() {
		return (
			<SafeAreaView>
				<ScrollView>
					<Text>{this.state.selectedStop.name}</Text>
					<Text>{this.state.selectedStop.content}</Text>
				</ScrollView>
			</SafeAreaView>
		)
	}
}

class Audio extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			audioTrue: true,
			stop: "",
			content: {
				audio: AudioStopList,
				book: BookStopList,
			},
			numberSearch: null,
		}
	}

	static navigationOptions = {
		title: "Audio",
	}

	searchFiles() {
		if (this.state.audioTrue) {
			if (
				this.state.content.audio.filter((stop) => stop.number == this.state.numberSearch)
					.length
			) {
				this.setState({ stop: this.state.numberSearch })
			} else {
				Alert.alert("Audio Stop not found.", "Please enter another number.")
			}
		} else {
			if (
				this.state.content.book.filter((stop) => stop.number == this.state.numberSearch)
					.length
			) {
				this.setState({ stop: this.state.numberSearch })
			} else {
				Alert.alert("Book Stop not found.", "Please enter another number.")
			}
		}
	}

	whichOne() {
		if (this.state.audioTrue) {
			return <AudioPlayer stop={this.state.stop} tour={this.state.content.audio} />
		} else {
			return <BookPlayer stop={this.state.stop} tour={this.state.content.book} />
		}
	}

	changeIcon() {
		this.setState({ audioTrue: !this.state.audioTrue })
	}

	render() {
		return (
			<SafeAreaView>
				<Text>Enter a number:</Text>
				<DismissKeyboardView>
					<TextInput
						value={this.state.numberSearch}
						onChangeText={(val) => this.setState({ numberSearch: val })}
						keyboardType='numeric'
					/>
				</DismissKeyboardView>
				<TouchableOpacity
					onPress={() => {
						this.searchFiles()
					}}
				>
					<Text>Enter</Text>
				</TouchableOpacity>
				<Icon
					name={this.state.audioTrue ? "ios-book" : "ios-headset"}
					type='ionicon'
					onPress={() => this.changeIcon()}
				/>
				{this.whichOne()}
			</SafeAreaView>
		)
	}
}

export default Audio
