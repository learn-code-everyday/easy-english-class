import Image from "next/image";

type PageLoadingProps = {
  isLoading?: boolean;
};

const PageLoading = ({ isLoading = true }: PageLoadingProps) => {
  if (isLoading) {
    return (
      <div className="relative" aria-busy="true">
        {/* Content wrapper */}
        <div className={isLoading ? "pointer-events-none blur-sm" : ""}>
          {/* Your page content goes here */}
        </div>

        {/* Loading screen */}
        {isLoading && (
          <div
            className="fixed inset-0 z-[2000] flex items-center justify-center bg-slate-950/20 backdrop-blur-sm"
            role="status"
            aria-live="polite"
          >
            <div className="rounded-3xl border border-white/70 bg-white/90 p-6 shadow-2xl">
              <Image
                src="/images/english/loading.svg"
                alt="loading"
                width={128}
                height={128}
                priority
                fetchPriority="high"
                className="size-32"
              />
            </div>
          </div>
        )}
      </div>
    );
  } else {
    return <></>;
  }
};

export default PageLoading;
