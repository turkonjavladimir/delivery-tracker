export const CardSkeleton = () => {
  return (
    <div className="flex animate-pulse flex-row gap-3 rounded-md bg-white p-3 shadow-sm">
      <div>
        <div className="h-14 w-14 rounded bg-slate-200"></div>
      </div>
      <div className="flex w-full flex-col justify-between">
        <div className="h-3 w-full rounded bg-slate-200"></div>
        <div className="h-3 w-full rounded bg-slate-200"></div>
        <div className="h-3 w-full rounded bg-slate-200"></div>
      </div>
    </div>
  );
};
