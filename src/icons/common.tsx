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

export const AccordionSectionIcon = () => (
  <svg
    width="59"
    height="31"
    viewBox="0 0 59 31"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0.93457 20.166C0.93457 19.8899 1.15843 19.666 1.43457 19.666H57.9346C58.2107 19.666 58.4346 19.8899 58.4346 20.166V23.666C58.4346 23.9422 58.2107 24.166 57.9346 24.166H1.43457C1.15843 24.166 0.93457 23.9422 0.93457 23.666V20.166Z"
      fill="#555555"
    />
    <path
      d="M0.93457 26.166C0.93457 25.8899 1.15843 25.666 1.43457 25.666H57.9346C58.2107 25.666 58.4346 25.8899 58.4346 26.166V29.666C58.4346 29.9422 58.2107 30.166 57.9346 30.166H1.43457C1.15843 30.166 0.93457 29.9422 0.93457 29.666V26.166Z"
      fill="#555555"
    />
    <path
      d="M0.93457 0.416016C0.93457 0.277944 1.0465 0.166016 1.18457 0.166016H20.6846C20.8226 0.166016 20.9346 0.277944 20.9346 0.416016V0.916016C20.9346 1.05409 20.8226 1.16602 20.6846 1.16602H1.18457C1.0465 1.16602 0.93457 1.05409 0.93457 0.916016V0.416016Z"
      fill="#555555"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M1.43457 6.16602C1.15843 6.16602 0.93457 6.38987 0.93457 6.66602V17.666C0.93457 17.9422 1.15843 18.166 1.43457 18.166H57.9346C58.2107 18.166 58.4346 17.9422 58.4346 17.666V6.66602C58.4346 6.38987 58.2107 6.16602 57.9346 6.16602H1.43457ZM28.1321 10.5116L29.6845 12.064L31.2369 10.5116L32.115 11.3898L29.6845 13.8203L27.2539 11.3898L28.1321 10.5116Z"
      fill="#555555"
    />
  </svg>
);
export const AccordionSectionLightIcon = () => (
  <svg
    width="59"
    height="31"
    viewBox="0 0 59 31"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0.93457 20.166C0.93457 19.8899 1.15843 19.666 1.43457 19.666H57.9346C58.2107 19.666 58.4346 19.8899 58.4346 20.166V23.666C58.4346 23.9422 58.2107 24.166 57.9346 24.166H1.43457C1.15843 24.166 0.93457 23.9422 0.93457 23.666V20.166Z"
      fill="#CCCCCC"
    />
    <path
      d="M0.93457 26.166C0.93457 25.8899 1.15843 25.666 1.43457 25.666H57.9346C58.2107 25.666 58.4346 25.8899 58.4346 26.166V29.666C58.4346 29.9422 58.2107 30.166 57.9346 30.166H1.43457C1.15843 30.166 0.93457 29.9422 0.93457 29.666V26.166Z"
      fill="#CCCCCC"
    />
    <path
      d="M0.93457 0.416016C0.93457 0.277944 1.0465 0.166016 1.18457 0.166016H20.6846C20.8226 0.166016 20.9346 0.277944 20.9346 0.416016V0.916016C20.9346 1.05409 20.8226 1.16602 20.6846 1.16602H1.18457C1.0465 1.16602 0.93457 1.05409 0.93457 0.916016V0.416016Z"
      fill="#CCCCCC"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M1.43457 6.16602C1.15843 6.16602 0.93457 6.38987 0.93457 6.66602V17.666C0.93457 17.9422 1.15843 18.166 1.43457 18.166H57.9346C58.2107 18.166 58.4346 17.9422 58.4346 17.666V6.66602C58.4346 6.38987 58.2107 6.16602 57.9346 6.16602H1.43457ZM28.1321 10.5116L29.6845 12.064L31.2369 10.5116L32.115 11.3898L29.6845 13.8203L27.2539 11.3898L28.1321 10.5116Z"
      fill="#CCCCCC"
    />
  </svg>
);
