import firebase from 'firebase';


const firebaseConfig = {
    apiKey: "AIzaSyBTJbbMchdMSicf4UmflyKQSXgPrzib7UA",
    authDomain: "moveit-next-932a4.firebaseapp.com",
    projectId: "moveit-next-932a4",
    storageBucket: "moveit-next-932a4.appspot.com",
    messagingSenderId: "763899117970",
    appId: "1:763899117970:web:8f5b3c96428e497564414b",
    measurementId: "G-C4FR44EF3D"
  };

  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  export default firebase; 