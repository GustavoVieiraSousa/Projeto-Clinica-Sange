import { useState } from "react";
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
const [formOpen, setFormOpen] = useState(false);


const handleViewPatient = (patientCode: number) => {
    if (patientCode !== 0) {
      setDialogOpen(true);
      setPatientCode(patientCode);
    }
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
        
          <S.PatientCard 
            key= "1"
            onClick={() => handleViewPatient(patientCode)}
          >
            <StyledCard>
              <StyledCardHeader>
                <StyledCardTitle>Gugas da gaita</StyledCardTitle>
                
                
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



          <S.PatientCard 
            key= "1"
            onClick={() => handleViewPatient(patientCode)}
          >
            <StyledCard>
              <StyledCardHeader>
                <StyledCardTitle>Gugas da gaita</StyledCardTitle>
                
                
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


          <S.PatientCard 
            key= "1"
            onClick={() => handleViewPatient(1)}
          >
            <StyledCard>
              <StyledCardHeader>
                <StyledCardTitle>Gugas da gaita</StyledCardTitle>
                
                
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

          /*final do bang doido/*
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
      />
    
    </S.Container>

    )
}