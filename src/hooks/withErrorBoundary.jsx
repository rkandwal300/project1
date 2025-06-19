import ErrorBoundary from "@/features/ErrorBoundary";

export const withErrorBoundary = (Component, fallback) => (props) =>
  (
    <ErrorBoundary fallback={fallback}>
      <Component {...props} />
    </ErrorBoundary>
  );