import { cn } from "@/shared/utils/cn";

type FlexboxProps = {
  children: React.ReactNode;
  direction?: "row" | "column";
  align?: "flex-start" | "center" | "flex-end" | "stretch";
  justify?:
    | "flex-start"
    | "center"
    | "flex-end"
    | "space-between"
    | "space-around"
    | "space-evenly";
  gap?: number | string;
  className?: string;
  styles?: React.CSSProperties;
};

export default function Flexbox({
  children,
  direction = "row",
  align = "flex-start",
  justify = "center",
  gap = 0,
  className,
  styles,
}: FlexboxProps) {
  return (
    <div
      className={cn(className)}
      style={{
        display: "flex",
        flexDirection: direction,
        alignItems: align,
        justifyContent: justify,
        gap,
        ...styles,
      }}
    >
      {children}
    </div>
  );
}
