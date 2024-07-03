"use client";
import React, { MouseEventHandler, FormEventHandler } from "react";

import {
  publishExperimentResult,
  publishKeyAction,
  useAbfyContext,
} from "./abfyContext";
import { logger } from "./utils/logger";

interface KeyActionProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  onClick?: MouseEventHandler<HTMLDivElement>;
  onSubmit?: FormEventHandler<HTMLDivElement>;
  id: string;
}

export const KeyAction = ({ ...props }: KeyActionProps) => {
  const { backendUrl } = useAbfyContext();
  const { id } = props;
  const handleInteraction = (eventType: string, eventData = {}) => {
    publishKeyAction(id, backendUrl);
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
