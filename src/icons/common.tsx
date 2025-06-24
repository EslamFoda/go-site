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
        strokeLinecap="round"
        strokeLinejoin="round"
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

export const VideoPlaceHolder = ({
  fillColor,
  width = 60,
  height = 55,
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
      data-v-549a1164=""
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className={iconClassName}
        data-v-549a1164=""
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2 3H22V21H2V3ZM4 5H6V7H4V5ZM4 13H6V15H4V13ZM6 9H4V11H6V9ZM4 16.9995H6V18.9995H4V16.9995ZM20 5H18V7H20V5ZM18 13H20V15H18V13ZM20 9H18V11H20V9ZM18 16.9995H20V18.9995H18V16.9995ZM16 5H8V11H16V5ZM8 13H16V19H8V13Z"
      ></path>
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
      fillRule="evenodd"
      clipRule="evenodd"
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
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.43457 6.16602C1.15843 6.16602 0.93457 6.38987 0.93457 6.66602V17.666C0.93457 17.9422 1.15843 18.166 1.43457 18.166H57.9346C58.2107 18.166 58.4346 17.9422 58.4346 17.666V6.66602C58.4346 6.38987 58.2107 6.16602 57.9346 6.16602H1.43457ZM28.1321 10.5116L29.6845 12.064L31.2369 10.5116L32.115 11.3898L29.6845 13.8203L27.2539 11.3898L28.1321 10.5116Z"
      fill="#CCCCCC"
    />
  </svg>
);

export const MenuIcon1 = ({
  // active,
  className,
}: {
  // active: boolean;
  className?: string;
}) => {
  return (
    <svg
      data-v-90cc7c96=""
      width={16}
      height={16}
      fill="none"
      viewBox="0 0 24 25"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        data-v-90cc7c96=""
        d="m2 4.5h20v2h-20v-2zm0 7h20v2h-20v-2zm0 7h20v2h-20v-2z"
        clipRule="evenodd"
        fill="currentColor"
        // className={`${active ? "fill-foreground" : "fill-muted-foreground"}`}
        fillRule="evenodd"
      ></path>
    </svg>
  );
};

export const MenuIcon2 = ({
  // active,
  className,
}: {
  // active: boolean;
  className?: string;
}) => {
  return (
    <svg
      data-v-90cc7c96=""
      width={16}
      height={16}
      fill="none"
      viewBox="0 0 24 25"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        data-v-90cc7c96=""
        d="m2 4.5h20v2h-20v-2zm0 7h12v2h-12v-2zm0 7h20v2h-20v-2z"
        clipRule="evenodd"
        fill="currentColor"
        // className={`${active ? "fill-foreground" : "fill-muted-foreground"}`}
        fillRule="evenodd"
      ></path>
    </svg>
  );
};

export const MenuIcon3 = ({
  // active,
  className,
}: {
  // active: boolean;
  className?: string;
}) => {
  return (
    <svg
      width={16}
      height={16}
      data-v-90cc7c96=""
      fill="none"
      viewBox="0 0 24 25"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        data-v-90cc7c96=""
        d="m2 4.5h20v2h-20v-2zm0 14h20v2h-20v-2z"
        clipRule="evenodd"
        fill="currentColor"
        // className={`${active ? "fill-foreground" : "fill-muted-foreground"}`}
        fillRule="evenodd"
      ></path>
    </svg>
  );
};

export const MenuIcon4 = ({
  // active,
  className,
}: {
  // active: boolean;
  className?: string;
}) => (
  <svg
    data-v-6f66631d=""
    className={className}
    width={16}
    height={16}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      data-v-6f66631d=""
      d="M10.75 13.25V22H13.25V13.25H22V10.75H13.25V2H10.75V10.75H2V13.25H10.75Z"
      fill="currentColor"
    ></path>
  </svg>
);
export const MenuIcon5 = ({
  // active,
  className,
}: {
  // active: boolean;
  className?: string;
}) => (
  <svg
    data-v-6f66631d=""
    className={className}
    width="17"
    height="16"
    viewBox="0 0 17 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      data-v-6f66631d=""
      d="M4.60026 7.99996C4.60026 8.73634 4.00331 9.33329 3.26693 9.33329C2.53055 9.33329 1.93359 8.73634 1.93359 7.99996C1.93359 7.26358 2.53055 6.66663 3.26693 6.66663C4.00331 6.66663 4.60026 7.26358 4.60026 7.99996Z"
      fill="currentColor"
    ></path>
    <path
      data-v-6f66631d=""
      d="M9.93359 7.99996C9.93359 8.73634 9.33664 9.33329 8.60026 9.33329C7.86388 9.33329 7.26693 8.73634 7.26693 7.99996C7.26693 7.26358 7.86388 6.66663 8.60026 6.66663C9.33664 6.66663 9.93359 7.26358 9.93359 7.99996Z"
      fill="currentColor"
    ></path>
    <path
      data-v-6f66631d=""
      d="M13.9336 9.33329C14.67 9.33329 15.2669 8.73634 15.2669 7.99996C15.2669 7.26358 14.67 6.66663 13.9336 6.66663C13.1972 6.66663 12.6003 7.26358 12.6003 7.99996C12.6003 8.73634 13.1972 9.33329 13.9336 9.33329Z"
      fill="currentColor"
    ></path>
  </svg>
);

export const PagesIcon = ({ active }: { active?: boolean }) => (
  <svg
    fill="none"
    width={18}
    height={18}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="m21 22h-18v-20h11c1.7 0 3 1.3 3 3v1h1c1.7 0 3 1.3 3 3v13z"
      className={active ? "fill-foreground" : "fill-muted-foreground "}
    ></path>
  </svg>
);

export const PalletIcon = ({ active }: { active?: boolean }) => (
  <svg
    fill="none"
    width={18}
    height={18}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#a)">
      <path
        d="M14.632 17.957c-.319-.762-.632-1.507-.632-2.108 0-1.711 1.582-1.475 3.339-1.212C19.533 14.963 22 15.332 22 12c0-5.514-4.486-10-10-10S2 6.486 2 12s4.486 10 10 10c4.326 0 3.456-2.078 2.632-4.044zM8.554 5.998a2 2 0 1 1 0 4 2 2 0 1 1 0-4zm8.793 2.573a2 2 0 0 0-4 0 2 2 0 1 0 4 0zm-8.61 4.792a2 2 0 1 1 0 4 2 2 0 1 1 0-4z"
        className={active ? "fill-foreground" : "fill-muted-foreground "}
        fillRule="evenodd"
      ></path>
    </g>
    <defs>
      <clipPath id="a">
        <path d="M0 0h24v24H0z" fill="#fff"></path>
      </clipPath>
    </defs>
  </svg>
);

export const SettingsIcon = ({ active }: { active?: boolean }) => (
  <svg
    fill="none"
    width={18}
    height={18}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#a)">
      <path
        d="M12 15.333c1.841 0 3.333-1.492 3.333-3.333S13.841 8.667 12 8.667 8.667 10.159 8.667 12s1.492 3.333 3.333 3.333zM12 .889l10 5.444v11.222l-10 5.556-10-5.444V6.444L12 .889z"
        className={active ? "fill-foreground" : "fill-muted-foreground "}
        fillRule="evenodd"
      ></path>
    </g>
    <defs>
      <clipPath id="a">
        <path d="M0 0h24v24H0z" fill="#fff"></path>
      </clipPath>
    </defs>
  </svg>
);

export const BrainCircuit = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="70"
      height="70"
      fill="none"
      viewBox="0 0 128 128"
      id="ai-chipset"
    >
      <path
        className="animate-pulse"
        strokeDasharray="50 50"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="6"
        d="M97 80.5V88C97 93.5228 92.5228 98 87 98H80M31 80.5V88C31 93.5228 35.4772 98 41 98H47.5M31 47V41C31 35.4772 35.4772 31 41 31H47.5M97 47V41C97 35.4772 92.5228 31 87 31H80M31 70.125V63.75 57.375M97 70.125V63.75 57.375M69.375 31H62.75 57.125M69.375 98H62.75 57.125M46 76L58.0844 52.2089C58.1495 52.0807 58.281 52 58.4248 52V52C58.5725 52 58.7069 52.0852 58.77 52.2187L70 76M52 70H63M81 76V52M97 80H104M48 98L48 106"
      ></path>
      <path
        className="animate-draw"
        strokeDasharray="16"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="6"
        d="M31 80H23"
      ></path>
      <path
        className="animate-draw"
        strokeDasharray="16"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="6"
        d="M48 31L48 23"
      ></path>
      <path
        className="animate-draw"
        strokeDasharray="16"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="6"
        d="M97 47H104"
      ></path>
      <path
        className="animate-draw"
        strokeDasharray="16"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="6"
        d="M80 98L80 106"
      ></path>
      <path
        className="animate-draw"
        strokeDasharray="16"
        fill="currentColor"
        d="M101 61H98V67H101V61zM112 67C113.657 67 115 65.6569 115 64 115 62.3431 113.657 61 112 61V67zM101 67H112V61H101V67zM66 101L66 98 60 98 60 101 66 101zM60 112C60 113.657 61.3431 115 63 115 64.6569 115 66 113.657 66 112L60 112zM60 101L60 112 66 112 66 101 60 101zM27 61H30V67H27V61zM16 67C14.3431 67 13 65.6569 13 64 13 62.3431 14.3431 61 16 61V67zM27 67H16V61H27V67zM66 26L66 29 60 29 60 26 66 26zM60 15C60 13.3431 61.3431 12 63 12 64.6569 12 66 13.3431 66 15L60 15zM60 26L60 15 66 15 66 26 60 26z"
      ></path>
      <path
        className="animate-draw"
        strokeDasharray="16"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="6"
        d="M31 47H23"
      ></path>
      <path
        className="animate-draw"
        strokeDasharray="16"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="6"
        d="M80 31L80 23"
      ></path>
    </svg>
  );
};

export const Stars = () => (
  <svg
    data-v-caa3228a=""
    width="15"
    height="14"
    viewBox="0 0 13 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      data-v-caa3228a=""
      d="M5.52865 1.91677C5.52865 1.91677 4.38656 4.98925 3.669 5.63505C2.95144 6.28086 0.570312 6.8751 0.570312 6.8751C0.570312 6.8751 2.95144 7.46934 3.669 8.11515C4.38656 8.76095 5.52865 11.8334 5.52865 11.8334C5.52865 11.8334 6.67073 8.76107 7.38829 8.11515C8.10585 7.46934 10.487 6.8751 10.487 6.8751C10.487 6.8751 8.10585 6.28086 7.38829 5.63505C6.67073 4.98925 5.52865 1.91677 5.52865 1.91677Z"
      className="fill-background"
    ></path>
    <path
      data-v-caa3228a=""
      d="M9.90363 0.166748C9.90363 0.166748 9.36617 1.61262 9.0285 1.91653C8.69082 2.22044 7.57029 2.50008 7.57029 2.50008C7.57029 2.50008 8.69082 2.77972 9.0285 3.08363C9.36617 3.38754 9.90363 4.83341 9.90363 4.83341C9.90363 4.83341 10.4411 3.3876 10.7788 3.08363C11.1164 2.77972 12.237 2.50008 12.237 2.50008C12.237 2.50008 11.1164 2.22044 10.7788 1.91653C10.4411 1.61262 9.90363 0.166748 9.90363 0.166748Z"
      className="fill-background"
    ></path>
  </svg>
);

export const HomeIcon = () => (
  <svg
    data-v-8dcba7c4=""
    width="24"
    height="25"
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      data-v-8dcba7c4=""
      d="M3 9L12 2L21 9V22H3V9Z"
      fill="currentColor"
    ></path>
  </svg>
);

export const TemplatesIcon = () => (
  <svg
    data-v-8dcba7c4=""
    width="24"
    height="25"
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g data-v-8dcba7c4="" clipPath="url(#a)" fill="currentColor">
      <path data-v-8dcba7c4="" d="M8 4H16V2H8V4Z"></path>
      <path data-v-8dcba7c4="" d="M5 8H19V6H5V8Z"></path>
      <path data-v-8dcba7c4="" d="m3 10v12h18v-12h-18z"></path>
    </g>
    <defs data-v-8dcba7c4="">
      <clipPath data-v-8dcba7c4="" id="a">
        <rect data-v-8dcba7c4="" width="24" height="24" fill="#fff"></rect>
      </clipPath>
    </defs>
  </svg>
);

export const MoveForward = () => (
  <svg
    viewBox="0 0 20 20"
    focusable="false"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    height={20}
    width={20}
  >
    <g clipPath="url(#clip0_9185_51110)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.89062 12.6445V13.5348H6.64062H7.39062V12.6445H5.89062ZM12.5898 7.39258H13.5151V6.64258V5.89258H12.5898V7.39258ZM5.89062 15.5917H6.64062H7.39062V16.6201C7.39062 17.1724 7.83834 17.6201 8.39062 17.6201H9.41553V18.3701V19.1201H8.39062C7.00991 19.1201 5.89062 18.0008 5.89062 16.6201V15.5917ZM11.4653 18.3701V17.6201H13.5151V18.3701V19.1201H11.4653V18.3701ZM15.5649 18.3701V17.6201H16.5898C17.1421 17.6201 17.5898 17.1724 17.5898 16.6201V15.5917H18.3398H19.0898V16.6201C19.0898 18.0008 17.9706 19.1201 16.5898 19.1201H15.5649V18.3701ZM18.3398 13.5348H17.5898V11.4779H18.3398H19.0898V13.5348H18.3398ZM18.3398 9.42102H17.5898V8.39258C17.5898 7.84029 17.1421 7.39258 16.5898 7.39258H15.5649V6.64258V5.89258H16.5898C17.9706 5.89258 19.0898 7.01187 19.0898 8.39258V9.42102H18.3398Z"
        className="fill-secondary"
      ></path>
      <rect
        x="1.64062"
        y="1.66699"
        width="11.6992"
        height="11.7275"
        rx="1.75"
        className="stroke-primary-foreground"
        strokeWidth="1.5"
      ></rect>
    </g>
    <defs>
      <clipPath id="clip0_9185_51110">
        <rect width="20" height="20" fill="white"></rect>
      </clipPath>
    </defs>
  </svg>
);

export const MoveBackward = () => (
  <svg
    viewBox="0 0 20 20"
    focusable="false"
    xmlns="http://www.w3.org/2000/svg"
    height={20}
    width={20}
    fill="none"
  >
    <g clipPath="url(#clip0_9185_51118)">
      <rect
        x="1.64844"
        y="1.64844"
        width="11.6992"
        height="11.7275"
        rx="1.75"
        className="stroke-secondary"
        strokeWidth="1.5"
        strokeDasharray="3 3 3 3"
      ></rect>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.89844 15.0322V16.6016C5.89844 17.9823 7.01773 19.1016 8.39844 19.1016H16.5977C17.9784 19.1016 19.0977 17.9823 19.0977 16.6016V8.37402C19.0977 6.99331 17.9784 5.87402 16.5977 5.87402H15.0215V7.37402H16.5977C17.1499 7.37402 17.5977 7.82174 17.5977 8.37402V16.6016C17.5977 17.1538 17.1499 17.6016 16.5977 17.6016H8.39844C7.84615 17.6016 7.39844 17.1538 7.39844 16.6016V15.0322H5.89844Z"
        className="fill-primary-foreground"
      ></path>
    </g>
    <defs>
      <clipPath id="clip0_9185_51118">
        <rect width="20" height="20" fill="white"></rect>
      </clipPath>
    </defs>
  </svg>
);

export const BorderLocked = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24" color="">
    <path d="M7,13 L16,13 L16,12 L7,12 L7,13 Z M16,9 L14.5,9 C13.516,9 12.562,9.818 12,11.002 L13,10.999 C13.457,10.393 13.685,10 14.5,10 L16,10 C17.379,10 18,11.121 18,12.5 C18,13.879 17.379,15 16,15 L14.5,15 C13.685,15 13.457,14.608 13,14.002 L12,14 C12.562,15.184 13.547,16 14.5,16 L16,16 C17.934,16 19,14.433 19,12.5 C19,10.567 17.934,9 16,9 L16,9 Z M8.5,15 L7,15 C5.621,15 5,13.879 5,12.5 C5,11.121 5.621,10 7,10 L8.5,10 C9.315,10 9.543,10.393 10,10.999 L11,11.002 C10.438,9.818 9.531,9 8.5,9 L7,9 C5.066,9 4,10.567 4,12.5 C4,14.433 5.066,16 7,16 L8.5,16 C9.547,16 10.438,15.184 11,14 L10,14.002 C9.543,14.608 9.315,15 8.5,15 L8.5,15 Z"></path>
  </svg>
);

export const BorderUnlocked = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24" color="">
    <path d="M16,9 L15,9 L15,10 L16,10 C17.379,10 18,11.121 18,12.5 C18,13.879 17.379,15 16,15 L15,15 L15,16 L16,16 C17.934,16 19,14.433 19,12.5 C19,10.567 17.934,9 16,9 L16,9 Z M12,9.099 L12,6 L11,6 L11,9.099 L9.416,6.723 L8.584,7.139 L10.584,10 L12.416,10 L14.416,7.139 L13.584,6.653 L12,9.099 Z M4,12.5 C4,14.433 5.066,16 7,16 L8,16 L8,15 L7,15 C5.621,15 5,13.879 5,12.5 C5,11.121 5.621,10 7,10 L8,10 L8,9 L7,9 C5.066,9 4,10.567 4,12.5 L4,12.5 Z M10.584,15 L8.584,17.861 L9.416,18.347 L11,15.901 L11,19 L12,19 L12,15.901 L13.584,18.277 L14.416,17.861 L12.416,15 L10.584,15 Z"></path>
  </svg>
);
