import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap:1.5rem;
  padding: 0 4rem;
  padding-top: 2rem;
  margin:1.5rem;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
`;

export const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  
  svg {
    width: 2rem;
    height: 2rem;
    color: hsl(var(--primary));
  }
`;

export const Title = styled.h1`
  font-size: 1.875rem;
  font-weight: bold;
  color: hsl(var(--foreground));
`;

export const MonthTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: hsl(var(--foreground));
`;

export const MonthNavigation = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.5rem;

  @media (max-width: 768px) {
    gap: 0.25rem;
  }
`;

export const DayName = styled.div`
  font-weight: 600;
  text-align: center;
  padding: 0.5rem;
  color: hsl(var(--muted-foreground));
  font-size: 0.875rem;
`;

export const EmptyDay = styled.div`
  aspect-ratio: 1;
`;

export const CalendarDay = styled.div<{ $isToday: boolean }>`
  aspect-ratio: 1;
  border: 1px solid hsl(var(--border));
  border-radius: 0.5rem;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  transition: all 0.2s;
  
  ${props => props.$isToday && `
    background: hsl(var(--primary) / 0.1);
    border-color: hsl(var(--primary));
  `}

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    padding: 0.25rem;
  }
`;

export const DayNumber = styled.div`
  font-weight: 600;
  color: hsl(var(--foreground));
  font-size: 0.875rem;
`;

export const AppointmentBadge = styled.div`
  background: hsl(var(--accent));
  color: hsl(var(--accent-foreground));
  font-size: 0.625rem;
  padding: 0.125rem 0.25rem;
  border-radius: 0.25rem;
  text-align: center;
  font-weight: 500;
  margin-top: auto;

  @media (max-width: 768px) {
    font-size: 0.5rem;
  }
`;
