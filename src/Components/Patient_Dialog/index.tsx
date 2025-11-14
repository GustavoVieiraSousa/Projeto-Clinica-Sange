import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog.tsx";
import { Button } from "../../Components/ui/button";
import { Separator } from "../../Components/ui/separator";
import { Mail, Phone, MapPin, Calendar, FileText, Edit, Printer } from "lucide-react";
import BodyDiagram from "../../Components/Body-Diagram";
import type { Patient } from "../../@types/patient";
import * as S from "./styles";

interface PatientDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit?: (patient: Patient) => void;
}

const PatientDialog = ({ open, onOpenChange, onEdit }: PatientDialogProps) => {
  

  


  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <S.StyledDialogTitle>
            <DialogTitle>Gugas palitos</DialogTitle>
          </S.StyledDialogTitle>
        </DialogHeader>

        <S.Content>
          <S.Section>
            <S.SectionTitle>Informações de Contato</S.SectionTitle>
            <S.InfoGrid>
              <S.InfoItem>
                <Mail className="h-4 w-4 text-primary" />
                <div>
                  <S.InfoLabel>Email</S.InfoLabel>
                  <S.InfoValue>gusgus@gmail.com</S.InfoValue>
                </div>
              </S.InfoItem>
              
              <S.InfoItem>
                <Phone className="h-4 w-4 text-primary" />
                <div>
                  <S.InfoLabel>Telefone</S.InfoLabel>
                  <S.InfoValue>(19)9167233</S.InfoValue>
                </div>
              </S.InfoItem>
            </S.InfoGrid>
          </S.Section>

          <Separator />

          <S.Section>
            <S.SectionTitle>Dados Pessoais</S.SectionTitle>
            <S.InfoGrid>
              <S.InfoItem>
                <FileText className="h-4 w-4 text-primary" />
                <div>
                  <S.InfoLabel>CPF</S.InfoLabel>
                  <S.InfoValue>123.456.789-00</S.InfoValue>
                </div>
              </S.InfoItem>
              
              <S.InfoItem>
                <Calendar className="h-4 w-4 text-primary" />
                <div>
                  <S.InfoLabel>Data de Nascimento</S.InfoLabel>
                  <S.InfoValue>
                    20/08/1998
                  </S.InfoValue>
                </div>
              </S.InfoItem>
            </S.InfoGrid>

            <S.InfoItem>
              <MapPin className="h-4 w-4 text-primary" />
              <div>
                <S.InfoLabel>Endereço</S.InfoLabel>
                <S.InfoValue>Rua das arvores verdes,1090</S.InfoValue>
              </div>
            </S.InfoItem>
          </S.Section>

          
            <>
              <Separator />
              <S.Section>
                <S.SectionTitle>Áreas Afetadas</S.SectionTitle>
                <BodyDiagram />
                
              
                  <S.ProblemCard>
                    <S.ProblemTitle>Parte Superior</S.ProblemTitle>
                    <S.ProblemDescription>dor intensa no ombros</S.ProblemDescription>
                    <S.SeverityBadge $severity="low">
                    </S.SeverityBadge>
                  </S.ProblemCard>
               

                
                  <S.ProblemCard>
                    <S.ProblemTitle>Parte Inferior</S.ProblemTitle>
                    <S.ProblemDescription>dor nas pernas leve</S.ProblemDescription>
                    <S.SeverityBadge $severity="high">
                    </S.SeverityBadge>
                  </S.ProblemCard>
               

                
                  <S.ProblemCard>
                    <S.ProblemTitle>Costas</S.ProblemTitle>
                    <S.ProblemDescription>mauricio</S.ProblemDescription>
                    <S.SeverityBadge $severity="medium">
                    </S.SeverityBadge>
                  </S.ProblemCard>
             
              </S.Section>
            </>
       

        
            <>
              <Separator />
              <S.Section>
                <S.SectionTitle>Observações</S.SectionTitle>
                <S.ObservationsText>dar a bunda n é bom</S.ObservationsText>
              </S.Section>
            </>
         

          <>
            <Separator />
            <S.ButtonContainer>
              <Button  variant="outline">
                <Printer />
                Imprimir PDF
              </Button>
              {onEdit && (
                <Button onClick={console.log}>
                  <Edit />
                  Editar Paciente
                </Button>
              )}
            </S.ButtonContainer>
          </>
        </S.Content>
      </DialogContent>
    </Dialog>
  );
};

export default PatientDialog;