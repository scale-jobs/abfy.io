"use client";
import React, { ReactElement, useEffect, useState, ReactNode } from "react";

import { publishExperimentResult, useAbfyContext } from "./AbfyContext";
import { ABFY_VARIANT } from "./utils/constants";
import { logger } from "./utils/logger";

type ExperimentPropTypes = {
  children: ReactNode;
  id: string;
};

export function Experiment({
  id,
  children,
}: ExperimentPropTypes): ReactElement {
  const [selectedVariant, setSelectedVariant] =
    useState<null | ReactElement<any>>(null);
  const context = useAbfyContext();
  useEffect(() => {
    logger({
      message: "Context is",
      level: "INFO",
      data: context,
    });
  }, [context]);

  useEffect(() => {
    const variants = React.Children.toArray(children).filter(
      (child) => child?.props?.id === ABFY_VARIANT
    );

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
          setSelectedVariant(randomVariant);
          publishExperimentResult(
            id,
            randomVariant.props.id,
            context.backendUrl
          );
        }
      }
    }
    // selectVariant(variantId);
  }, [children]);
  return selectedVariant ? selectedVariant : <h1>Loading...</h1>;
}
