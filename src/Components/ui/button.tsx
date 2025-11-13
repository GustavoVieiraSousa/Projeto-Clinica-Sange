import React from "react";
import styled, { css } from "styled-components";
import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    primary?: string;
    "primary-foreground"?: string;
    secondary?: string;
    "secondary-foreground"?: string;
    destructive?: string;
    "destructive-foreground"?: string;
    foreground?: string;
    border?: string;
    popover?: string;
  }
}

type Variant = "default" | "secondary" | "destructive" | "outline";
type Size = "default" | "sm" | "lg" | "icon";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  children?: React.ReactNode;
}

const sizeStyles = {
  default: css`
    height: 40px;
    padding: 0 14px;
    font-size: 14px;
    width: 47%;
    flex: 0 0 auto;
    margin-left: 14px;
    align-content: center;
     justify-content: center;
  `,
  sm: css`
    height: 32px;
    padding: 0 10px;
    font-size: 13px;
  `,
  lg: css`
    height: 48px;
    padding: 0 18px;
    font-size: 16px;
  `,
  icon: css`
    height: 2.5rem;
    width: 2.5rem;
    flex: auto 0 auto;
    justify-content: center;
  `,
};

const variantStyles = {
  default: css`
    background: hsl(var(--success));
    color: ${(p) => p.theme["primary-foreground"] ?? "#fff"};
    border: 1px solid transparent;

    &:hover:not(:disabled) {
      filter: brightness(0.95);
    }
  `,
  secondary: css`
    background: hsl(var(--secondary));
    color:hsl(var(--secondary-foreground));
    border: 1px solid transparent;

    &:hover:not(:disabled) {
      filter: brightness(0.70);
    }
  `,
  destructive: css`
    background: ${(p) => p.theme.destructive ?? "#ef4444"};
    color: ${(p) => p.theme["destructive-foreground"] ?? "#fff"};
    border: 1px solid transparent;

    &:hover:not(:disabled) {
      filter: brightness(0.70);
    }
  `,
  outline: css`
    background: hsl(var(--background));
    color: ${(p) => p.theme.foreground ?? "hsl(var(--foreground))"};
    border: 1px solid ${(p) => p.theme.border ?? "rgba(0,0,0,0.08)"};

    &:hover:not(:disabled) {
      background: hsl(var(--success));
    }
  `,
};

const Base = styled.button<{ $variant: Variant; $size: Size }>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border-radius: 8px;
  font-weight: 600;
  line-height: 1;
  cursor: pointer;
  transition: all 0.12s ease;
  user-select: none;

  ${(p) => sizeStyles[p.$size]}
  ${(p) => variantStyles[p.$variant]}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
    filter: none;
  }

 
`;


export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "default", size = "default", children, className, ...rest }, ref) => {
    return (
      <Base
        ref={ref}
        className={className}
        $variant={variant}
        $size={size}
        {...rest}
      >
        {children}
      </Base>
    );
  }
);
Button.displayName = "Button";

export default Button;
