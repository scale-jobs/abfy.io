"use client";
import React, { ReactElement, useEffect, useState, ReactNode } from "react";

import { publishExperimentResult, useAbfyContext } from "./abfyContext";
import { logger } from "./utils/logger";
import { isReactElement, isVariant } from "./utils";
import { updateAbfySession, useABfySession } from "./ABfySessionProvider";
import { ExperimentResultPayload, ExperimentResultProps } from "./utils/types";

type ExperimentPropTypes = {
  children: ReactNode;
  id: string;
};

export default function Experiment({
  id,
  children,
}: ExperimentPropTypes): ReactElement | null {
  const context = useAbfyContext();
  const { abfySession, setABfySession } = useABfySession();
  useEffect(() => {
    logger({
      message: "Context is",
      level: "INFO",
      data: context,
    });
  }, [context]);

  let experimentResults: ExperimentResultProps = {
    experimentId: id,
    variantId: "",
    renderId: abfySession.sessionId,
    context: {},
    backendUrl: context.backendUrl,
  };

  const variants = React.Children.toArray(children)
    .filter(isReactElement)
    .filter(isVariant);

  console.log("session is", abfySession);

  if (abfySession.experimentVariantMapping[id]) {
    console.log("It is coming here");
    experimentResults.variantId =
      abfySession.experimentVariantMapping[id].variantId;
    experimentResults.context =
      abfySession.experimentVariantMapping[id].context;
  } else {
    if (variants && variants.length > 0) {
      const randomIndex: number = Math.floor(Math.random() * variants.length);
      const randomVariant = variants[randomIndex] as ReactElement<any>;
      if (randomVariant) {
        if (randomVariant.props.children) {
          logger({
            message: "Variant Selected Is",
            data: randomVariant.props.children,
            level: "INFO",
          });
          setABfySession(
            updateAbfySession(abfySession, id, randomVariant.props.variantId)
          );
          experimentResults.variantId = randomVariant.props.variantId;
          console.log("Session is", abfySession);
        }
      }
    }
  }
  publishExperimentResult(experimentResults);
  console.log("Experiment variant id is", experimentResults.variantId);
  return (
    variants.find(
      (variant) => variant.props.variantId === experimentResults.variantId
    ) ?? null
  );
}
