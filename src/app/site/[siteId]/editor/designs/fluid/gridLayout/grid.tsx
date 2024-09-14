import React, { useCallback } from "react";
import { times } from "lodash";
import { BackgroundWrap } from "./styles";

interface Props {
  containerWidth: number;
  cols: number;
  rowHeight: number;
  padding: [number, number];
  background: string;
}

const PATTERN_NAME = "grid_layout_pattern";

const GridBackground = (props: Props) => {
  const { containerWidth, cols, rowHeight, padding, background } = props;

  const renderPattern = useCallback(() => {
    const [horizontalPadding, verticalPadding] = padding;
    const paddingWidth = verticalPadding * (cols - 1);
    const columnWidth = (containerWidth - paddingWidth) / cols;
    return (
      /**
       * for more about patternUnits
       * @see: https://developer.mozilla.org/zh-CN/docs/Web/SVG/Attribute/patternUnits
       */
      <pattern
        id={PATTERN_NAME}
        patternUnits="userSpaceOnUse"
        width="100%"
        height={rowHeight + horizontalPadding}
      >
        {times(cols).map((value, index) => {
          return (
            <rect
              className="stroke-muted-foreground" // This sets the border color
              strokeWidth={1}
              key={index}
              x={(columnWidth + verticalPadding) * index}
              y={0}
              width={columnWidth}
              height={rowHeight}
              fill={background}
            />
          );
        })}
      </pattern>
    );
  }, [containerWidth, cols, padding, rowHeight, background]);

  return (
    <BackgroundWrap className="">
      <svg width="100%" height="100%">
        <defs>{renderPattern()}</defs>
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill={`url(#${PATTERN_NAME})`}
        />
      </svg>
    </BackgroundWrap>
  );
};

GridBackground.defaultProps = {
  background: "hsl(var(--muted))",
};

export default GridBackground;
