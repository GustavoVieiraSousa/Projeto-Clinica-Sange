import * as React from "react";
import styled from "styled-components";

const StyledTextarea = styled.textarea`
  display: flex;
  min-height: 5rem;
  width: 100%;
  border-radius: 0.375rem;
  border: 1px solid hsl(var(--input));
  background: hsl(var(--background));
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  transition: colors 0.2s;

  &::placeholder {
    color: hsl(var(--muted-foreground));
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px hsl(var(--ring)), 0 0 0 4px hsl(var(--background));
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;



const Textarea = React.forwardRef<HTMLTextAreaElement,React.ComponentProps<"textarea">>(({ className, ...props }, ref) => {
  return <StyledTextarea className={className} ref={ref} {...props} />;
});
Textarea.displayName = "Textarea";

export { Textarea };

