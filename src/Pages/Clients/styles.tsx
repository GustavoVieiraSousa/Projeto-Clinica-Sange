import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap:1.5rem;
  padding: 0 4rem;
  padding-top: 2rem;
  background: hsl(var(--background));
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;

  @media (min-width: 640px) {
    flex-direction: row;
    align-items: center;
  }
`;

export const Title = styled.h1`
  font-size: 1.875rem;
  font-weight: bold;
  color: hsl(var(--foreground));
`;

export const Subtitle = styled.p`
  color: hsl(var(--muted-foreground));
`;

export const SearchContainer = styled.div`
  position: relative;
  
  input {
    padding-left: 2.5rem;
    
  }
`;

export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  
  svg {
    width: 2rem;
    height: 2rem;
    color: hsl(var(--primary));
  }
`;

export const SearchIcon = styled.div`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: hsl(var(--muted-foreground));
  
  svg {
    width: 1rem;
    height: 1rem;
  }
`;

export const PatientGrid = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(1, 1fr);
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const PatientCard = styled.div`
  cursor: pointer;
  transition: box-shadow 0.2s;
  
  
  &:hover {
    border-radius: var(--radius);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  }
  
  h3 {
    font-size: 1.125rem;
  }
`;


export const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  svg {
    width: 0.75rem;
    height: 0.75rem;
  }
`;

export const ContactText = styled.span`
  font-size: 0.75rem;
  margin-bottom: 0.25rem;
`;

export const CPFText = styled.div`
  font-size: 0.75rem;
  color: hsl(var(--muted-foreground));
  margin-top: 2rem;
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 0;
  
  svg {
    width: 3rem;
    height: 3rem;
    color: hsl(var(--muted-foreground));
    margin-bottom: 1rem;
  }
`;

export const EmptyText = styled.p`
  font-size: 1.125rem;
  color: hsl(var(--muted-foreground));
`;
