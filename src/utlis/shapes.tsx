import { CornerRadius } from "@/types/sectionsTypes/fluid";
import type React from "react";

export interface Shape {
  id: string;
  name: string;
  component: (props: {
    bgColor?: string;
    borderColor?: string;
    borderWidth?: number;
    corners?: CornerRadius;
    blur?: number | null | undefined;
    glassEffect?: boolean;
  }) => React.ReactNode;
  withBorder?: boolean;
  withCorners?: boolean;
  defaultRounded?: number;
  defaultBgColor: string;
  defaultBorderColor?: string;
  defaultBlur?: number;
}

export const shapes: Shape[] = [
  {
    id: "square",
    name: "Square",
    withBorder: true,
    withCorners: true,
    defaultRounded: 0,
    defaultBgColor: "#10B981",
    defaultBorderColor: "#ffffff",
    defaultBlur: 20,
    component: ({
      bgColor,
      borderColor,
      borderWidth,
      corners,
      blur,
      glassEffect,
    }) => (
      <div
        style={{
          width: "100%",
          height: "100%",
          borderTopLeftRadius: corners?.topLeft || 0,
          borderTopRightRadius: corners?.topRight || 0,
          borderBottomLeftRadius: corners?.bottomLeft || 0,
          borderBottomRightRadius: corners?.bottomRight || 0,
          backgroundColor: bgColor || "#10B981",
          borderColor: borderColor || "#ffffff",
          borderWidth: borderWidth,
          borderStyle: "solid",
          backdropFilter: glassEffect ? `blur(${blur || 20}px) ` : undefined,
          WebkitBackdropFilter: glassEffect
            ? `blur(${blur || 20}px)`
            : undefined,
        }}
      />
    ),
  },
  {
    id: "circle",
    name: "Circle",
    withBorder: true,
    defaultBgColor: "#3B82F6",
    defaultBorderColor: "#ffffff",
    component: ({ bgColor, borderColor, borderWidth }) => (
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "9999px",
          backgroundColor: bgColor || "#3B82F6",
          borderColor: borderColor || "#ffffff",
          borderWidth: borderWidth,
          borderStyle: "solid",
        }}
      />
    ),
  },
  {
    id: "rounded-rectangle",
    name: "Rounded Rectangle",
    withBorder: true,
    withCorners: true,
    defaultRounded: 12,
    defaultBgColor: "#8B5CF6",
    defaultBorderColor: "#ffffff",
    component: ({ bgColor, borderColor, borderWidth, corners }) => (
      <div
        className="rounded-[12px]"
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: bgColor || "#8B5CF6",
          borderColor: borderColor || "#ffffff",
          borderWidth: borderWidth,
          borderStyle: "solid",
          borderTopLeftRadius: corners?.topLeft,
          borderTopRightRadius: corners?.topRight,
          borderBottomLeftRadius: corners?.bottomLeft,
          borderBottomRightRadius: corners?.bottomRight,
        }}
      />
    ),
  },
  {
    id: "hexagon",
    name: "Hexagon",
    defaultBgColor: "#EF4444",
    component: ({ bgColor }) => (
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: bgColor || "#EF4444",
            clipPath:
              "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
          }}
        />
      </div>
    ),
  },
  {
    id: "close",
    name: "Close",
    defaultBgColor: "#F472B6",
    component: ({ bgColor }) => (
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: bgColor || "#F472B6",
            clipPath:
              "polygon(20% 0%, 0% 20%, 30% 50%, 0% 80%, 20% 100%, 50% 70%, 80% 100%, 100% 80%, 70% 50%, 100% 20%, 80% 0%, 50% 30%)",
          }}
        />
      </div>
    ),
  },
  {
    id: "octagon",
    name: "Octagon",
    defaultBgColor: "#F59E0B",
    component: ({ bgColor }) => (
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: bgColor || "#F59E0B",
            clipPath:
              "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
          }}
        />
      </div>
    ),
  },
  {
    id: "diamond",
    name: "Diamond",
    defaultBgColor: "#06B6D4",
    component: ({ bgColor }) => (
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: bgColor || "#06B6D4",
            clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
          }}
        />
      </div>
    ),
  },
  {
    id: "cut-down",
    name: "Cut Down",
    defaultBgColor: "#0EA5E9",
    component: ({ bgColor }) => (
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            clipPath: "polygon(100% 100%, 50% 60%, 0 100%, 0 0, 100% 0)",
            backgroundColor: bgColor || "#0EA5E9",
          }}
        />
      </div>
    ),
  },
  {
    id: "trapezoid",
    name: "Trapezoid",
    defaultBgColor: "#D946EF",
    component: ({ bgColor }) => (
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: bgColor || "#D946EF",
            clipPath: "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)",
          }}
        />
      </div>
    ),
  },
  {
    id: "rabbet",
    name: "Rabbet",
    defaultBgColor: "#0891B2",
    component: ({ bgColor }) => (
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: bgColor || "#0891B2",
            clipPath:
              "polygon(0% 15%, 15% 15%, 15% 0%, 85% 0%, 85% 15%, 100% 15%, 100% 85%, 85% 85%, 85% 100%, 15% 100%, 15% 85%, 0% 85%)",
          }}
        />
      </div>
    ),
  },
  {
    id: "pentagon",
    name: "Pentagon",
    defaultBgColor: "#6366F1",
    component: ({ bgColor }) => (
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: bgColor || "#6366F1",
            clipPath: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
          }}
        />
      </div>
    ),
  },
  {
    id: "left-arrow",
    name: "Left Arrow",
    defaultBgColor: "#C2410C",
    component: ({ bgColor }) => (
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: bgColor || "#C2410C",
            clipPath:
              "polygon(40% 0%, 40% 20%, 100% 20%, 100% 80%, 40% 80%, 40% 100%, 0% 50%)",
          }}
        />
      </div>
    ),
  },
  {
    id: "nonagon",
    name: "Nonagon",
    defaultBgColor: "#A3E635",
    component: ({ bgColor }) => (
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: bgColor || "#A3E635",
            clipPath:
              "polygon(50% 0%, 83% 12%, 100% 43%, 94% 78%, 68% 100%, 32% 100%, 6% 78%, 0% 43%, 17% 12%)",
          }}
        />
      </div>
    ),
  },
  {
    id: "triangle",
    name: "Triangle",
    defaultBgColor: "#EAB308",
    component: ({ bgColor }) => (
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: bgColor || "#EAB308",
            clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)",
          }}
        />
      </div>
    ),
  },
  {
    id: "right-triangle",
    name: "Right Triangle",
    defaultBgColor: "#F97316",
    component: ({ bgColor }) => (
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: bgColor || "#F97316",
            clipPath: "polygon(0% 0%, 100% 100%, 0% 100%)",
          }}
        />
      </div>
    ),
  },
  {
    id: "star",
    name: "Star",
    defaultBgColor: "#EC4899",
    component: ({ bgColor }) => (
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: bgColor || "#EC4899",
            clipPath:
              "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
          }}
        />
      </div>
    ),
  },
  {
    id: "heart",
    name: "Heart",
    defaultBgColor: "#EF4444",
    component: ({ bgColor }) => (
      <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%" }}>
        <path
          d="M50 90C50 90 10 60 10 30A20 20 0 0 1 50 30A20 20 0 0 1 90 30C90 60 50 90 50 90Z"
          fill={bgColor || "#EF4444"}
        />
      </svg>
    ),
  },
  {
    id: "chat-bubble",
    name: "Chat Bubble",
    defaultBgColor: "#3B82F6",
    component: ({ bgColor }) => (
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: bgColor || "#3B82F6",
            borderRadius: "0.5rem",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-0.75rem",
            left: "1.5rem",
            width: "1.5rem",
            height: "1.5rem",
            backgroundColor: bgColor || "#3B82F6",
            clipPath: "polygon(0% 0%, 100% 0%, 50% 100%)",
          }}
        />
      </div>
    ),
  },
  {
    id: "message-bubble",
    name: "Message Bubble",
    defaultBgColor: "#22C55E",
    component: ({ bgColor }) => (
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: bgColor || "#22C55E",
            borderRadius: "0.5rem",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            right: "-0.75rem",
            width: "1.5rem",
            height: "1.5rem",
            backgroundColor: bgColor || "#22C55E",
            transform: "translateY(-50%)",
            clipPath: "polygon(0% 0%, 0% 100%, 100% 50%)",
          }}
        />
      </div>
    ),
  },
  {
    id: "cross",
    name: "Cross",
    defaultBgColor: "#374151",
    component: ({ bgColor }) => (
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: bgColor || "#374151",
            clipPath:
              "polygon(35% 0%, 65% 0%, 65% 35%, 100% 35%, 100% 65%, 65% 65%, 65% 100%, 35% 100%, 35% 65%, 0% 65%, 0% 35%, 35% 35%)",
          }}
        />
      </div>
    ),
  },
  {
    id: "chevron",
    name: "Chevron",
    defaultBgColor: "#14B8A6",
    component: ({ bgColor }) => (
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: bgColor || "#14B8A6",
            clipPath:
              "polygon(0% 0%, 75% 0%, 100% 50%, 75% 100%, 0% 100%, 25% 50%)",
          }}
        />
      </div>
    ),
  },
  {
    id: "right-arrow",
    name: "Right Arrow",
    defaultBgColor: "#8B5CF6",
    component: ({ bgColor }) => (
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: bgColor || "#8B5CF6",
            clipPath:
              "polygon(0% 20%, 60% 20%, 60% 0%, 100% 50%, 60% 100%, 60% 80%, 0% 80%)",
          }}
        />
      </div>
    ),
  },
  {
    id: "shield",
    name: "Shield",
    defaultBgColor: "#2563EB",
    component: ({ bgColor }) => (
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: bgColor || "#2563EB",
            clipPath: "polygon(0% 0%, 100% 0%, 100% 75%, 50% 100%, 0% 75%)",
          }}
        />
      </div>
    ),
  },
  {
    id: "badge",
    name: "Badge",
    defaultBgColor: "#D97706",
    component: ({ bgColor }) => (
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: bgColor || "#D97706",
            clipPath:
              "polygon(10% 0%, 90% 0%, 100% 50%, 90% 100%, 10% 100%, 0% 50%)",
          }}
        />
      </div>
    ),
  },
  {
    id: "tag",
    name: "Tag",
    defaultBgColor: "#F43F5E",
    component: ({ bgColor }) => (
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: bgColor || "#F43F5E",
            clipPath:
              "polygon(0% 0%, 90% 0%, 100% 50%, 90% 100%, 0% 100%, 10% 50%)",
          }}
        />
      </div>
    ),
  },
  {
    id: "puzzle-piece",
    name: "Puzzle Piece",
    defaultBgColor: "#9333EA",
    component: ({ bgColor }) => (
      <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%" }}>
        <path
          d="M20 0H80V20C100 20 100 40 100 40V60C100 80 80 80 80 80V100H60C60 80 40 80 40 80H20C0 80 0 60 0 60V40C0 20 20 20 20 20Z"
          fill={bgColor || "#9333EA"}
        />
      </svg>
    ),
  },
  {
    id: "blob",
    name: "Blob",
    defaultBgColor: "#9333EA",
    component: ({ bgColor }) => (
      <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%" }}>
        <path
          d="M60 10Q80 10 85 30Q95 45 85 65Q75 85 50 85Q25 85 15 65Q5 45 15 30Q20 10 40 10Q50 5 60 10Z"
          fill={bgColor || "#9333EA"}
        />
      </svg>
    ),
  },
  {
    id: "wave",
    name: "Wave",
    defaultBgColor: "#0891B2",
    component: ({ bgColor }) => (
      <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%" }}>
        <path
          d="M0 30Q25 10 50 30Q75 50 100 30V100H0Z"
          fill={bgColor || "#0891B2"}
        />
      </svg>
    ),
  },
];
