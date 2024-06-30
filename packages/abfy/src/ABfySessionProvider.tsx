import React, { useEffect, useState } from "react";
import { randomIdGenerator } from "./utils";
import { ABFY_SESSION_STORAGE_KEY } from "./utils/constants";
// Store a unique but human readable session id for each render
// Return the session id if present or create a new one if not
// All the operations WRT a user session will take place here
function useABfySession() {
  const [sessionId, setSessionId] = useState<string>("");
  useEffect(() => {
    const existingSessionId = localStorage.getItem(ABFY_SESSION_STORAGE_KEY);
    if (existingSessionId) {
      setSessionId(existingSessionId);
    } else {
      const sessionId: string = randomIdGenerator();
      localStorage.setItem(ABFY_SESSION_STORAGE_KEY, sessionId);
      setSessionId(sessionId);
    }
  }, []);

  return sessionId;
}

export default useABfySession;
