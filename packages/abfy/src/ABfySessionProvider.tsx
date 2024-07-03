import React, { useEffect, useState } from "react";
import { randomIdGenerator } from "./utils";
import {
  ABFY_SESSION_CONTEXT,
  ABFY_SESSION_STORAGE_KEY,
} from "./utils/constants";
import { ABfySessionContext, UseABfySessionProps } from "./utils/types";
// Store a unique but human readable session id for each render
// Return the session id if present or create a new one if not
// All the operations WRT a user session will take place here
export function updateAbfySession(
  abfySessionContext: ABfySessionContext,
  experimentId: string,
  variantId: string
): ABfySessionContext {
  let generatedSessionContext: ABfySessionContext = {
    sessionId: "",
    experimentVariantMapping: {},
  };
  const existingSession = localStorage.getItem(ABFY_SESSION_CONTEXT);
  if (existingSession) {
    generatedSessionContext = JSON.parse(existingSession);
    console.log("existing context", existingSession);
    if (!generatedSessionContext.experimentVariantMapping[experimentId]) {
      generatedSessionContext.experimentVariantMapping[experimentId] = {
        variantId: variantId,
        context: {},
      };
    }
  } else {
    const generatedSessionId: string = randomIdGenerator();
    localStorage.setItem(ABFY_SESSION_STORAGE_KEY, generatedSessionId);

    generatedSessionContext.sessionId = generatedSessionId;
    generatedSessionContext.experimentVariantMapping[experimentId] = {
      variantId: variantId,
      context: {},
    };
    localStorage.setItem(
      ABFY_SESSION_CONTEXT,
      JSON.stringify(generatedSessionContext)
    );
  }
  return generatedSessionContext;
}

export function useABfySession(): UseABfySessionProps {
  const [abfySession, setABfySession] = useState<ABfySessionContext>({
    sessionId: "",
    experimentVariantMapping: {},
  });
  return { abfySession, setABfySession };
}
