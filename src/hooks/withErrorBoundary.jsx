import ErrorBoundary from "@/components/shared/ErrorBoundary";

export const withErrorBoundary = (Component, fallback) => (props) =>
  (
    <ErrorBoundary fallback={fallback}>
      <Component {...props} />
    </ErrorBoundary>
  );