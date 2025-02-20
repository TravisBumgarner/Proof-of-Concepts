import { StyleSheet, Image, Platform, Button } from 'react-native';

import React, { useState } from 'react';
import { EmbeddedVoice } from '@humeai/voice-embed-react';

export default function TabTwoScreen() {
  const apiKey = process.env.HUME_API_KEY || '';
  const [isEmbedOpen, setIsEmbedOpen] = useState(false);

  return (
    <>
      <Button title="Open Widget" onPress={() => setIsEmbedOpen(true)} />
      <EmbeddedVoice
        auth={{ type: 'apiKey', value: apiKey }}
        onMessage={(msg) => console.log('Message received: ', msg)}
        onClose={() => setIsEmbedOpen(false)}
        isEmbedOpen={isEmbedOpen}
      />
    </>
  );
}
