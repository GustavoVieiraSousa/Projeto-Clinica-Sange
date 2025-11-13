import * as React from "react";
import styled from "styled-components";

const StyledInput = styled.input`
  display: flex;
  height: 2.5rem;
  width: 100%;
  border-radius: 0.375rem;
  border: 3px solid hsl(var(--input));
  background: hsl(var(--background));
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  transition: colors 0.2s;

  &::placeholder {
    color: hsl(var(--muted-foreground));
  }
   &:hover {
    border-color: hsl(var(--foreground)/0.3);
  }
  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px hsl(var(--ring)), 0 0 0 4px hsl(var(--background));
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &[type="file"] {
    border: 0;
    background: transparent;
    font-size: 0.875rem;
    font-weight: 500;
    color: hsl(var(--foreground));
  }

  @media (min-width: 768px) {
    font-size: 0.875rem;
  }
`;

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return <StyledInput type={type} className={className} ref={ref} {...props} />;
  },
);
Input.displayName = "Input";

export { Input };