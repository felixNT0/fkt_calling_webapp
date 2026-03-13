"use client";
function LoadingCircle() {
  return (
    <svg
      className="animate-spin h-5 w-5 mr-3 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.89 3.188 8.062l2.01-2.01zM12 20a8 8 0 100-16 8 8 0 000 16zm8.812-2.878A7.962 7.962 0 0020 12h-4c0 3.042 1.135 5.89 3.188 8.062l2.01-2.01z"
      ></path>
    </svg>
  );
}

export default LoadingCircle;
