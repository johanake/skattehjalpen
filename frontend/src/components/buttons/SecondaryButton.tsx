import React from "react";
import BaseButton from "./BaseButton";

interface SecondaryButton
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: () => void;
  size?: "sm" | "md" | "lg";
}

export const SecondaryButton: React.FC<SecondaryButton> = ({
  onClick,
  children,
  size,
}) => {
  return (
    <BaseButton variant="secondary" size={size} onClick={onClick}>
      {children}
    </BaseButton>
  );
};
