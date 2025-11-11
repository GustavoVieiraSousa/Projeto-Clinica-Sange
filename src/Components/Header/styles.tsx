import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const Container = styled.div`
  min-height: 3.5rem;
  background: hsl(var(--background));
  border-bottom: 1px solid #D57FD8;

`;

export const Img = styled.img`
width: 3rem;
height: 3rem;
border-radius: 0.25rem;
border: 1px solid #D57FD8;
`

export const Nav = styled.nav`
  border-bottom: 1px solid hsl(var(--border));
  background: hsl(var(--card));
`;

export const NavContainer = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
`;

export const NavContent = styled.div`
  display: flex;
  height: 4rem;
  align-items: center;
  justify-content: space-between;
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const LogoText = styled.h1`
  font-size: 1.25rem;
  font-weight: bold;
  color: hsl(var(--foreground));
`;

export const NavRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const NavLinks = styled.div`
  display: flex;
  gap: 0.25rem;
`;

export const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: hsl(var(--muted-foreground));
  text-decoration: none;
  transition: all 0.2s;

  &:hover {
    color: hsl(var(--foreground));
    background: hsl(var(--secondary) / 0.5);
  }

  &.active {
    background: hsl(var(--primary) / 0.1);
    color: hsl(var(--primary));

    &:hover {
      background: hsl(var(--primary) / 0.15);
      color: hsl(var(--primary));
    }
  }
`;

export const NavLinkText = styled.span`
  display: none;

  @media (min-width: 640px) {
    display: inline;
  }
`;

export const Main = styled.main`
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;