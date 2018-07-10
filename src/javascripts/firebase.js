import * as firebase from 'firebase'
let database
export const init = () => {
  let config = {
    apiKey: "AIzaSyDcsbxQM1Zyh5Ae8jEh33mmm5LDWW_mRuU",
    authDomain: "pmannuel-com.firebaseapp.com",
    databaseURL: "https://pmannuel-com.firebaseio.com",
    projectId: "pmannuel-com",
    storageBucket: "",
    messagingSenderId: "334246275546"
  }
  firebase.initializeApp(config)
  database = firebase.database()
}