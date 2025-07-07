import React from "react";
import classNames from "classnames";

type ButtonProps = {
  onClick?: () => void;
  disabled?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
};

export const Button = ({
  onClick,
  disabled = false,
  icon,
  children,
  className = "",
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={classNames(
        "flex items-center justify-center gap-x-2 px-6 py-3 rounded-lg font-semibold",
        {
          "bg-[#4F46E5] text-white hover:bg-[#4F46E5]/80": !disabled,
          "bg-gray-400 text-gray-200 cursor-not-allowed": disabled,
        },
        "disabled:opacity-50",
        className
      )}
    >
      {icon && <span className="w-6 h-6">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};
