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

export const PatientDetails = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

export const TimePill = styled.div`
  background: hsl(var(--primary)/10%); /* fallback azul claro */
  color: hsl(262 83% 58%);
  border-radius: 0.5rem;
  padding: 0.5rem 0.75rem;
  font-size:1.25rem;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 3.25rem;
`;

export const PatientRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const ContentWrapper = styled.div`
width: 100%;
flex-direction: row;
display: flex;
align-items: center;
justify-content: space-between;
padding-left: 1.25rem;
padding-right: 1.25rem;

gap: 1rem;

`
