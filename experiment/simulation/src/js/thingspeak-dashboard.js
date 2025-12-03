// Static values for temp and humidity, but fetch timestamp from ThingSpeak
const CHANNEL_ID = '2454420';
const READ_API_KEY = 'VG65ZM5BGRZL0FGU';
let simulationStarted = false;
let fetchInterval = null;

// Initialize when page loads - hide values initially
window.addEventListener('load', function () {
  // Initially show "--" for values
  if (document.getElementById('tempValue')) {
    document.getElementById('tempValue').textContent = '--';
  }
  if (document.getElementById('humidityValue')) {
    document.getElementById('humidityValue').textContent = '--';
  }
  if (document.getElementById('lastUpdate')) {
    document.getElementById('lastUpdate').textContent = '--';
  }
});

// Function to fetch last update time from ThingSpeak
function fetchLastUpdateTime() {
  if (!simulationStarted) return;
  
  const url = `https://api.thingspeak.com/channels/${CHANNEL_ID}/feeds.json?api_key=${READ_API_KEY}&results=1`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.feeds && data.feeds.length > 0) {
        const latest = data.feeds[data.feeds.length - 1];
        if (latest.created_at && document.getElementById('lastUpdate')) {
          const timestamp = new Date(latest.created_at);
          document.getElementById('lastUpdate').textContent = timestamp.toLocaleTimeString();
        }
      }
    })
    .catch(error => {
      console.error('Error fetching ThingSpeak timestamp:', error);
    });
}

// Function to show static values when simulation starts
function showStaticValues(temp, humidity) {
  simulationStarted = true;
  
  // Set static values
  if (document.getElementById('tempValue')) {
    document.getElementById('tempValue').textContent = temp || '24';
  }
  if (document.getElementById('humidityValue')) {
    document.getElementById('humidityValue').textContent = humidity || '40';
  }
  
  // Fetch last update time from ThingSpeak
  fetchLastUpdateTime();
  
  // Start fetching timestamp every 15 seconds
  if (fetchInterval) {
    clearInterval(fetchInterval);
  }
  fetchInterval = setInterval(fetchLastUpdateTime, 15000);
  
  // Update connection status
  if (document.getElementById('connectionStatus')) {
    document.getElementById('connectionStatus').innerHTML = '🔗 Connected to ThingSpeak Channel 2454420';
    document.getElementById('connectionStatus').style.background = '#4CAF50';
  }
}

// Function to hide values when simulation stops
function hideValues() {
  simulationStarted = false;
  
  // Stop fetching timestamp
  if (fetchInterval) {
    clearInterval(fetchInterval);
    fetchInterval = null;
  }
  
  if (document.getElementById('tempValue')) {
    document.getElementById('tempValue').textContent = '--';
  }
  if (document.getElementById('humidityValue')) {
    document.getElementById('humidityValue').textContent = '--';
  }
  if (document.getElementById('lastUpdate')) {
    document.getElementById('lastUpdate').textContent = '--';
  }
}

// Listen for postMessage from iframe
window.addEventListener('message', function(event) {
  // Accept messages from any origin (you can restrict this for security)
  if (event.data && event.data.type === 'simulationStart') {
    showStaticValues(event.data.temp, event.data.humidity);
  } else if (event.data && event.data.type === 'simulationStop') {
    hideValues();
  }
});
