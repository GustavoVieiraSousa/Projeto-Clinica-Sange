import styled from "styled-components";

export const Content = styled.div`
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const SectionTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: hsl(var(--foreground));
`;

export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const InfoItem = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
`;

export const InfoLabel = styled.p`
  font-size: 0.75rem;
  font-weight: 500;
  color: hsl(var(--muted-foreground));
  text-transform: uppercase;
`;

export const InfoValue = styled.p`
  font-size: 0.875rem;
  color: hsl(var(--foreground));
  margin-top: 0.125rem;
`;

export const ObservationsText = styled.p`
  font-size: 0.875rem;
  color: hsl(var(--foreground));
  line-height: 1.6;
  padding: 1rem;
  background: hsl(var(--muted));
  border-radius: 0.5rem;
`;

export const ProblemCard = styled.div`
  padding: 1rem;
  border: 1px solid hsl(var(--border));
  border-radius: 0.5rem;
  background: hsl(var(--card));
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const ProblemTitle = styled.h4`
  font-size: 0.875rem;
  font-weight: 600;
  color: hsl(var(--foreground));
`;

export const ProblemDescription = styled.p`
  font-size: 0.875rem;
  color: hsl(var(--muted-foreground));
  line-height: 1.5;
`;

export const SeverityBadge = styled.span<{ $severity: "low" | "medium" | "high" }>`
  display: inline-block;
  width: fit-content;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  
  ${props => {
    switch (props.$severity) {
      case "low":
        return `
          background: hsl(84 81% 44% / 0.1);
          color: hsl(84 81% 44%);
        `;
      case "medium":
        return `
          background: hsl(43 96% 56% / 0.1);
          color: hsl(43 96% 56%);
        `;
      case "high":
        return `
          background: hsl(0 84% 60% / 0.1);
          color: hsl(0 84% 60%);
        `;
    }
  }}
`;

export const StyledDialogContent = styled.div`
  > div {
    max-width: 48rem;
    max-height: 90vh;
    overflow-y: auto;
  }
`;

export const StyledDialogTitle = styled.div`
  h2 {
    font-size: 1.5rem;
    font-weight: bold;
    color: hsl(var(--primary));
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  
  button {
    width: 100%;
    
    svg {
      margin-right: 0.5rem;
      width: 1rem;
      height: 1rem;
    }
  }
`;