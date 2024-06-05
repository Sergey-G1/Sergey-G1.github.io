firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();

var temperatureData = [];
var pressureData = [];
var labels = [];
var temperatureChart;
var pressureChart;

function fetchData() {
    db.collection("machine_data").orderBy("timestamp", "desc").limit(10).get()
        .then((querySnapshot) => {
            let dataContainer = document.getElementById('data-container');
            dataContainer.innerHTML = "";
            temperatureData = [];
            pressureData = [];
            labels = [];

            querySnapshot.forEach((doc) => {
                let data = doc.data();
                let roundedTemperature = data.temperature.toFixed(3);
                let roundedPressure = data.pressure.toFixed(3);

                temperatureData.push(roundedTemperature);
                pressureData.push(roundedPressure);
                labels.push(new Date(data.timestamp.seconds * 1000).toLocaleString());
            });

            for (let i = 7; i < 11; i++) {
                let index = temperatureData.length - 1 - i;
                if (index >= 0) {
                    let dataDiv = document.createElement('div');
                    dataDiv.classList.add('col-md-4', 'mb-3');
                    dataDiv.innerHTML = `
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Время: ${labels[index]}</h5>
                            <p class="card-text">Температура: ${temperatureData[index]} °C</p>
                            <p class="card-text">Давление: ${pressureData[index]} бар</p>
                        </div>
                    </div>
                `;
                    dataContainer.appendChild(dataDiv);
                }
            }

            updateCharts();
        });
}

function updateCharts() {
    var ctxTemperature = document.getElementById('temperatureChart').getContext('2d');
    var ctxPressure = document.getElementById('pressureChart').getContext('2d');

    if (temperatureChart) {
        temperatureChart.destroy();
    }
    if (pressureChart) {
        pressureChart.destroy();
    }

    temperatureChart = new Chart(ctxTemperature, {
        type: 'line',
        data: {
            labels: labels.slice().reverse(),
            datasets: [{
                label: 'Температура (°C)',
                data: temperatureData.slice().reverse(),
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                x: { title: { display: true, text: 'Время' } },
                y: { title: { display: true, text: 'Температура (°C)' } }
            }
        }
    });

    pressureChart = new Chart(ctxPressure, {
        type: 'line',
        data: {
            labels: labels.slice().reverse(),
            datasets: [{
                label: 'Давление (бар)',
                data: pressureData.slice().reverse(),
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                x: { title: { display: true, text: 'Время' } },
                y: { title: { display: true, text: 'Давление (бар)' } }
            }
        }
    });
}

setInterval(fetchData, 5000);

fetchData();
