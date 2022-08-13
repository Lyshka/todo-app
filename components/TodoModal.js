import {useState} from 'react'
import {View, Text, StyleSheet, SafeAreaView, TouchableOpacity, FlatList, KeyboardAvoidingView, TextInput, Keyboard} from 'react-native'
import {AntDesign} from "@expo/vector-icons"
import colors from '../Colors'
import RenderTodo from './RenderTodo'

const TodoModal = ({list, closeModal, updateList}) => {
	const [newTodo, setNewTodo] = useState("")

	const taskCount = list.todos.length
	const completedCount = list.todos.filter(todo => todo.completed).length

	const toggleTodoCompleted = (index) => {
		list.todos[index].completed = !list.todos[index].completed

		updateList(list)
	}

	const addTodo = () => {
		list.todos.push({title: newTodo, completed: false})

		updateList(list)
		setNewTodo("")

		Keyboard.dismiss()
	}

	const deleteTodo = (index) => {
		list.todos.splice(index, 1)

		updateList(list)
	}

	return (
		<KeyboardAvoidingView style={{flex: 1}}>
			<SafeAreaView style={styles.container}>
				<TouchableOpacity style={{
					position: "absolute",
					top: 0,
					right: 32,
					zIndex: 10
				}}
					onPress={closeModal}
				>
					<AntDesign name='close' size={24} color={colors.black} />
				</TouchableOpacity>

				<View style={[styles.section, styles.header, {borderBottomColor: list.color}]}>
					<View>
						<Text style={styles.title}>{list.name}</Text>
						<Text style={styles.taskCount}>
							{completedCount} of {taskCount} tasks
						</Text>
					</View>
				</View>

				<View style={[styles.section, {flex: 3}]}>
					<FlatList
						data={list.todos}
						renderItem={({item, index}) => <RenderTodo todo={item} index={index} toggleTodoCompleted={toggleTodoCompleted} deleteTodo={deleteTodo} />}
						keyExtractor={(_, index) => index.toString()}
						contentContainerStyle={{
							paddingHorizontal: 32,
							paddingVertical: 64
						}}
						showsVerticalScrollIndicator={false}
					/>
				</View>

				<View style={[styles.section, styles.footer]}>
					<TextInput
						style={[styles.input, {borderColor: list.color}]}
						onChangeText={text => setNewTodo(text)}
						value={newTodo}
					/>
					<TouchableOpacity
						style={[styles.addTodo, {backgroundColor: list.color}]}
						onPress={addTodo}
					>
						<AntDesign
							name='plus'
							size={16}
							color={colors.white}
						/>
					</TouchableOpacity>
				</View>
			</SafeAreaView>
		</KeyboardAvoidingView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	},
	section: {
		flex: 1,
		alignSelf: "stretch",
		marginBottom: 20
	},
	header: {
		justifyContent: "flex-end",
		marginLeft: 64,
		borderBottomWidth: 5,
	},
	title: {
		fontSize: 30,
		fontWeight: "800",
		color: colors.black
	},
	taskCount: {
		marginTop: 4,
		marginBottom: 16,
		color: colors.gray,
		fontWeight: "600"
	},
	footer: {
		paddingHorizontal: 32,
		flexDirection: "row",
		alignItems: "center"
	},
	input: {
		flex: 1,
		height: 48,
		borderWidth: 2,
		borderRadius: 6,
		marginRight: 8,
		paddingHorizontal: 8
	},
	addTodo: {
		borderRadius: 4,
		padding: 16,
		alignItems: "center",
		justifyContent: "center"
	}
})

export default TodoModal