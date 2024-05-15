"use client";
import React, { ReactElement, useEffect } from "react";
import { ReactNode } from "react";

type ExperimentPropTypes = {
  children: ReactNode;
  id: string;
};

export function Experiment({ children }: ExperimentPropTypes): JSX.Element {
  const variants = React.Children.toArray(children);
  useEffect(() => {
    const variants = React.Children.toArray(children);
    console.log("Variants are", variants);
    if (variants && variants.length > 0) {
      const randomIndex: number = Math.floor(Math.random() * variants.length);
      const randomVariant = variants[randomIndex] as ReactElement<any>;
      if (randomVariant) {
        if (randomVariant.props.children) {
          console.log("Variant Selected Is", randomVariant.props.children);
        }
      }
    }

    // selectVariant(variantId);
  }, [children]);
  return <div>Experiment</div>;
}
