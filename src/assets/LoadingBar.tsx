const LoadingBar = () => {
  return (
    <div className="relative w-full h-2 bg-[#4F46E5] overflow-hidden rounded">
      <div className="absolute inset-0 w-full h-full animate-[loading_1.5s_linear_infinite] bg-gradient-to-r from-[#4338CA] via-[#FFFFFF] to-[#4F46E5] opacity-70"></div>
      <style>
        {`
          @keyframes loading {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
        `}
      </style>
    </div>
  );
};

export default LoadingBar;
