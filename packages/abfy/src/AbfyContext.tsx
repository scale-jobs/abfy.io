"use client";
import React, { createContext, useContext, useEffect } from "react";

import useABfySession from "./ABfySessionProvider";
import { randomIdGenerator, storeRenderId } from "./utils";
import { ABFY_SESSION_STORAGE_KEY } from "./utils/constants";
import { logger } from "./utils/logger";

type AbfyProviderProps = {
  children: any;
  backendUrl: string;
};

type ExperimentResultPayload = {
  experimentId: string;
  variantId: string;
  timestamp: string;
  context?: string;
  renderId: string;
};

const ABfyContext = createContext({ backendUrl: "" });
export const ABfyProvider = ({ children, backendUrl }: AbfyProviderProps) => {
  useEffect(() => {
    let storedData = {};
    let sessionData = sessionStorage.getItem(ABFY_SESSION_STORAGE_KEY);
    if (sessionData !== null) {
      storedData = JSON.parse(sessionData);
    }

    if (Object.keys(storedData).length === 0) {
      const renderId = randomIdGenerator("Render");
      storeRenderId(renderId);
    }
  }, []);

  return (
    <ABfyContext.Provider value={{ backendUrl: backendUrl }}>
      {children}
    </ABfyContext.Provider>
  );
};

export const useAbfyContext = () => {
  const context = useContext(ABfyContext);
  if (!context) {
    throw new Error("useAbfyContext must be used within an AbfyProvider");
  }
  return context;
};

export async function publishExperimentResult(
  experimentId: string,
  variantId: string,
  backendUrl: string,
  context: null | string = null
): Promise<void> {
  const payload: ExperimentResultPayload = {
    experimentId,
    variantId,
    timestamp: new Date().toUTCString(),
    renderId: useABfySession(),
  };

  if (context) {
    payload.context = context;
  }

  try {
    const response = await fetch(backendUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to publish experiment result: ${response.statusText}`
      );
    }

    logger({
      message: "Experiment result published successfully.",
      level: "INFO",
    });
  } catch (error) {
    logger({
      message: "Error publishing experiment result",
      level: "ERROR",
      data: error,
    });
  }
}
