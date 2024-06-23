"use client";
import React, { MouseEventHandler, FormEventHandler } from "react";

import { publishExperimentResult, useAbfyContext } from "./AbfyContext";

interface KeyActionProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  onClick?: MouseEventHandler<HTMLDivElement>;
  onSubmit?: FormEventHandler<HTMLDivElement>;
}

export const KeyAction = ({ ...props }: KeyActionProps) => {
  const { backendUrl } = useAbfyContext();

  const handleInteraction = (eventType: string, eventData = {}) => {
    publishExperimentResult("", "", backendUrl, eventType);

    console.log("Interaction:", {
      experimentId: "null",
      variantId: "null",
      renderId: "null",
      eventType,
      eventData,
    });
  };

  return (
    <div
      onClick={() => handleInteraction("click")}
      onSubmit={(e) => {
        e.preventDefault();
        handleInteraction("submit", { formData: e.target });
      }}
      {...props}
    >
      {props.children}
    </div>
  );
};
