"use client";
import React, { ReactElement, useEffect, useState } from "react";
import { ReactNode } from "react";
import AbfyProvider from "./useAbfy";

type ExperimentPropTypes = {
  children: ReactNode;
  id: string;
};

export function Experiment({ id, children }: ExperimentPropTypes): JSX.Element {
  const [selectedVariant, setSelectedVariant] =
    useState<null | ReactElement<any>>(null);
  const [experimentData, addExperimentResult] = AbfyProvider(
    "https://webhook.site/89a562a1-b9ad-4b35-a909-c0811c3bf077"
  );

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
          addExperimentResult(id, randomVariant.props.id);
        }
      }
    }

    // selectVariant(variantId);
  }, [children]);
  return selectedVariant ? selectedVariant : <h1>Loading...</h1>;
}
