import styled from "styled-components";

const getSeverityColor = (severity?: "low" | "medium" | "high") => {
  switch (severity) {
    case "low":
      return "hsl(84 81% 44%)"; // accent (yellow-green)
    case "medium":
      return "hsl(43 96% 56%)"; // orange
    case "high":
      return "hsl(0 84% 60%)"; // destructive (red)
    default:
      return "hsl(var(--muted))";
  }
};

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1rem;
  background: hsl(var(--card));
  border-radius: 0.5rem;
  border: 1px solid hsl(var(--border));
`;

export const DiagramWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  max-width: 300px;
  margin: 0 auto;
`;

export const BodyPart = styled.div<{ $severity?: "low" | "medium" | "high"; $position: "upper" | "lower" }>`
  width: 100%;
  height: 120px;
  border: 2px solid ${props => getSeverityColor(props.$severity)};
  background: ${props => props.$severity ? `${getSeverityColor(props.$severity)}15` : "hsl(var(--muted))"};
  border-radius: ${props => props.$position === "upper" ? "50% 50% 20% 20%" : "20% 20% 50% 50%"};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  position: relative;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 4px 12px ${props => getSeverityColor(props.$severity)}40;
  }
`;

export const BackPart = styled.div<{ $severity?: "low" | "medium" | "high" }>`
  width: 80%;
  height: 100px;
  border: 2px solid ${props => getSeverityColor(props.$severity)};
  background: ${props => props.$severity ? `${getSeverityColor(props.$severity)}15` : "hsl(var(--muted))"};
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  position: relative;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 4px 12px ${props => getSeverityColor(props.$severity)}40;
  }
`;

export const PartLabel = styled.span`
  font-weight: 600;
  font-size: 0.875rem;
  color: hsl(var(--foreground));
`;

export const Legend = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`;

export const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: hsl(var(--foreground));
`;

export const LegendColor = styled.div<{ $severity: "low" | "medium" | "high" }>`
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 0.25rem;
  background: ${props => getSeverityColor(props.$severity)};
  border: 1px solid ${props => getSeverityColor(props.$severity)};
`;
