export default function MeetingSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 h-[320px] animate-pulse">
          <div className="flex justify-between items-start mb-6">
            <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-xl" />
            <div className="w-6 h-6 bg-slate-100 dark:bg-slate-800 rounded-lg" />
          </div>
          <div className="h-6 bg-slate-100 dark:bg-slate-800 rounded-lg w-3/4 mb-4" />
          <div className="space-y-2 mb-8">
            <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded-lg w-full" />
            <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded-lg w-5/6" />
          </div>
          <div className="space-y-3 pt-4 border-t border-slate-50 dark:border-slate-800/50">
            <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded-lg w-1/2" />
            <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded-lg w-1/3" />
          </div>
        </div>
      ))}
    </div>
  );
}
