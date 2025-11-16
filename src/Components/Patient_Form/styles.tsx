import styled from "styled-components";

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
  border: 1px solid hsl(var(--border));
  border-radius: 0.5rem;
  background: hsl(var(--card));
`;

export const SectionTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: hsl(var(--primary));
  margin-bottom: 0.5rem;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1rem 0;
  max-height: calc(90vh - 200px);
  padding-right: 0.5rem;

  &::-webkit-scrollbar {
    width: 0.5rem;
  }

  &::-webkit-scrollbar-track {
    background: hsl(var(--muted) / 0.3);
    border-radius: 0.25rem;
  }

  &::-webkit-scrollbar-thumb {
    background: hsl(var(--muted-foreground) / 0.3);
    border-radius: 0.25rem;

    &:hover {
      background: hsl(var(--muted-foreground) / 0.5);
    }
  }
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  padding-top: 1rem;
  bottom: 0;
  background: hsl(var(--background));
  padding: 1rem 0;
  margin-top: auto;
  margin-right:1.2rem;
  
  button {
    flex: 1;
  }
`;
