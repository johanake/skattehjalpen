import React from "react";
import BaseButton from "./BaseButton";

interface PrimaryButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: () => void;
  size?: "sm" | "md" | "lg";
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  onClick,
  children,
  size,
}) => {
  return (
    <BaseButton variant="primary" onClick={onClick} size={size}>
      {children}
    </BaseButton>
  );
};
