import {View, Text, StyleSheet, KeyboardAvoidingView, TouchableOpacity, TextInput} from 'react-native'
import {AntDesign} from "@expo/vector-icons"
import colors from '../Colors'
import {useState} from 'react'

const AddListModal = ({closeModal, addList}) => {
	const backgroundColors = ["#5CD859", "#24A6D9", "#595BD9", "#8022D9", "#D159D8", "#D85963", "#D88559"]

	const [name, setName] = useState("")
	const [color, setColor] = useState(backgroundColors[0])

	const createTodo = () => {
		const list = {name, color}

		addList(list)

		setName("")
		closeModal()
	}

	const RenderColors = () => {
		return backgroundColors.map(color => (
			<TouchableOpacity
				key={color}
				style={[styles.colorSelect, {backgroundColor: color}]}
				onPress={() => setColor(color)}
			/>
		))
	}

	return (
		<KeyboardAvoidingView style={styles.container} behavior="padding">
			<TouchableOpacity style={{
				position: "absolute", top: 0, right: 32
			}}
				onPress={closeModal}
			>
				<AntDesign name='close' size={24} color={colors.black} />
			</TouchableOpacity>

			<View style={{alignSelf: "stretch", marginHorizontal: 32}}>
				<Text style={styles.title}>
					Create Todo List
				</Text>

				<TextInput
					style={styles.input}
					placeholder="List Name?"
					onChangeText={text => setName(text)}
				/>

				<View style={{
					flexDirection: "row",
					justifyContent: "space-between",
					marginTop: 12
				}}>
					<RenderColors />
				</View>
				
				<TouchableOpacity
					style={[styles.create, {backgroundColor: color}]}
					onPress={createTodo}
				>
					<Text style={{
						color: colors.white,
						fontWeight: "600"
					}}>
						Create!
					</Text>
				</TouchableOpacity>
			</View>
		</KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	},
	title: {
		fontSize: 28,
		fontWeight: "800",
		color: colors.black,
		alignSelf: "center",
		marginBottom: 16
	},
	input: {
		borderWidth: 2,
		borderColor: colors.blue,
		borderRadius: 6,
		height: 50,
		marginTop: 8,
		paddingHorizontal: 16,
		fontSize: 18
	},
	create: {
		marginTop: 24,
		height: 50,
		borderRadius: 6,
		alignItems: "center",
		justifyContent: "center"
	},
	colorSelect: {
		width: 30,
		height: 30,
		borderRadius: 4
	}
})

export default AddListModal