import { useEffect, useState } from "react";
import { StyledCard, StyledCardDescription, StyledCardContent, StyledCardHeader, StyledCardTitle } from "../../Components/ui/card";
import { Button } from "../../Components/ui/button";
import { Input } from "../../Components/ui/input";
import { Search, UserPlus, Users as UsersIcon, Mail, Phone } from "lucide-react";
import * as S from "./styles";
import PatientDialog from "../../Components/Patient_Dialog";
import PatientForm from "../../Components/Patient_Form";

export function Clients(){
const [searchTerm, setSearchTerm] = useState("");
const [dialogOpen, setDialogOpen] = useState(false);
const [patientCode, setPatientCode] = useState<number>(0);
const [patientData, setPatientData] = useState<any[]>([]);
const [formOpen, setFormOpen] = useState(false);

const handleViewPatient = (patientCode: number) => {
  if (patientCode !== 0) {
    setDialogOpen(true);
    setPatientCode(patientCode);
  }
};

const refreshPatients = async () => {
  const res = await fetch("http://localhost/Projeto-Clinica-Sange/src/php/getPatientCodes.php");
  const json = await res.json();
  setPatientData(json.data);
};

const handleNewPatient = () => {
    setPatientCode(0);
    setFormOpen(true);
  };

   const handleEditPatient = (patientCode: number) => {
    setPatientCode(patientCode);
    setDialogOpen(false);
    setFormOpen(true);
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
        <Button onClick={handleNewPatient} size="lg">
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
            onClick={() => {console.log("patient:", patient); handleViewPatient(patient.patientCode)}}
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
                      <S.ContactText>{patient.patientEmail}</S.ContactText>
                    </S.ContactItem>
                    <S.ContactItem>
                      <Phone />
                      <S.ContactText>{patient.patientNumber}</S.ContactText>
                    </S.ContactItem>
                  </S.ContactInfo>
                </StyledCardDescription>
                <S.CPFText>
                  CPF: {patient.patientCPF} 
                </S.CPFText>
              </StyledCardContent>
            </StyledCard>
          </S.PatientCard>

      ))}

      </S.PatientGrid>
      
      
      <PatientDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onEdit={handleEditPatient}
        patientCode={patientCode}
      />

      <PatientForm
        patientCode={patientCode}
        open={formOpen}
        onOpenChange={setFormOpen}
        onUpdated={() => {
          // refaz o fetch ou atualiza o estado
          refreshPatients();
        }}
      />
    
    </S.Container>

    )
}