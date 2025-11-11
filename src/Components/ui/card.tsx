import styled from "styled-components";

export const StyledCard = styled.div`
  border-radius: var(--radius);
  border: 1px solid hsl(var(--border));
  background: hsl(var(--card));
  color: hsl(var(--card-foreground));
  box-shadow: 0 1px 2px 0 hsl(var(--foreground) / 0.06);
`;

export const StyledCardHeader = styled.div`
  display: flex;
  flex-direction: 3, column;
  gap: 0.1rem; /* space-y-1.5 */
  padding: 1.0rem; /* p-6 */
`;

export const StyledCardTitle = styled.h3`
  font-size: 1.5rem; /* text-2xl */
  font-weight: 600; /* font-semibold */
  line-height: 1; /* leading-none */
  letter-spacing: -0.01em; /* tracking-tight (approx) */
`;

export const StyledCardDescription = styled.p`
  font-size: 0.875rem; /* text-sm */
  color: hsl(var(--muted-foreground));
`;

export const StyledCardContent = styled.div`
  padding: 0 1.5rem 1.5rem 1.5rem; /* pt-0 p-6 */
`;

export const StyledCardFooter = styled.div`
  display: flex;
  align-items: center;
  padding: 0 1.5rem 1.5rem 1.5rem; /* pt-0 p-6 */
`;
