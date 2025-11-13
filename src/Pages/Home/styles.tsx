import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 0 4rem;
  padding-top: 2rem;
  background: hsl(var(--background));
`

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Title = styled.h1`
  font-size: 1.875rem;
  font-weight: bold;
  color: hsl(var(--foreground));
  margin-bottom: 0.5rem;
`;

export const Subtitle = styled.p`
  color: hsl(var(--muted-foreground));
`;

export const FilterContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

export const FilterButton = styled.button<{ $active: boolean }>`
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s;
  border: 1px solid hsl(var(--border));
  
  ${props => props.$active ? `
    background: hsl(var(--primary));
    color: hsl(var(--primary-foreground));
    border-color: hsl(var(--primary));
  ` : `
    background: hsl(var(--background));
    color: hsl(var(--foreground));
    
    &:hover {
      background: hsl(var(--secondary));
    }
  `}

  cursor: pointer;
`;
