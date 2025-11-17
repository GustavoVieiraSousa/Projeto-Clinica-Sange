import { useEffect, useState } from "react";
import { StyledCard, StyledCardDescription, StyledCardContent, StyledCardHeader, StyledCardTitle } from "../../Components/ui/card";
import { Button } from "../../Components/ui/button";
import { Input } from "../../Components/ui/input";
import { Search, UserPlus, Users as UsersIcon, Mail, Phone } from "lucide-react";
import * as S from "./styles";
import PatientDialog from "../../Components/Patient_Dialog";

export function Clients(){
const [searchTerm, setSearchTerm] = useState("");
const [dialogOpen, setDialogOpen] = useState(false);
const [patientCode, setPatientCode] = useState<number>(0);
const [patientData, setPatientData] = useState<any[]>([]);
const [patientArray, setPatientArray] = useState<any[]>([]);

const handleViewPatient = (patientCode: number) => {
  if (patientCode !== 0) {
    setDialogOpen(true);
    setPatientCode(patientCode);
  }
};

useEffect(() => {
  (async () => {
    try {
      const url = `http://localhost/Projeto-Clinica-Sange/src/php/getPatientCodes.php`;
      const res = await fetch(url);
      console.log('fetch status', res.status, res.statusText);
      const json = await res.json();
      console.log('response json:', json);

      if (json && Array.isArray(json.data)) {
        setPatientData(json.data);
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
}, []);

useEffect(() => {
  (async () => {
    try {
      const url = `http://localhost/Projeto-Clinica-Sange/src/php/getPatientDescription.php?patientCode=${patientCode}`;
      const res = await fetch(url);
      console.log('fetch status', res.status, res.statusText);
      const json = await res.json();
      console.log('response json:', json);

      if (json && Array.isArray(json.data)) {
        setPatientData(json.data);
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
}, [patientArray]);

    return(
         <S.Container>
      <S.Header>
        <S.HeaderLeft>
          <UsersIcon />
          <div>
            <S.Title>Pacientes</S.Title>
            <S.Subtitle>3 pacientes cadastrados</S.Subtitle>
          </div>
        </S.HeaderLeft>
        <Button onClick={console.log} size="lg">
          <UserPlus />
          Novo Paciente
        </Button>
      </S.Header>

    <S.SearchContainer>
      <S.SearchIcon>
        <Search />
      </S.SearchIcon>
      <Input
        placeholder="Buscar paciente por nome, email ou telefone..."
        value={searchTerm}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
      />
    </S.SearchContainer>
/* aqui será o sistema de repetição de cards de pacientes dentro da grid pelo amor de deus*/

      <S.PatientGrid>
      {patientData.map((patient, idx) => (
          <S.PatientCard 
            key= {idx}
            onClick={() => handleViewPatient(patient.patientCode)}
          >
            <StyledCard>
              <StyledCardHeader>
                <StyledCardTitle>{patient.patientName}</StyledCardTitle>
                
              </StyledCardHeader>
             
              <StyledCardContent>
                 <StyledCardDescription>
                  <S.ContactInfo>
                    <S.ContactItem>
                      <Mail />
                      <S.ContactText>gustavo.sousa12@mail.com</S.ContactText>
                    </S.ContactItem>
                    <S.ContactItem>
                      <Phone />
                      <S.ContactText>"(11) 91547-0828"</S.ContactText>
                    </S.ContactItem>
                  </S.ContactInfo>
                </StyledCardDescription>
                <S.CPFText>
                  CPF: 123.456.789-00
                </S.CPFText>
              </StyledCardContent>
            </StyledCard>
          </S.PatientCard>

          /*final do bang doido*/
          ))}
      </S.PatientGrid>
      
      
      <PatientDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onEdit={true}
        patientCode={patientCode}
      />
    
    </S.Container>

    )
}