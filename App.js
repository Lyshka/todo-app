import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View, TouchableOpacity, FlatList, Modal, ActivityIndicator} from 'react-native';
import colors from './Colors';
import {AntDesign} from "@expo/vector-icons"
import TodoList from './components/TodoList';
import {useEffect, useState} from 'react';
import AddListModal from './components/AddListModal';
import {firebase} from "./Fire"


export default function App() {
	const [addTodoVisible, setAddTodoVisible] = useState(false)
	const [lists, setLists] = useState([])
	const [user, setUser] = useState({})
	const [loading, setLoading] = useState(true)

	const todoRef = firebase
		.firestore()
		.collection("users")
		.doc("rBjtwfmk2GgnoC3L6ZeajoQVLSu1")
		.collection("lists")

	const toggleAddTodoModal = () => {
		setAddTodoVisible(prev => !prev)
	}

	const addList = (list) => {
		todoRef.add({
			name: list.name,
			color: list.color,
			todos: []
		})
	}

	const updateList = (list) => {
		todoRef.doc(list.id).update(list)
	}

	useEffect(() => {
		todoRef
			.orderBy("name")
			.onSnapshot(snapshot => {
				const todos = []

				snapshot.forEach((doc) => {
					todos.push({
						id: doc.id,
						...doc.data()
					})
				})

				setLists(todos)
			})

		setLoading(false)
	}, [])

	if (loading) {
		return (
			<View style={styles.container}>
				<ActivityIndicator size={"large"} color={colors.blue} />
			</View>
		)
	}

	return (

		<View style={styles.container}>
			<Modal
				animationType='slide'
				visible={addTodoVisible}
				onRequestClose={toggleAddTodoModal}
			>
				<AddListModal closeModal={toggleAddTodoModal} addList={addList} />
			</Modal>

			<StatusBar style="auto" />
			<View style={{flexDirection: "row"}}>
				<View style={styles.divider} />
				<Text style={styles.title}>
					Todo <Text style={{fontWeight: "300", color: colors.blue}}>Lyshka</Text>
				</Text>
				<View style={styles.divider} />
			</View>

			<View style={{marginVertical: 48}}>
				<TouchableOpacity style={styles.addList} onPress={toggleAddTodoModal}>
					<AntDesign name='plus' size={16} color={colors.blue} />
				</TouchableOpacity>

				<Text style={styles.add}>
					Add List
				</Text>
			</View>

			<View style={{height: 275, paddingLeft: 32}}>
				<FlatList
					data={lists}
					keyExtractor={item => item.id.toString()}
					horizontal={true}
					showsHorizontalScrollIndicator={false}
					renderItem={({item}) => <TodoList list={item} updateList={updateList} />}
					keyboardShouldPersistTaps="always"
				/>
			</View>
		</View>

	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	divider: {
		backgroundColor: colors.lightBlue,
		height: 2,
		flex: 1,
		alignSelf: "center"
	},
	title: {
		fontSize: 38,
		fontWeight: "800",
		color: colors.black,
		paddingHorizontal: 45
	},
	addList: {
		borderWidth: 2,
		borderColor: colors.lightBlue,
		borderRadius: 4,
		padding: 16,
		alignItems: "center",
		justifyContent: "center"
	},
	add: {
		color: colors.blue,
		fontWeight: "600",
		fontSize: 14,
		marginTop: 8
	}
});
