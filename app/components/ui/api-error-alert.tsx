import { AlertCircle, RefreshCw } from "lucide-react";
import { ApiError } from "~/lib/api";

interface ApiErrorAlertProps {
  error: Error | null;
  onRetry?: () => void;
  className?: string;
}

export function ApiErrorAlert({ error, onRetry, className = "" }: ApiErrorAlertProps) {
  if (!error) return null;

  const isAuthError = error instanceof ApiError && error.isAuthError;

  const getMessage = () => {
    if (isAuthError) {
      return "Unable to retrieve data at this time. Your session may have expired. Please try again or refresh the page.";
    }
    return error.message || "An unexpected error occurred while loading data. Please try again.";
  };

  return (
    <div
      className={`flex items-start gap-3 p-4 mb-4 text-sm rounded-lg border ${
        isAuthError
          ? "text-amber-800 bg-amber-50 border-amber-200"
          : "text-red-800 bg-red-50 border-red-200"
      } ${className}`}
      role="alert"
    >
      <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
      <div className="flex-1">
        <p className="font-medium">
          {isAuthError ? "Data Unavailable" : "Error Loading Data"}
        </p>
        <p className="mt-1 text-sm opacity-90">{getMessage()}</p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
            isAuthError
              ? "bg-amber-100 hover:bg-amber-200 text-amber-800"
              : "bg-red-100 hover:bg-red-200 text-red-800"
          }`}
        >
          <RefreshCw className="h-4 w-4" />
          Retry
        </button>
      )}
    </div>
  );
}
