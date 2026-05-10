import { C } from "@/lib/constants";

export default function SectionLabel({
  children,
  color = C.coral,
  marginBottom = "1rem",
}: {
  children: React.ReactNode;
  color?: string;
  marginBottom?: string;
}) {
  return (
    <span
      style={{
        fontSize: "0.7rem",
        fontWeight: 700,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color,
        display: "block",
        marginBottom,
      }}
    >
      {children}
    </span>
  );
}
