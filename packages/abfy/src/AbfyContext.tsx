"use client";
import React, { createContext, useContext, useState } from "react";

const ABfyContext = createContext({ backendUrl: "" });

export const AbfyProvider = ({ children, backendUrl }: any) => {
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

export async function publishExperimentResult(
  experimentId: string,
  variantId: string,
  backendUrl: string
): Promise<void> {
  const payload = {
    experimentId,
    variantId,
    timestamp: new Date().toUTCString(),
  };

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