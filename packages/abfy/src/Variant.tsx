// in order for this standalone JSX to work, you
// need to add appropriate tsconfig file

type VariantPropTypes = {
  id: string;
  children: React.ReactNode[];
};

export function Variant({ id, children }: any) {
  return <div id="abfy_variant">{children}</div>;
}
