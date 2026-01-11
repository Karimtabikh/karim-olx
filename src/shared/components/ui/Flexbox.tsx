type FlexboxProps = {
  children: React.ReactNode;
  direction?: "row" | "column";
  align?: "flex-start" | "center" | "flex-end" | "stretch";
  justify?:
    | "flex-start"
    | "center"
    | "flex-end"
    | "space-between"
    | "space-around";
  gap?: number;
};

export default function Flexbox({
  children,
  direction = "row",
  align = "center",
  justify = "center",
  gap = 0,
}: FlexboxProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: direction,
        alignItems: align,
        justifyContent: justify,
        gap: `${gap}px`,
      }}
    >
      {children}
    </div>
  );
}
