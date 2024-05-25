"use client";
import { createContext, useContext, useEffect } from "react";
import { getRenderId, randomIdGenerator, storeRenderId } from "./utils";

const ABfyContext = createContext({ backendUrl: "" });

export const AbfyProvider = ({ children, backendUrl }: any) => {
  useEffect(() => {
    const storedData =
      JSON.parse(sessionStorage.getItem("abfy_experiments")) || {};

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

type ExperimentResult = {
  experimentId: string;
  variantId: string;
};

type ExperiementResultPayload = {
  experimentId: string;
  variantId: string;
  timestamp: string;
  context?: string;
  renderId: string;
};

export async function publishExperimentResult(
  experimentId: string,
  variantId: string,
  backendUrl: string,
  context: null | string = null
): Promise<void> {
  const payload: ExperiementResultPayload = {
    experimentId,
    variantId,
    timestamp: new Date().toUTCString(),
    renderId: "",
  };

  let renderId = getRenderId();
  console.log("RenderId received is", renderId);

  if (!renderId) {
    storeRenderId(randomIdGenerator("Render"));
    renderId = getRenderId();
    console.log("RenderId after generation is", renderId);
    if (renderId) payload.renderId = renderId;
  } else {
    payload.renderId = renderId;
  }

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

    console.log("Experiment result published successfully.");
  } catch (error) {
    console.error("Error publishing experiment result:", error);
  }
}
