import { cn } from "@/lib/utils";

type AdPlaceholderProps = {
  width: number;
  height: number;
  title?: string;
  className?: string;
};

export function AdPlaceholder({
  width,
  height,
  title,
  className,
}: AdPlaceholderProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center bg-muted/50 border-2 border-dashed border-muted-foreground/30 rounded-lg text-muted-foreground",
        className
      )}
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      <div className="text-center">
        <p className="font-semibold">{title || `Ad Placeholder`}</p>
        <p className="text-sm">
          {width} x {height}
        </p>
      </div>
    </div>
  );
}
