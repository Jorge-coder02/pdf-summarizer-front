const LoadingDots = () => {
  return (
    <div className="flex items-center space-x-1 h-8">
      <div className="w-2.5 h-2.5 bg-[#4F46E5] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="w-2.5 h-2.5 bg-[#4F46E5] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="w-2.5 h-2.5 bg-[#4F46E5] rounded-full animate-bounce"></div>
    </div>
  );
};
export default LoadingDots;
