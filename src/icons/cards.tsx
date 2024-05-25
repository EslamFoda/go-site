export const FirstDesign = ({ active }: { active: boolean }) => {
  return (
    <svg
      width="50"
      height="50"
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      data-v-00c72fd8=""
      className={`${active ? "fill-primary" : "fill-muted"}`}
    >
      <path
        d="M50.124 0.154297H0.124023V24.1543H50.124V0.154297Z"
        data-v-00c72fd8=""
      ></path>
      <path
        d="M50.1241 33.1543L0.124077 33.1543V34.1543L50.1241 34.1543V33.1543Z"
        data-v-00c72fd8=""
      ></path>
      <path
        d="M50.1241 41.1543L0.124123 41.1543L0.124123 42.1543L50.1241 42.1543V41.1543Z"
        data-v-00c72fd8=""
      ></path>
      <path
        d="M0.124352 49.1543L50.1244 49.1543V50.1543L0.124352 50.1543L0.124352 49.1543Z"
        data-v-00c72fd8=""
      ></path>
    </svg>
  );
};

export const SecDesign = ({ active }: { active: boolean }) => {
  return (
    <svg
      data-v-00c72fd8=""
      width="51"
      height="51"
      viewBox="0 0 51 51"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${active ? "fill-primary" : "fill-muted"}`}
    >
      <path
        data-v-00c72fd8=""
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M0.152344 0.137695H50.1523V50.1377H0.152344V0.137695ZM7.15234 33.1377H43.1523V43.1377H7.15234V33.1377ZM11.6523 37.6377L38.6523 37.6377V38.6377L11.6523 38.6377V37.6377Z"
      ></path>
    </svg>
  );
};
