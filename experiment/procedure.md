## Procedure

1. Open the experiment in the virtual lab for establishing interrelation between cloud platforms and ESP8266/ESP32.  
   The ESP32 board and the DHT22 sensor are already connected in the workspace, and the ThingSpeak channel is preconfigured.

2. Observe the circuit connections.  
   Check the wiring between the DHT22 sensor and the ESP32 data pin along with the VCC and GND lines.  
   Verify that Wi-Fi credentials and ThingSpeak API keys are already included in the code.

3. Open and review the Arduino code.  
   Read the predefined code to understand:  
   - Wi-Fi connection setup  
   - Reading temperature and humidity values from the DHT22 sensor  
   - Forming an HTTP request to send data to ThingSpeak  
   - Updating fields on the ThingSpeak cloud channel

4. Start the simulation.  
   Click the "Start Simulation" button.  
   The ESP32 will read sensor values and send them to the ThingSpeak server at regular intervals.

5. Monitor the data on the ThingSpeak dashboard.  
   Observe the live temperature and humidity graphs appearing in the ThingSpeak chart section below the simulation.  
   The graphs will update automatically as new sensor values are uploaded.

6. Record observations.  
   Note how frequently the charts update and check if the sensor values match the readings printed in the Serial Monitor (if visible).

7. Stop the simulation.  
   Click the "Stop Simulation" button after completing the experiment.
