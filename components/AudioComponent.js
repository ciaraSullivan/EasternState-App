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
	FlatList,
} from "react-native"
import { Icon, Input } from "react-native-elements"
import { Audio } from "expo-av"

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
	constructor(props) {
		super(props)
		this.state = {
			selectedStop: { name: " ", source: " ", number: " " },
			playbackObj: null,
			soundObj: null,
		}
	}

	componentDidUpdate(prevProps) {
		if (this.props.stop !== null && this.props.stop !== prevProps.stop) {
			let findStop = this.props.tour.filter((stop) => stop.number == this.props.stop)[0]

			this.setState({ selectedStop: findStop })
		}
	}

	handlePlay = async () => {
		if (this.state.soundObj === null) {
			const playbackObj = new Audio.Sound()
			const status = await playbackObj.loadAsync(
				{
					uri: this.state.selectedStop.source,
				},
				{ shouldPlay: true }
			)
			return this.setState({ ...this.state, playbackObj: playbackObj, soundObj: status })
		} else if (this.state.soundObj.uri !== this.state.selectedStop.source) {
			const status = await this.state.playbackObj.setStatusAsync({ shouldPlay: false })

			const playbackObj = new Audio.Sound()
			const Newstatus = await playbackObj.loadAsync(
				{
					uri: this.state.selectedStop.source,
				},
				{ shouldPlay: true }
			)
			return this.setState({ ...this.state, playbackObj: playbackObj, soundObj: Newstatus })
		}

		if (this.state.soundObj.isLoaded && this.state.soundObj.isPlaying) {
			console.log("audio is already playing")
		} else if (this.state.soundObj.isLoaded && !this.state.soundObj.isPlaying) {
			const status = await this.state.playbackObj.playAsync()
			return this.setState({ ...this.state, soundObj: status })
			console.log("sound Obj: ", status)
		}
	}

	handlePause = async () => {
		if (this.state.soundObj.isPlaying) {
			const status = await this.state.playbackObj.setStatusAsync({ shouldPlay: false })
			return this.setState({ ...this.state, soundObj: status })
		} else {
			console.log("audio is paused already")
		}
	}

	render() {
		return (
			<View style={{ flex: 1, paddingTop: 100 }}>
				<Text style={{ textAlign: "center", fontSize: 30, justifyContent: "center" }}>
					{this.state.selectedStop.name}
				</Text>
				<View style={{ flex: 1, flexDirection: "row", padding: 10 }}>
					<TouchableOpacity
						onPress={this.handlePlay}
						style={{
							alignItems: "center",
							backgroundColor: "green",
							justifyContent: "center",
							height: 50,
							padding: 5,
							margin: 10,
							flex: 1,
						}}
					>
						<Icon name='ios-play' type='ionicon' color='white' />
					</TouchableOpacity>
					<TouchableOpacity
						onPress={this.handlePause}
						style={{
							alignItems: "center",
							backgroundColor: "red",
							justifyContent: "center",
							height: 50,
							padding: 5,
							margin: 10,
							flex: 1,
						}}
					>
						<Icon name='ios-pause' type='ionicon' color='white' />
					</TouchableOpacity>
				</View>
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
				<Text style={{ fontSize: 30, fontWeight: "bold" }}>
					{this.state.selectedStop.name}
				</Text>
				<View
					style={{
						marginBottom: 100,
						height: 425,
						borderColor: "grey",
						borderWidth: 5,
						borderStyle: "solid",
					}}
				>
					<FlatList
						data={this.state.selectedStop.content}
						keyExtractor={(item) => item.number}
						renderItem={({ item }) => (
							<View style={{ margin: 10 }}>
								<Text style={{ fontSize: 20, lineHeight: 22 }}>{item}</Text>
							</View>
						)}
					/>
				</View>
			</SafeAreaView>
		)
	}
}

class AudioController extends React.Component {
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

	whichComp() {
		if (this.state.audioTrue) {
			return <AudioPlayer stop={this.state.stop} tour={this.state.content.audio} />
		} else {
			return <BookPlayer stop={this.state.stop} tour={this.state.content.book} />
		}
	}

	changeIcon() {
		this.setState({ audioTrue: !this.state.audioTrue, stop: "", numberSearch: null })
	}

	render() {
		return (
			<SafeAreaView>
				<Text style={{ textAlign: "center", fontSize: 25, paddingTop: 20 }}>
					Enter a number:
				</Text>
				<TextInput
					value={this.state.numberSearch}
					onChangeText={(val) => this.setState({ numberSearch: val })}
					keyboardType='numeric'
					style={{
						borderWidth: 3,
						borderColor: "black",
						borderStyle: "solid",
						marginHorizontal: 100,
						marginVertical: 5,
						paddingHorizontal: 100,
						paddingVertical: 10,
					}}
				/>
				<View style={{ flex: 1, flexDirection: "row", margin: 10 }}>
					<TouchableOpacity
						onPress={() => {
							this.searchFiles()
						}}
						style={{
							flex: 1,
							backgroundColor: "black",
							height: 35,
							padding: 5,
							marginHorizontal: 15,
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<Text style={{ color: "white" }}>Enter</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => {
							this.changeIcon()
						}}
						style={{
							flex: 1,
							backgroundColor: "black",
							marginHorizontal: 15,
							height: 35,
							padding: 5,
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<Icon
							name={this.state.audioTrue ? "ios-book" : "ios-headset"}
							type='ionicon'
							color='white'
						/>
					</TouchableOpacity>
				</View>
				<View style={{ paddingTop: 60 }}>{this.whichComp()}</View>
			</SafeAreaView>
		)
	}
}

export default AudioController
