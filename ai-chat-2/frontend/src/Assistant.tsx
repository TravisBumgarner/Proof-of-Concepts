import { AssistantRuntimeProvider } from "@assistant-ui/react";
import { useChatRuntime } from "@assistant-ui/react-ai-sdk";
import { ThreadList } from "./components/assistant-ui/thread-list";
import { Thread } from "./components/assistant-ui/thread";
 
const MyApp = () => {
  const runtime = useChatRuntime({
    api: "/api/chat",
  });
 
  return (
    <div style={{border: '1px solid black', padding: '10px'}}>
    <AssistantRuntimeProvider runtime={runtime}>
      <div className="grid h-dvh grid-cols-[200px_1fr] gap-x-2 px-4 py-4">
        <ThreadList />
        <Thread />
      </div>
    </AssistantRuntimeProvider>
    </div>
  );
};

export default MyApp