import firebase from 'firebase'
const config = {
    apiKey: "AIzaSyDcsbxQM1Zyh5Ae8jEh33mmm5LDWW_mRuU",
    authDomain: "pmannuel-com.firebaseapp.com",
    databaseURL: "https://pmannuel-com.firebaseio.com",
    projectId: "pmannuel-com",
    storageBucket: "pmannuel-com.appspot.com",
    messagingSenderId: "334246275546"
};
firebase.initializeApp(config);
export default firebase;