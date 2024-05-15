// in order for this standalone JSX to work, you
// need to add appropriate tsconfig file

type VariantPropTypes = {
  id: string;
};

export function Variant({ id }: VariantPropTypes) {
  return <div>{id}</div>;
}
