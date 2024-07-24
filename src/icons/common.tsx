import { cn } from "@/lib/utils";

export const NoColorIcon = () => {
  return (
    <svg
      data-v-62352d9f=""
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        data-v-62352d9f=""
        d="M5 5L19.1 19.1L5 5ZM12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
        stroke="none"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
        className="stroke-foreground"
      ></path>
    </svg>
  );
};

export const JustifyStart = () => {
  return (
    <svg
      width={16}
      height={16}
      data-v-4f505e90=""
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        data-v-4f505e90=""
        d="M2 2H22M9 22V7H15V22H9Z"
        stroke="white"
      ></path>
    </svg>
  );
};
export const JustifyCenter = () => {
  return (
    <svg
      width={16}
      height={16}
      data-v-4f505e90=""
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        data-v-4f505e90=""
        d="m2 12h7m6 0h7m-13 9v-18h6v18h-6z"
        stroke="white"
      ></path>
    </svg>
  );
};
export const JustifyEnd = () => {
  return (
    <svg
      width={16}
      height={16}
      data-v-4f505e90=""
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        data-v-4f505e90=""
        d="M22 22H2M15 2V17H9V2H15Z"
        stroke="white"
      ></path>
    </svg>
  );
};

export const ImagePlaceHolder = ({
  fillColor,
  width = 50,
  height = 45,
}: {
  fillColor?: string;
  width?: number;
  height?: number;
}) => {
  const iconClassName = cn("", fillColor ? fillColor : "fill-background");
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className={iconClassName}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2 3H22V21H2V3ZM17.9724 9C17.9724 8.11765 17.2665 7.5 16.4724 7.5C15.6783 7.5 14.9724 8.20588 14.9724 9C14.9724 9.88235 15.6783 10.5 16.4724 10.5C17.3548 10.5 17.9724 9.79412 17.9724 9ZM10.2 10.5L6 16.5H18L15.6 13.5L13.8 15.3L10.2 10.5Z"
      />
    </svg>
  );
};
