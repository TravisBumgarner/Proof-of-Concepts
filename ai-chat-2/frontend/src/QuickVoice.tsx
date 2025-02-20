import { VoiceProvider } from '@humeai/voice-react';

function App() {
  const apiKey = 'foo';

  return (
    <VoiceProvider
      auth={{ type: 'apiKey', value: apiKey }}
    >
    </VoiceProvider>
  );
}

export default App