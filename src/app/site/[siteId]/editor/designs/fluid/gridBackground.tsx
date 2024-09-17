import { styled } from "@stitches/react";
import { times } from "lodash";
import { useCallback } from "react";

const BackgroundWrap = styled("div", {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: -1,
});
interface GridBackgroundProps {
  containerWidth: number;
  cols: number;
  rowHeight: number;
  padding: [number, number];
}
const GridBackground: React.FC<GridBackgroundProps> = ({
  containerWidth,
  cols,
  rowHeight,
  padding,
}) => {
  const PATTERN_NAME = "grid_layout_pattern";

  const renderPattern = useCallback(() => {
    const [horizontalPadding, verticalPadding] = padding;
    const paddingWidth = verticalPadding * (cols - 1);
    const columnWidth = (containerWidth - paddingWidth) / cols;
    return (
      <pattern
        id={PATTERN_NAME}
        patternUnits="userSpaceOnUse"
        width="100%"
        height={rowHeight + horizontalPadding}
      >
        {times(cols).map((_, index) => (
          <rect
            className="stroke-muted-foreground fill-muted"
            strokeWidth={1}
            key={index}
            x={(columnWidth + verticalPadding) * index}
            y={0}
            width={columnWidth}
            height={rowHeight}
          />
        ))}
      </pattern>
    );
  }, [containerWidth, cols, padding, rowHeight]);

  return (
    <BackgroundWrap>
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

export default GridBackground;
