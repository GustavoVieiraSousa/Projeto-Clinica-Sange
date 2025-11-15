import { useState, useEffect } from "react";
import { StyledCard,StyledCardContent,StyledCardHeader,StyledCardDescription,StyledCardTitle, TimePill, PatientDetails, PatientRow, ContentWrapper, ButtonWrapper} from "../../Components/ui/card";
import { Button } from "../../Components/ui/button";
import { Badge } from "../../Components/ui/badge";
import { Check, X, Eye, Bookmark } from "lucide-react";
import * as S from "./styles";

type TimeOfDay = "all" | "morning" | "afternoon" | "night";
type PatientStatus = "absent" | "confirmed" | "destructive" | "pending";

export function Home(){
    const [timeFilter, setTimeFilter] = useState<TimeOfDay>("all");
    const [patientData, setPatientData] = useState<any[]>([]);
    const [patientStatus, setPatientStatus] = useState<{ [key: number]: PatientStatus }>({});

    const getStatusBadge = (status: PatientStatus) => {
    switch (status) {
      case "confirmed":
        return <Badge variant="success">Confirmado</Badge>;
      case "destructive":
       return <Badge variant="destructive">Ausente</Badge>;
      default:
        return <Badge variant="secondary">Pendente</Badge>;
    }};

    const convertPatientStatus = (dayStatus: any): PatientStatus => {
      if (dayStatus === true || dayStatus === 1 || dayStatus === "1") {
        return "confirmed";
      } else if (dayStatus === false || dayStatus === 0 || dayStatus === "0") {
        return "destructive";
      }
      return "pending";
    };

    //get pacient data from PHP (when timeFilter changes)
    useEffect(() => {
      (async () => {
        try {
          const url = `http://localhost/Projeto-Clinica-Sange/src/php/getPatientData.php?timeFilter=${timeFilter}`;
          const res = await fetch(url);
          console.log('fetch status', res.status, res.statusText);
          const json = await res.json();
          console.log('response json:', json);

          if (json && Array.isArray(json.data)) {
            setPatientData(json.data);
            // ← MUDE AQUI: usar dayStatus do banco de dados
            const initialStatus: { [key: number]: PatientStatus } = {};
            json.data.forEach((patient: any, idx: number) => {
              // Converter o status do banco para PatientStatus
              initialStatus[idx] = convertPatientStatus(patient.dayStatus);
            });
            setPatientStatus(initialStatus);
          } else if (Array.isArray(json)) {
            setPatientData(json);
          } else {
            setPatientData([]);
            console.warn('Unexpected Error', json);
          }

        } catch (err) {
          console.error('Error getting data (when timeFilter changed):', err);
        }
      })();
    }, [timeFilter]);

    const handleStatusChange = (idx: number, newStatus: PatientStatus) => {
      setPatientStatus(prev => ({
        ...prev,
        [idx]: newStatus
      }));
      (async () => {
        try {
          const patient = patientData[idx];
          const patientCode = patient.patientCode; // ← USE patientCode, não patientCode

          if (!patientCode) {
            console.error('patientCode not found in patient data');
            return;
          }

          const url = `http://localhost/Projeto-Clinica-Sange/src/php/setPatientStatus.php?patientCode=${patientCode}&patientStatus=${newStatus}`;
          console.log('Sending request to:', url);
          
          const res = await fetch(url);
          console.log('fetch status', res.status, res.statusText);
          const json = await res.json();
          console.log('response json:', json);

          if (json.status === 'success') {
            console.log('OK, PatientStatus sent for:', patient.name);
          } else {
            console.warn('Unexpected error, PHP Response:', json.message);
          }
        } catch (err) {
          console.error('Error sending status:', err);
        }
      })();
    };

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
        {patientData.map((patient, idx) => (
          <StyledCard key={idx} className="bg-card border border-border rounded-lg hover:shadow-lg transition-shadow">
            <StyledCardHeader className="pb-3">
              <ContentWrapper className="flex items-center justify-between">
                <PatientRow>
                  <TimePill>
                    <p className="text-2xl font-bold text-blue-600">{patient.time}</p>
                  </TimePill>
                  <PatientDetails>
                    <StyledCardTitle className="text-xl text-card-foreground">{patient.name}</StyledCardTitle>
                    <StyledCardDescription className="mt-1 text-muted-foreground">
                      Superior: {patient.superior} | Inferior: {patient.inferior} | Coluna: {patient.back}  
                    </StyledCardDescription>
                  </PatientDetails>
                </PatientRow>
                <div>
                  <Bookmark className="h-10 w-10 text-purple-600 mb-1" fill="hsl(262 83% 58%)" color="hsl(262 83% 58%)"/>
                  {getStatusBadge(patientStatus[idx] || "pending")}
                </div>
              </ContentWrapper>
            </StyledCardHeader>
            <StyledCardContent>
              <ButtonWrapper>
                <Button
                  onClick={() => handleStatusChange(idx, "confirmed")}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                  variant={patientStatus[idx] === "confirmed" ? "secondary" : "default"}
                >
                  <Check className="h-4 w-4 mr-2" />
                  Confirmar Presença
                </Button>

                <Button
                  onClick={() => handleStatusChange(idx, "destructive")}
                  variant={patientStatus[idx] === "destructive" ? "secondary" : "destructive"}
                  className="flex-1"
                >
                  <X className="h-4 w-4 mr-2" />
                  Marcar Ausente
                </Button>
              
                <Button
                  onClick={() => console.log(patient)}
                  variant="outline"
                  size="icon"
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </ButtonWrapper>
            </StyledCardContent>
          </StyledCard>
        ))}
      </div>
    </S.Container>
    )
}