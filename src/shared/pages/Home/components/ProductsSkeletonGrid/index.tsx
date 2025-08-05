import clsx from "clsx";

interface ProductsSkeletonGridProps {
  className?: string;
  count?: number;
  width?: string | number;
  height?: string | number;
}

export function ProductsSkeletonGrid({
  className,
  count = 4,
  width = "100%",
  height = "10rem",
}: ProductsSkeletonGridProps) {
  return (
    <div
      className={clsx("animate-pulse", className)}
      data-testid="skeleton-container"
    >
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          role="presentation"
          className="rounded-xl border bg-white p-6 shadow-sm flex flex-col gap-4"
        >
          <div
            className="rounded-lg bg-gray-200"
            data-testid="skeleton-image"
            style={{
              width: typeof width === "number" ? `${width}px` : width,
              height: typeof height === "number" ? `${height}px` : height,
            }}
          />

          <div className="h-6 bg-gray-200 rounded w-3/4" />

          <div className="h-6 bg-gray-200 rounded w-1/2" />

          <div className="flex items-center justify-between mt-2">
            <div className="h-5 bg-gray-200 rounded-full w-16" />
            <div className="flex gap-2">
              <div className="h-8 w-8 bg-gray-200 rounded" />
              <div className="h-8 w-8 bg-gray-200 rounded" />
            </div>
          </div>

          <div className="h-10 bg-gray-200 rounded w-full mt-2" />
        </div>
      ))}
    </div>
  );
}
