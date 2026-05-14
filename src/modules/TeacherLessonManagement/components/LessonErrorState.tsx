import { Trans } from "@lingui/macro";

import { DashboardErrorState } from "@/components/Dashboard";

export default function LessonErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <DashboardErrorState
      title={<Trans>Lessons could not be loaded</Trans>}
      description={<Trans>Please try again later.</Trans>}
      onRetry={onRetry}
    />
  );
}
