import React from "react";
import styled, { css } from "styled-components";

type Variant = "default" | "secondary" | "destructive" | "success" | "muted" | "outline";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: Variant;
  className?: string;
}

const variantStyles: Record<Variant, ReturnType<typeof css>> = {
  default: css`
    background: hsl(var(--primary));
    color: hsl(var(--primary-foreground));
    border: 1px solid transparent;
  `,
  secondary: css`
    background: hsl(var(--secondary));
    color: hsl(var(--secondary-foreground));
    border: 1px solid transparent;
  `,
  destructive: css`
    background: hsl(var(--destructive));
    color: hsl(var(--destructive-foreground));
    border: 1px solid transparent;
  `,
  success: css`
    background: hsl(var(--success));
    color: hsl(var(--success-foreground));
    border: 1px solid transparent;
  `,
  muted: css`
    background: hsl(var(--muted));
    color: hsl(var(--muted-foreground));
    border: 1px solid transparent;
  `,
  outline: css`
    background: transparent;
    color: hsl(var(--foreground));
    border: 1px solid hsl(var(--border));
  `,
};

const Base = styled.span<{ $variant: Variant }>`
  display: inline-flex;
  align-items: center;
  margin-left: 5rem;
  gap: 0.375rem;
  padding: 0.25rem 0.6rem;
  border-radius: 9999px;
  height: 1.5rem;
  width:6rem;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 600;
  line-height: 1;
  letter-spacing: 0.01em;
  user-select: none;
  ${(p) => variantStyles[p.$variant]}

  /* small fallback if CSS variables aren't present, using theme values when provided */
  ${(p) =>
    !p.theme && css``}
`;

/**
 * Badge component
 * Uso: <Badge variant="destructive">Ausente</Badge>
 * Mantém suporte a className para ajustes de layout (ex: className="ml-2")
 */
export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = "default", children, className, ...rest }, ref) => {
    return (
      <Base ref={ref} className={className} $variant={variant} {...rest}>
        {children}
      </Base>
    );
  }
);
Badge.displayName = "Badge";

export default Badge;