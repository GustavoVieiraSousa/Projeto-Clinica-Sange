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
                <S.CorIcon>
                  <Mail className="h-4 w-4 text-primary" />
                </S.CorIcon>
                <div>
                  <S.InfoLabel>Email</S.InfoLabel>
                  <S.InfoValue>gusgus@gmail.com</S.InfoValue>
                </div>
              </S.InfoItem>
              
              <S.InfoItem>
                <S.CorIcon>
                  <Phone className="h-4 w-4 text-primary" />
                </S.CorIcon>
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
                <S.CorIcon>
                  <FileText className="h-4 w-4 text-primary" />
                </S.CorIcon>
                <div>
                  <S.InfoLabel>CPF</S.InfoLabel>
                  <S.InfoValue>123.456.789-00</S.InfoValue>
                </div>
              </S.InfoItem>
              
              <S.InfoItem>
                <S.CorIcon>
                  <Calendar className="h-4 w-4 text-primary" />
                </S.CorIcon>
                <div>
                  <S.InfoLabel>Data de Nascimento</S.InfoLabel>
                  <S.InfoValue>
                    20/08/1998
                  </S.InfoValue>
                </div>
              </S.InfoItem>
            </S.InfoGrid>

            <S.InfoItem>
              <S.CorIcon>
                <MapPin className="h-4 w-4 text-primary" />
              </S.CorIcon>
              <div>
                <S.InfoLabel>Endereço</S.InfoLabel>
                <S.InfoValue>Rua das arvores verdes,1090</S.InfoValue>
              </div>
            </S.InfoItem>
          </S.Section>

          <Separator />
          
          <S.Section>
            <S.SectionTitle>Informações Adicionais</S.SectionTitle>
            <S.InfoGrid>
              
                <S.InfoItem>
                  <S.CorIcon>
                    <FileText className="h-4 w-4 text-primary" />
                  </S.CorIcon>
                  <div>
                    <S.InfoLabel>Número da Carteirinha</S.InfoLabel>
                    <S.InfoValue>3213124</S.InfoValue>
                  </div>
                </S.InfoItem>
             
             
                <S.InfoItem>
                  <S.CorIcon>
                    <FileText className="h-4 w-4 text-primary" />
                  </S.CorIcon>
                  <div>
                    <S.InfoLabel>Convênio</S.InfoLabel>
                    <S.InfoValue>Unip</S.InfoValue>
                  </div>
                </S.InfoItem>
             
              
                <S.InfoItem>
                  <S.CorIcon>
                    <Calendar className="h-4 w-4 text-primary" />
                  </S.CorIcon>
                  <div>
                    <S.InfoLabel>Idade</S.InfoLabel>
                    <S.InfoValue>58</S.InfoValue>
                  </div>
                </S.InfoItem>
              
              
                <S.InfoItem>
                  <S.CorIcon>
                    <FileText className="h-4 w-4 text-primary" />
                  </S.CorIcon>
                  <div>
                    <S.InfoLabel>Gênero</S.InfoLabel>
                    <S.InfoValue>Masculino</S.InfoValue>
                  </div>
                </S.InfoItem>
             
              
                <S.InfoItem>
                  <S.CorIcon>
                    <FileText className="h-4 w-4 text-primary" />
                  </S.CorIcon>
                  <div>
                    <S.InfoLabel>Estado Civil</S.InfoLabel>
                    <S.InfoValue>Solteiro</S.InfoValue>
                  </div>
                </S.InfoItem>
              
              
                <S.InfoItem>
                  <S.CorIcon>
                    <FileText className="h-4 w-4 text-primary" />
                  </S.CorIcon>
                  <div>
                    <S.InfoLabel>Peso</S.InfoLabel>
                    <S.InfoValue>75kg</S.InfoValue>
                  </div>
                </S.InfoItem>
             
              
                <S.InfoItem>
                  <S.CorIcon>
                    <FileText className="h-4 w-4 text-primary" />
                  </S.CorIcon>
                  <div>
                    <S.InfoLabel>Altura</S.InfoLabel>
                    <S.InfoValue>1.70</S.InfoValue>
                  </div>
                </S.InfoItem>
              
             
                <S.InfoItem>
                  <S.CorIcon>
                    <FileText className="h-4 w-4 text-primary" />
                  </S.CorIcon>
                  <div>
                    <S.InfoLabel>Profissão</S.InfoLabel>
                    <S.InfoValue>Desenvolvedor</S.InfoValue>
                  </div>
                </S.InfoItem>
             
              
                <S.InfoItem>
                  <S.CorIcon>
                    <MapPin className="h-4 w-4 text-primary" />
                  </S.CorIcon>
                  <div>
                    <S.InfoLabel>Cidade</S.InfoLabel>
                    <S.InfoValue>Americana</S.InfoValue>
                  </div>
                </S.InfoItem>
             
              
                <S.InfoItem>
                  <S.CorIcon>
                    <FileText className="h-4 w-4 text-primary" />
                  </S.CorIcon>
                  <div>
                    <S.InfoLabel>Fumante</S.InfoLabel>
                    <S.InfoValue>Sim</S.InfoValue>
                  </div>
                </S.InfoItem>
              
            </S.InfoGrid>
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

            <Separator />
          
          <S.Section>
            <S.SectionTitle>Dados da Patologia</S.SectionTitle>
            
              <S.DataItem>
                <S.InfoLabel>Diagnóstico Clínico</S.InfoLabel>
                <S.InfoValue>Lesão ligamentar no joelho direito</S.InfoValue>
              </S.DataItem>
          
            
              <S.DataItem>
                <S.InfoLabel>HMA</S.InfoLabel>
                <S.InfoValue>Paciente refere dor intensa no joelho após queda há 3 meses</S.InfoValue>
              </S.DataItem>
            
            
              <S.DataItem>
                <S.InfoLabel>Antecedentes Pessoais</S.InfoLabel>
                <S.InfoValue>nenhum</S.InfoValue>
              </S.DataItem>
            
            
              <S.DataItem>
                <S.InfoLabel>Patologia Associada</S.InfoLabel>
                <S.InfoValue>desmenbramento do joelho obtuso</S.InfoValue>
              </S.DataItem>
           
            
              <S.DataItem>
                <S.InfoLabel>Medicação em Uso</S.InfoLabel>
                <S.InfoValue>oxidrolona</S.InfoValue>
              </S.DataItem>
           
           
              <S.DataItem>
                <S.InfoLabel>Início da Dor</S.InfoLabel>
                <S.InfoValue>há 3 mesês</S.InfoValue>
              </S.DataItem>
           
            
              <S.DataItem>
                <S.InfoLabel>Posição da Dor</S.InfoLabel>
                <S.InfoValue>Jão</S.InfoValue>
              </S.DataItem>
            
            
              <S.DataItem>
                <S.InfoLabel>Posição de Trabalho</S.InfoLabel>
                <S.InfoValue>macanista de dados</S.InfoValue>
              </S.DataItem>
            
           
              <S.DataItem>
                <S.InfoLabel>Cirurgia</S.InfoLabel>
                <S.InfoValue>Fez uma cirurgia na pelve esquerda há 3 anos</S.InfoValue>
              </S.DataItem>
           
            
              <S.DataItem>
                <S.InfoLabel>Data da Cirurgia</S.InfoLabel>
                <S.InfoValue>03/02/2025</S.InfoValue>
              </S.DataItem>
            
            
              <S.DataItem>
                <S.InfoLabel>Exames Complementares</S.InfoLabel>
                <S.InfoValue>nenhum</S.InfoValue>
              </S.DataItem>
            
            
              <S.DataItem>
                <S.InfoLabel>Comprometimento AVS</S.InfoLabel>
                <S.InfoValue>Sim</S.InfoValue>
              </S.DataItem>
            
            
              <S.DataItem>
                <S.InfoLabel>Limitação Funcional</S.InfoLabel>
                <S.InfoValue>Muito Burro</S.InfoValue>
              </S.DataItem>
           
            
              <S.DataItem>
                <S.InfoLabel>Comprometimento da Marcha</S.InfoLabel>
                <S.InfoValue>n sei o q é isso nem para zuar</S.InfoValue>
              </S.DataItem>
            
          </S.Section>

           <Separator />
          
          <S.Section>
            <S.SectionTitle>Exame Físico</S.SectionTitle>
            <S.InfoGrid>
              
                <S.InfoItem>
                  <FileText className="h-4 w-4 text-primary" />
                  <div>
                    <S.InfoLabel>Pressão Arterial</S.InfoLabel>
                    <S.InfoValue>Alta 16 po 9</S.InfoValue>
                  </div>
                </S.InfoItem>
             
              
                <S.InfoItem>
                  <FileText className="h-4 w-4 text-primary" />
                  <div>
                    <S.InfoLabel>Frequência Respiratória</S.InfoLabel>
                    <S.InfoValue>20 po 20</S.InfoValue>
                  </div>
                </S.InfoItem>
              
             
                <S.InfoItem>
                  <FileText className="h-4 w-4 text-primary" />
                  <div>
                    <S.InfoLabel>Frequência Cardíaca</S.InfoLabel>
                    <S.InfoValue>180 por mim</S.InfoValue>
                  </div>
                </S.InfoItem>
              
            </S.InfoGrid>
            
              <S.DataItem>
                <S.InfoLabel>Inspeção</S.InfoLabel>
                <S.InfoValue>sla n sei</S.InfoValue>
              </S.DataItem>
            
           
              <S.DataItem>
                <S.InfoLabel>Palpação</S.InfoLabel>
                <S.InfoValue>as vezes</S.InfoValue>
              </S.DataItem>
           
           
              <S.DataItem>
                <S.InfoLabel>Dor à Palpação</S.InfoLabel>
                <S.InfoValue>não</S.InfoValue>
              </S.DataItem>
           
            
              <S.DataItem>
                <S.InfoLabel>Edema</S.InfoLabel>
                <S.InfoValue>Sim</S.InfoValue>
              </S.DataItem>
           
           
              <S.DataItem>
                <S.InfoLabel>Testes Específicos</S.InfoLabel>
                <S.InfoValue>prosopopéia</S.InfoValue>
              </S.DataItem>
           
           
              <S.DataItem>
                <S.InfoLabel>ADM</S.InfoLabel>
                <S.InfoValue>administrador?</S.InfoValue>
              </S.DataItem>
            
            
              <S.DataItem>
                <S.InfoLabel>FM</S.InfoLabel>
                <S.InfoValue>Fly away</S.InfoValue>
              </S.DataItem>
           
           
              <S.DataItem>
                <S.InfoLabel>Tônus Muscular</S.InfoLabel>
                <S.InfoValue>nos jojos dos elhos</S.InfoValue>
              </S.DataItem>
            
           
              <S.DataItem>
                <S.InfoLabel>Movimento</S.InfoLabel>
                <S.InfoValue>movimentação livre e sem dor aparente</S.InfoValue>
              </S.DataItem>
           
           
              <S.DataItem>
                <S.InfoLabel>Uso de Órtese</S.InfoLabel>
                <S.InfoValue>Sim</S.InfoValue>
              </S.DataItem>
            
           
              <S.DataItem>
                <S.InfoLabel>Tipo de Órtese</S.InfoLabel>
                <S.InfoValue>binocular aeólica</S.InfoValue>
              </S.DataItem>
           
            
              <S.DataItem>
                <S.InfoLabel>Desvios Posturais</S.InfoLabel>
                <S.InfoValue>Sim</S.InfoValue>
              </S.DataItem>
           
            
              <S.DataItem>
                <S.InfoLabel>Descrição dos Desvios Posturais</S.InfoLabel>
                <S.InfoValue>Coluna tipo C</S.InfoValue>
              </S.DataItem>
          
          </S.Section>
       

        
            <>
              <Separator />
              <S.Section>
                <S.SectionTitle>Observações</S.SectionTitle>
                <S.ObservationsText>dar a bunda n é bom</S.ObservationsText>
              </S.Section>
            </>

             <>
              <Separator />
              <S.Section>
                <S.InfoItem>
                  <FileText className="h-4 w-4 text-primary" />
                  <div>
                    <S.InfoLabel>Última Edição Por</S.InfoLabel>
                    <S.InfoValue>Angela</S.InfoValue>
                  </div>
                </S.InfoItem>
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