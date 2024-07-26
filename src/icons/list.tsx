export const FirstDesign = ({ active }: { active: boolean }) => {
  return (
    <svg
      viewBox="0 0 51 25"
      xmlns="http://www.w3.org/2000/svg"
      data-v-b69aee76=""
      width="50"
      height="50"
      className={active ? "fill-primary" : "fill-muted"}
    >
      <path d="m24.695 0.87891h-24v24h24v-24z" data-v-b69aee76=""></path>
      <path d="m50.695 2.3788h-20v1h20v-1z" data-v-b69aee76=""></path>
      <path d="m50.695 12.379h-20v1h20v-1z" data-v-b69aee76=""></path>
      <path d="m30.695 22.379h20v1h-20v-1z" data-v-b69aee76=""></path>
    </svg>
  );
};

export const SecDesign = ({ active }: { active: boolean }) => {
  return (
    <svg
      width="50"
      height="50"
      viewBox="0 0 51 25"
      xmlns="http://www.w3.org/2000/svg"
      data-v-b69aee76=""
      className={active ? "fill-primary" : "fill-muted"}
    >
      <path d="m50.443 0.67969h-24v24h24v-24z" data-v-b69aee76=""></path>
      <path d="m20.443 2.1797h-20v1h20v-1z" data-v-b69aee76=""></path>
      <path d="m0.44336 12.18h20v1h-20v-1z" data-v-b69aee76=""></path>
      <path d="m20.443 22.18h-20v1h20v-1z" data-v-b69aee76=""></path>
    </svg>
  );
};
