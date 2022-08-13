import {AntDesign, Ionicons} from '@expo/vector-icons';
import {View, Text, TouchableOpacity, StyleSheet} from "react-native"
import colors from '../Colors'

const RenderTodo = ({todo, index, toggleTodoCompleted, deleteTodo}) => {
	return (
		<View style={styles.todoContainer}>
			<TouchableOpacity onPress={() => toggleTodoCompleted(index)}>
				<Ionicons
					name={todo.completed ? "ios-square" : "ios-square-outline"}
					size={24}
					color={colors.gray}
					style={{width: 32}}
				/>
			</TouchableOpacity>

			<Text
				style={[styles.todo,
				{
					color: todo.completed ? colors.gray : colors.black,
					textDecorationLine: todo.completed ? "line-through" : "none",
				}]}
			>
				{todo.title}
			</Text>

			<TouchableOpacity onPress={() => deleteTodo(index)}>
				<AntDesign
					name="delete"
					size={24}
					color={colors.red}
					style={{
						alignSelf: "flex-end"
					}}
				/>
			</TouchableOpacity>
		</View>
	)
}

const styles = StyleSheet.create({
	todoContainer: {
		paddingVertical: 16,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between"
	},
	todo: {
		color: colors.black,
		fontWeight: "700",
		fontSize: 16,
	},
	deleteButton: {
		flex: 1,
		backgroundColor: colors.red
	}
})

export default RenderTodo