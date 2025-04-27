import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
  const [stompClient, setStompClient] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  const connect = useCallback(() => {
    const socket = new SockJS("http://localhost:8081/ws");
    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      debug: (str) => console.log("STOMP:", str),
    });

    client.onConnect = () => {
      setIsConnected(true);
      console.log("WebSocket Connected");
    };

    client.onStompError = (frame) => {
      console.error("Broker reported error:", frame.headers["message"]);
    };

    client.onWebSocketError = (error) => {
      console.error("WebSocket error:", error);
    };

    client.onDisconnect = () => {
      setIsConnected(false);
      console.log("WebSocket Disconnected");
    };

    client.activate();
    setStompClient(client);

    return client;
  }, []);

  useEffect(() => {
    const client = connect();
    return () => {
      if (client && client.connected) {
        client.deactivate();
      }
    };
  }, [connect]);

  const sendMessage = useCallback(
    (message) => {
      if (stompClient && stompClient.connected) {
        stompClient.publish({
          destination: "/app/chat.send",
          body: JSON.stringify(message),
        });
      } else {
        console.error("Cannot send message - not connected");
      }
    },
    [stompClient]
  );

  const value = {
    stompClient,
    isConnected,
    sendMessage,
  };

  return (
    <WebSocketContext.Provider value={value}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error("useWebSocket must be used within a WebSocketProvider");
  }
  return context;
};
