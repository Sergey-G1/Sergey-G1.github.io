// Загрузка конфигурации Firebase из файла
fetch('configFrontend.json')
    .then(response => response.json())
    .then(firebaseConfig => {
        // Инициализация Firebase
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
                })
                .catch((error) => {
                    console.error("Error fetching data: ", error);
                });
        }

        // Fetch data every 5 seconds
        setInterval(fetchData, 5000);
    })
    .catch(error => {
        console.error("Error loading Firebase config:", error);
    });
