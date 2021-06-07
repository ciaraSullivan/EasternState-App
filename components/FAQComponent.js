import React, { Component } from "react"
import {
	LayoutAnimation,
	StyleSheet,
	View,
	Text,
	ScrollView,
	UIManager,
	TouchableOpacity,
	Platform,
} from "react-native"
import { CONTENT } from "../assets/FAQList"

class ExpandableItemComponent extends Component {
	constructor() {
		super()
		this.state = {
			layoutHeight: 0,
		}
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.item.isExpanded) {
			this.setState(() => {
				return {
					layoutHeight: null,
				}
			})
		} else {
			this.setState(() => {
				return {
					layoutHeight: 0,
				}
			})
		}
	}
	shouldComponentUpdate(nextProps, nextState) {
		if (this.state.layoutHeight !== nextState.layoutHeight) {
			return true
		}
		return false
	}

	render() {
		return (
			<View>
				<TouchableOpacity
					activeOpacity={0.8}
					onPress={this.props.onClickFunction}
					style={styles.header}
				>
					<Text style={styles.headerText}>{this.props.item.category_name}</Text>
				</TouchableOpacity>
				<View
					style={{
						height: this.state.layoutHeight,
						overflow: "hidden",
					}}
				>
					{this.props.item.subcategory.map((item, key) => (
						<TouchableOpacity key={key} style={styles.content}>
							<Text style={styles.text}>{item.val}</Text>
							<View style={styles.separator} />
						</TouchableOpacity>
					))}
				</View>
			</View>
		)
	}
}

class FAQ extends Component {
	static navigationOptions = {
		title: "FAQ",
	}

	constructor() {
		super()
		if (Platform.OS === "android") {
			UIManager.setLayoutAnimationEnabledExperimental(true)
		}
		this.state = { listDataSource: CONTENT }
	}

	updateLayout = (index) => {
		LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
		const array = [...this.state.listDataSource]
		array.map((value, placeindex) =>
			placeindex === index
				? (array[placeindex]["isExpanded"] = !array[placeindex]["isExpanded"])
				: (array[placeindex]["isExpanded"] = false)
		)
		this.setState(() => {
			return {
				listDataSource: array,
			}
		})
	}

	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.topHeading}>Frequently Asked Questions</Text>
				<ScrollView>
					{this.state.listDataSource.map((item, key) => (
						<ExpandableItemComponent
							key={item.category_name}
							onClickFunction={this.updateLayout.bind(this, key)}
							item={item}
						/>
					))}
				</ScrollView>
			</View>
		)
	}
}

export default FAQ

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 30,
		backgroundColor: "black",
	},
	topHeading: {
		paddingLeft: 10,
		fontSize: 20,
		fontWeight: "100",
		color: "red",
	},
	header: {
		backgroundColor: "black",
		padding: 16,
	},
	headerText: {
		fontSize: 16,
		fontWeight: "500",
		color: "white",
	},
	separator: {
		height: 0.5,
		backgroundColor: "red",
		width: "95%",
		marginLeft: 16,
		marginRight: 16,
	},
	text: {
		fontSize: 16,
		color: "black",
		padding: 10,
	},
	content: {
		paddingLeft: 10,
		paddingRight: 10,
		backgroundColor: "white",
	},
})
