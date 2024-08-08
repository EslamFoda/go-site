import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function ControlBtn({
  icon,
  tooltipContent,
  onClick,
  disabled,
}: {
  icon: React.ReactNode;
  tooltipContent: string;
  onClick: () => void;
  disabled: boolean;
}) {
  if (disabled) return null;

  return (
    <div>
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger
            className="flex items-center justify-center h-[30px] w-[30px] hover:bg-muted"
            onClick={onClick}
          >
            {icon}
          </TooltipTrigger>
          <TooltipContent>
            {tooltipContent}
            <TooltipArrow className="fill-muted" />
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
