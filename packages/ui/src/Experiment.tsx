import React, { Children, ReactChildren, ReactElement, ReactNode } from "react";
import { useEffect } from "react";

interface ExperimentProps {
  id: string;
  children: ReactNode[];
}

/**
 *
 * <Experiment>
 *  <Variant>
 *
 *  </Variant>
 *  <Variant>
 *
 *  </Variant>
 *  <Variant>
 *
 *  </Variant>
 * </Experiment>
 */

function Experiment({ children }: any) {
  //   const Experimentchildren = React.Children.toArray(children).filter(child =>
  const result = Children.toArray(children);
  const variants = React.Children.toArray(children).filter(
    (child) => child.type && child.type.name === "Variant"
  );

  result.forEach((child) => console.log(child?.type));
  console.log("Children are", variants);
  // return { children };
  return <h1>Experiment</h1>;
}

export default Experiment;
