// Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCU__tNtteuEsmw0_uTkHwoSbSQ9snQM40",
    authDomain: "tirabota-2dd58.firebaseapp.com",
    projectId: "tirabota-2dd58",
    storageBucket: "tirabota-2dd58.appspot.com",
    messagingSenderId: "531431614879",
    appId: "1:531431614879:web:bacf36bc88d7372d14b5aa"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();

function fetchData() {
    db.collection("machine_data").orderBy("timestamp", "desc").limit(10).get()
        .then((querySnapshot) => {
            let dataContainer = document.getElementById('data-container');
            dataContainer.innerHTML = "";
            querySnapshot.forEach((doc) => {
                let data = doc.data();
                let dataDiv = document.createElement('div');
                dataDiv.innerHTML = `Temperature: ${data.temperature} °C, Pressure: ${data.pressure} bar, Timestamp: ${new Date(data.timestamp.seconds * 1000).toLocaleString()}`;
                dataContainer.appendChild(dataDiv);
            });
        });
}

// Fetch data every 5 seconds
setInterval(fetchData, 5000);
