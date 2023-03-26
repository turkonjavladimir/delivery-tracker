export const TrackingCardSkeleton = () => {
  return (
    <div className="flex animate-pulse flex-col gap-3 rounded-md bg-white p-4 shadow-sm">
      <div className="flex w-full justify-between">
        <div className="flex flex-col justify-between gap-1">
          <div className="h-3 w-48 rounded bg-slate-200"></div>
          <div className="h-4 w-48 rounded bg-slate-200"></div>
        </div>
        <div className="h-[36px] w-16 rounded bg-slate-200"></div>
      </div>
      <div className="h-20 w-full rounded bg-slate-200"></div>
    </div>
  );
};
