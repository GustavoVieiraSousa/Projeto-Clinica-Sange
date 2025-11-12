import { useState } from "react";
import { StyledCard,StyledCardContent,StyledCardHeader,StyledCardDescription,StyledCardTitle, TimePill, PatientDetails, PatientRow, ContentWrapper} from "../../Components/ui/card";
import { Button } from "../../Components/ui/button";
import { Badge } from "../../Components/ui/badge";
import { Check, X, Eye, Bookmark } from "lucide-react";
import * as S from "./styles";

type TimeOfDay = "all" | "morning" | "afternoon" | "night";


export function Home(){
    const [timeFilter, setTimeFilter] = useState<TimeOfDay>("all");
    const [po, setPo] = useState<"absent" | "confirmed" |"destructive">("absent");


    const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge variant="success">Confirmado</Badge>;
      case "destructive":
       return <Badge variant="destructive">Ausente</Badge>;
        
      default:
         
         return <Badge variant="secondary">Pendente</Badge>;
        
    }}

    return(
         <S.Container>
      <S.Header>
        <div>
          <S.Title>Agendamentos de Hoje</S.Title>
          <S.Subtitle>
            {new Date().toLocaleDateString('pt-BR', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </S.Subtitle>
        </div>
      </S.Header>

      <S.FilterContainer>
        <S.FilterButton 
          $active={timeFilter === "all"}
          onClick={() => setTimeFilter("all")}
        >
          Todos
        </S.FilterButton>
        <S.FilterButton 
          $active={timeFilter === "morning"}
          onClick={() => setTimeFilter("morning")}
        >
          Manhã (6h-12h)
        </S.FilterButton>
        <S.FilterButton 
          $active={timeFilter === "afternoon"}
          onClick={() => setTimeFilter("afternoon")}
        >
          Tarde (12h-18h)
        </S.FilterButton>
        <S.FilterButton 
          $active={timeFilter === "night"}
          onClick={() => setTimeFilter("night")}
        >
          Noite (18h-24h)
        </S.FilterButton>
      </S.FilterContainer>

      <div className="grid gap-4">
        //Template de card de agendamento

            <StyledCard key="1" className="bg-card border border-border rounded-lg hover:shadow-lg transition-shadow">
              <StyledCardHeader className="pb-3">
                <ContentWrapper className="flex items-center justify-between">
                  <PatientRow>
                    <TimePill>
                      <p className="text-2xl font-bold text-blue-600">09:00</p>
                    </TimePill>
                    <PatientDetails>
                      <StyledCardTitle className="text-xl text-card-foreground">Ana Silva</StyledCardTitle>
                      <StyledCardDescription className="mt-1 text-muted-foreground">Fortalecimento do joelho</StyledCardDescription>
                    </PatientDetails>
                  </PatientRow>
                  <div>
                  <Bookmark className="h-10 w-10 text-purple-600 mb-1" fill="hsl(262 83% 58%)" color="hsl(262 83% 58%)"/>
                  {getStatusBadge(po)}
                  </div>
                </ContentWrapper>
              </StyledCardHeader>
              <StyledCardContent>
                <div className="flex gap-2">
                  <Button
                    onClick={ () => setPo("confirmed")}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                    variant={po === "confirmed" ? "secondary" : "default"}
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Confirmar Presença
                  </Button>

                  <Button
                    onClick={() => setPo("destructive")}
                    variant={po === "destructive" ? "secondary" : "destructive"}
                    className="flex-1"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Marcar Ausente
                  </Button>
                
                  <Button
                    onClick={console.log}
                    variant="outline"
                    size="icon"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </StyledCardContent>
            </StyledCard>
        // fim do card de agendamento
      </div>
    </S.Container>
    )
}