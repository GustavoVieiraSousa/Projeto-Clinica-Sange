import { useState } from "react";
import { StyledCard,StyledCardContent,StyledCardHeader,StyledCardDescription,StyledCardTitle } from "../../Components/ui/card";
import { Button } from "../../Components/ui/button";
import { Badge } from "../../Components/ui/badge";
import { Check, X, Eye} from "lucide-react";
import * as S from "./styles";

type TimeOfDay = "all" | "morning" | "afternoon" | "night";


export function Home(){
    const [timeFilter, setTimeFilter] = useState<TimeOfDay>("all");
    const [po, setPo] = useState<"absent" | "confirmed">("absent");

    const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-600 text-white">Confirmado</Badge>;
      case "absent":
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
            <StyledCard key="1" className="bg-card border border-border rounded-lg hover:shadow-lg transition-shadow">
              <StyledCardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-100 rounded-lg px-4 py-2">
                      <p className="text-2xl font-bold text-blue-600">09:00</p>
                    </div>
                    <div>
                      <StyledCardTitle className="text-xl text-card-foreground">Ana Silva</StyledCardTitle>
                      <StyledCardDescription className="mt-1 text-muted-foreground">Fortalecimento do joelho</StyledCardDescription>
                    </div>
                  </div>
                  {getStatusBadge("absent")}
                </div>
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
                    onClick={() => setPo("absent")}
                    variant={po === "absent" ? "secondary" : "destructive"}
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
      </div>
    </S.Container>
    )
}