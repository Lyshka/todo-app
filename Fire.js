import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"

const firebaseConfig = {
	apiKey: "AIzaSyDH2fQYdiDo4IAM6AxPKBM1tu3vfi93qcg",
	authDomain: "todo-app-43239.firebaseapp.com",
	projectId: "todo-app-43239",
	storageBucket: "todo-app-43239.appspot.com",
	messagingSenderId: "269182218937",
	appId: "1:269182218937:web:8e4796755d182168fee168"
};

if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig)
}

export {firebase}