
import { Calendar, Users, Home} from "lucide-react";
import { ThemeToggle } from "../Theme-Toggle";
import * as S from "./styles";



export function Header() {




    return(
        
        <S.Container>
      <S.Nav>
        <S.NavContainer>
          <S.NavContent>
            <S.Logo>
              <S.Img src="src/assets/image_2.svg"/>
              <S.LogoText></S.LogoText>
            </S.Logo>
            
            <S.NavRight>
              <S.NavLinks>
                <S.StyledNavLink to="/">
                  <Home className="h-4 w-4" />
                  <S.NavLinkText>Agendamentos</S.NavLinkText>
                </S.StyledNavLink>
                
                <S.StyledNavLink to="/calendario">
                  <Calendar className="h-4 w-4" />
                  <S.NavLinkText>Calendário</S.NavLinkText>
                </S.StyledNavLink>
                
                <S.StyledNavLink to="/clientes">
                  <Users className="h-4 w-4" />
                  <S.NavLinkText>Pacientes</S.NavLinkText>
                </S.StyledNavLink>
              </S.NavLinks>
              
              <ThemeToggle />
            </S.NavRight>
          </S.NavContent>
        </S.NavContainer>
      </S.Nav>
      
    </S.Container>

    )

}