"use client";
import React, { MouseEventHandler, FormEventHandler } from "react";

import { publishExperimentResult, useAbfyContext } from "./tempcontext";
import { logger } from "./utils/logger";

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
    logger({
      message: "Interaction:",
      level: "INFO",
      data: {
        experimentId: "null",
        variantId: "null",
        renderId: "null",
        eventType,
        eventData,
      },
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
