import React from 'react';

type LoadingButtonProps = {
  loading: boolean; // Indicates whether the button is in a loading state
  children: React.ReactNode; // The text or content inside the button
  className?: string; // Optional additional styles for the button
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const LoadingButton: React.FC<LoadingButtonProps> = ({
  loading,
  children,
  className = '',
  ...props
}) => {
  return (
    <button
      type="submit"
      disabled={loading} // Disable the button when loading
      className={`flex items-center justify-center gap-2 rounded-md px-4 py-2 text-white font-medium 
        ${loading ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-500'} 
        ${className}`}
      {...props} // Spread other button props
    >
      {loading && (
        <div className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4"></div>
      )}
      {children}
    </button>
  );
};

export default LoadingButton;
