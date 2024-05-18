"use client";
import React, { ReactElement, useEffect, useState } from "react";
import { ReactNode } from "react";
import { publishExperimentResult, useAbfyContext } from "./AbfyContext";

type ExperimentPropTypes = {
  children: ReactNode;
  id: string;
};

export function Experiment({ id, children }: ExperimentPropTypes): JSX.Element {
  const [selectedVariant, setSelectedVariant] =
    useState<null | ReactElement<any>>(null);
  const context = useAbfyContext();
  useEffect(() => {
    console.log("Context is", context);
  }, [context]);

  useEffect(() => {
    const variants = React.Children.toArray(children).filter(
      (child) => child?.props?.id === "abfy_variant"
    );

    if (variants && variants.length > 0) {
      const randomIndex: number = Math.floor(Math.random() * variants.length);
      const randomVariant = variants[randomIndex] as ReactElement<any>;
      if (randomVariant) {
        if (randomVariant.props.children) {
          console.log("Variant Selected Is", randomVariant.props.children);
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
