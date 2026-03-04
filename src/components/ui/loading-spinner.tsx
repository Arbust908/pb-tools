export const LoadingSpinner = ({
  className,
  size = "default",
}: {
  className?: string;
  size?: "sm" | "default" | "lg";
}) => {
  const sizeClasses = {
    sm: "w-4 h-4 border-2",
    default: "w-8 h-8 border-4",
    lg: "w-12 h-12 border-4",
  };

  return (
    <div
      className={`${sizeClasses[size]} border-blue-500 border-t-transparent rounded-full animate-spin ${className || ""}`}
    />
  );
};
