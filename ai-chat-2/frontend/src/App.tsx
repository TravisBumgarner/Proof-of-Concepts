import React, { useEffect } from 'react';
import './App.css';
import { LocalNotifications } from '@capacitor/local-notifications';
import Assistant from './Assistant';
import QuickVoice from './QuickVoice';

function App() {
  useEffect(() => {
    // Request notification permissions on mount
    const requestPermission = async () => {
      const result = await LocalNotifications.requestPermissions();
      if (result.display !== 'granted') {
        alert('Notification permission denied');
      }
    };

    requestPermission();
  }, []);

  const sendTestNotification = async () => {
    try {
      await LocalNotifications.schedule({
        notifications: [
          {
            id: Date.now(),
            title: 'Test Notification',
            body: 'This is a test local notification',
            schedule: { at: new Date(Date.now() + 3000) }, // Trigger in 3 seconds
          },
        ],
      });
      alert('Local notification scheduled');
    } catch (error) {
      alert('Error scheduling local notification: ' + JSON.stringify(error));
    }
  };

  return (
    <div className="App">
        <p>Hello world.!</p>
        <button onClick={sendTestNotification}>Send Test Notification</button>
    <Assistant />
    <QuickVoice />
    </div>
  );
}

export default App;
