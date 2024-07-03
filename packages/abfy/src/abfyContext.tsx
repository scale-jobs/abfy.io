"use client";
import React, { createContext, useContext, useEffect } from "react";
import { randomIdGenerator, storeRenderId } from "./utils";
import {
  ABFY_SESSION_CONTEXT,
  ABFY_SESSION_STORAGE_KEY,
} from "./utils/constants";
import { logger } from "./utils/logger";
import {
  ABfySessionContext,
  AbfyProviderProps,
  ExperimentResultPayload,
  ExperimentResultProps,
} from "./utils/types";

const ABfyContext = createContext<{ backendUrl: string }>({ backendUrl: "" });

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
    <ABfyContext.Provider value={{ backendUrl }}>
      {children}
    </ABfyContext.Provider>
  );
};

export const useAbfyContext = () => {
  const context = useContext(ABfyContext);
  console.log("Context is", context);
  if (!context || !context.backendUrl) {
    throw new Error("Invalid Backend URL");
  }
  return context;
};

export async function publishExperimentResult(
  props: ExperimentResultProps
): Promise<void> {
  const { experimentId, variantId, renderId, context, backendUrl } = props;
  const payload: ExperimentResultPayload = {
    experimentId,
    variantId,
    timestamp: new Date().toUTCString(),
    renderId,
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

export async function publishKeyAction(
  keyActionId: string,
  backendUrl: string
): Promise<void> {
  const sessionInfo = localStorage.getItem(ABFY_SESSION_CONTEXT);
  try {
    if (sessionInfo) {
      const sessionDetail = JSON.parse(sessionInfo) as ABfySessionContext;
      const payload = {
        sessionDetail: sessionDetail,
        keyActionId,
      };
      const response = await fetch(backendUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Failed to publish Key Action: ${response.statusText}`);
      }

      logger({
        message: "Key Action published successfully.",
        level: "INFO",
      });
    }
  } catch (error) {
    logger({
      message: "Error publishing Key Action",
      level: "ERROR",
      data: error,
    });
  }
}
