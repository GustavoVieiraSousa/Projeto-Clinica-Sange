import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog.tsx";
import { Button } from "../../Components/ui/button";
import { Separator } from "../../Components/ui/separator";
import { Mail, Phone, MapPin, Calendar, FileText, Edit, Printer, TicketCheck, BookmarkCheck } from "lucide-react";
import BodyDiagram from "../../Components/Body-Diagram";
import * as S from "./styles";
import { useEffect, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import FichaAvaliacaoPrint  from "../../Components/Patient_Pdf";

interface PatientDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit?: (patientCode: number) => void;
  patientCode: number;
}

const PatientDialog = ({ open, onOpenChange, onEdit, patientCode }: PatientDialogProps) => {

    console.log('TA vindo??????: ', patientCode);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [patientInfo, setPatientInfo] = useState<any[]>([]);
   const printRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // debug rápido: ver se o prop está chegando
    console.log('PatientDialog mounted, patientCode=', patientCode);

    (async () => {
      // se não tiver patientCode válido, limpa e sai
      if (!patientCode) {
        console.warn('PatientDialog: no patientCode provided (falsy).');
        setPatientInfo([]);
        return;
      }

      try {
        const url = `http://localhost/Projeto-Clinica-Sange/src/php/getPatientDescription.php?patientCode=${patientCode}`;
        console.log('PatientDialog fetching URL:', url);

        const res = await fetch(url);
        const text = await res.text();
        console.log('PatientDialog response text (first 400 chars):', text.slice(0,400));

        // tenta parse seguro
        let json;
        try {
          json = JSON.parse(text);
        } catch (err) {
          console.error('PatientDialog: response is not JSON:', err);
          setPatientInfo([]);
          return;
        }

        // normalmente API retorna { status, data: [...] }
        if (json && Array.isArray(json.data)) {
          setPatientInfo(json.data);
        } else if (json && json.data && typeof json.data === 'object') {
          // caso retorne objeto único
          setPatientInfo([json.data]);
        } else {
          setPatientInfo([]);
          console.warn('PatientDialog: unexpected JSON shape', json);
        }
      } catch (err) {
        console.error('Error getting Patient Infos:', err);
        setPatientInfo([]);
      }

      
    })();
  }, [patientCode]);

  const handleEdit = () => {
    if (onEdit) {
      onEdit(patientCode); //esse .patientCode me custou 2 dias acordado, odeio o Gustavo
    }
  };

  const patient = patientInfo[0] ?? {};

   const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `Ficha_${patient?.patientName ?? "Paciente"}`,
  });

  return (
        <Dialog open={open} onOpenChange={onOpenChange}>
          
          <DialogContent>
            <DialogHeader>
              <S.StyledDialogTitle>
                <DialogTitle>{patient?.patientName ?? "-"}</DialogTitle>
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
                      <S.InfoValue>{patient?.patientEmail ?? "-"}</S.InfoValue>
                    </div>
                  </S.InfoItem>
                  
                  <S.InfoItem>
                    <S.CorIcon>
                      <Phone className="h-4 w-4 text-primary" />
                    </S.CorIcon>
                    <div>
                      <S.InfoLabel>Telefone</S.InfoLabel>
                      <S.InfoValue>{patient?.patientNumber ?? "-"}</S.InfoValue>
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
                      <S.InfoValue>{patient?.patientCPF ?? "-"}</S.InfoValue>
                    </div>
                  </S.InfoItem>

                    <S.InfoItem>
                    <S.CorIcon>
                      <FileText className="h-4 w-4 text-primary" />
                    </S.CorIcon>
                    <div>
                      <S.InfoLabel>Tipo do paciente</S.InfoLabel>
                      <S.InfoValue>{patient?.patientLevel === 0 ? "Avaliação" : patient?.patientLevel === 1 ? "Especial" : patient?.patientLevel === 2 ? "Normal" : "-"}</S.InfoValue>
                    </div>
                  </S.InfoItem>
                  
                  <S.InfoItem>
                    <S.CorIcon>
                      <Calendar className="h-4 w-4 text-primary" />
                    </S.CorIcon>
                    <div>
                      <S.InfoLabel>Data de Nascimento</S.InfoLabel>
                      <S.InfoValue>{patient?.patientBirthDate ?? "-"}</S.InfoValue>
                    </div>
                  </S.InfoItem>
               

                <S.InfoItem>
                  <S.CorIcon>
                    <MapPin className="h-4 w-4 text-primary" />
                  </S.CorIcon>
                  <div>
                    <S.InfoLabel>Endereço</S.InfoLabel>
                    <S.InfoValue>Rua {patient?.addressStreet ?? "-"}, {patient?.addressNeighborhood ?? "-"} - nº {patient?.addressNumber ?? "-"} ({patient?.addressComplement ?? ""}) | CEP: {patient?.addressCEP ?? "-"}</S.InfoValue>
                  </div>
                </S.InfoItem>
                 </S.InfoGrid>
              </S.Section>

              <Separator />

               <S.Section>
                <S.SectionTitle>Dados da consulta</S.SectionTitle>
                <S.InfoGrid>
                  <S.InfoItem>
                    <S.CorIcon>
                      <FileText className="h-4 w-4 text-primary" />
                    </S.CorIcon>
                    <div>
                      <S.InfoLabel>Horário das sessões</S.InfoLabel>
                      <S.InfoValue>{patient?.dayTime ?? "-"}</S.InfoValue>
                    </div>
                  </S.InfoItem>
                  
                  <S.InfoItem>
                    <S.CorIcon>
                      <Calendar className="h-4 w-4 text-primary" />
                    </S.CorIcon>
                    <div>
                      <S.InfoLabel>Data de inicio</S.InfoLabel>
                      <S.InfoValue>{patient?.dayDateStartSession?? "-"}</S.InfoValue>
                    </div>
                  </S.InfoItem>
                

                <S.InfoItem>
                  <S.CorIcon>
                    <MapPin className="h-4 w-4 text-primary" />
                  </S.CorIcon>
                  <div>
                    <S.InfoLabel>Número de sessões</S.InfoLabel>
                    <S.InfoValue>{patient?.dayTotalSession ?? "-"}</S.InfoValue>
                  </div>
                </S.InfoItem>

                <S.InfoItem>
                  <S.CorIcon>
                    <MapPin className="h-4 w-4 text-primary" />
                  </S.CorIcon>
                  <div>
                    <S.InfoLabel>Data da avaliação</S.InfoLabel>
                    <S.InfoValue>{patient?.sessionAvaliationDate ?? "-"}</S.InfoValue>
                  </div>
                </S.InfoItem>
                </S.InfoGrid>

              </S.Section>

              <S.InfoGrid>
                  <S.InfoItem>
                    <S.CorIcon>
                      <TicketCheck className="h-4 w-4 text-primary" />
                    </S.CorIcon>
                    <div>
                      <S.InfoLabel>Segunda-Feira</S.InfoLabel>
                      <S.InfoValue>{patient?.dayMonday ?? "-"}</S.InfoValue>
                    </div>
                  </S.InfoItem>
                  
                  <S.InfoItem>
                    <S.CorIcon>
                      <TicketCheck className="h-4 w-4 text-primary" />
                    </S.CorIcon>
                    <div>
                      <S.InfoLabel>Terça-Feira</S.InfoLabel>
                      <S.InfoValue>{patient?.dayTuesday ?? "-"}</S.InfoValue>
                    </div>
                  </S.InfoItem>
                    <S.InfoItem>
                    <S.CorIcon>
                      <TicketCheck className="h-4 w-4 text-primary" />
                    </S.CorIcon>
                    <div>
                      <S.InfoLabel>Quarta-Feira</S.InfoLabel>
                      <S.InfoValue>{patient?.dayWednesday ?? "-"}</S.InfoValue>
                    </div>
                  </S.InfoItem>
                  
                  <S.InfoItem>
                    <S.CorIcon>
                      <TicketCheck className="h-4 w-4 text-primary" />
                    </S.CorIcon>
                    <div>
                      <S.InfoLabel>Quinta-Feira</S.InfoLabel>
                      <S.InfoValue>{patient?.dayThursday ?? "-"}</S.InfoValue>
                    </div>
                  </S.InfoItem>
                  <S.InfoItem>
                    <S.CorIcon>
                      <TicketCheck className="h-4 w-4 text-primary" />
                    </S.CorIcon>
                    <div>
                      <S.InfoLabel>Sexta-Feira</S.InfoLabel>
                      <S.InfoValue>{patient?.dayFriday ?? "-"}</S.InfoValue>
                    </div>
                  </S.InfoItem>
                </S.InfoGrid>

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
                        <S.InfoValue>{patient?.patientCardNum ?? "-"}</S.InfoValue>
                      </div>
                    </S.InfoItem>
                 
                 
                    <S.InfoItem>
                      <S.CorIcon>
                        <FileText className="h-4 w-4 text-primary" />
                      </S.CorIcon>
                      <div>
                        <S.InfoLabel>Convênio</S.InfoLabel>
                        <S.InfoValue>{patient?.patientTypeAgreement ?? "-"}</S.InfoValue>
                      </div>
                    </S.InfoItem>
                 
                  
                    <S.InfoItem>
                      <S.CorIcon>
                        <Calendar className="h-4 w-4 text-primary" />
                      </S.CorIcon>
                      <div>
                        <S.InfoLabel>Idade</S.InfoLabel>
                        <S.InfoValue>{patient?.patientAge ?? "-"}</S.InfoValue>
                      </div>
                    </S.InfoItem>
                  
                  
                    <S.InfoItem>
                      <S.CorIcon>
                        <FileText className="h-4 w-4 text-primary" />
                      </S.CorIcon>
                      <div>
                        <S.InfoLabel>Gênero</S.InfoLabel>
                        <S.InfoValue>{patient?.patientGender ?? "-"}</S.InfoValue>
                      </div>
                    </S.InfoItem>
                 
                  
                    <S.InfoItem>
                      <S.CorIcon>
                        <FileText className="h-4 w-4 text-primary" />
                      </S.CorIcon>
                      <div>
                        <S.InfoLabel>Estado Civil</S.InfoLabel>
                        <S.InfoValue>{patient?.patientMaritalStatus ?? "-"}</S.InfoValue>
                      </div>
                    </S.InfoItem>
                  
                  
                    <S.InfoItem>
                      <S.CorIcon>
                        <FileText className="h-4 w-4 text-primary" />
                      </S.CorIcon>
                      <div>
                        <S.InfoLabel>Peso</S.InfoLabel>
                        <S.InfoValue>{patient?.patientWeight ?? "-"}</S.InfoValue>
                      </div>
                    </S.InfoItem>
                 
                  
                    <S.InfoItem>
                      <S.CorIcon>
                        <FileText className="h-4 w-4 text-primary" />
                      </S.CorIcon>
                      <div>
                        <S.InfoLabel>Altura</S.InfoLabel>
                        <S.InfoValue>{patient?.patientHeight ?? "-"}</S.InfoValue>
                      </div>
                    </S.InfoItem>
                  
                 
                    <S.InfoItem>
                      <S.CorIcon>
                        <FileText className="h-4 w-4 text-primary" />
                      </S.CorIcon>
                      <div>
                        <S.InfoLabel>Profissão</S.InfoLabel>
                        <S.InfoValue>{patient?.patientProfession ?? "-"}</S.InfoValue>
                      </div>
                    </S.InfoItem>
                 
                  
                    <S.InfoItem>
                      <S.CorIcon>
                        <MapPin className="h-4 w-4 text-primary" />
                      </S.CorIcon>
                      <div>
                        <S.InfoLabel>Cidade</S.InfoLabel>
                        <S.InfoValue>{patient?.addressCity ?? "-"}</S.InfoValue>
                      </div>
                    </S.InfoItem>
                 
                  
                    <S.InfoItem>
                      <S.CorIcon>
                        <FileText className="h-4 w-4 text-primary" />
                      </S.CorIcon>
                      <div>
                        <S.InfoLabel>Fumante</S.InfoLabel>
                        <S.InfoValue> {patient?.patientSmoker === 0 ? "Não" : patient?.patientSmoker === 1 ? "Sim" : "-"} </S.InfoValue>
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
                        <S.ProblemDescription>{patient?.sessionSuperiorDesc ?? "-"}</S.ProblemDescription>
                        <S.SeverityBadge $severity="low">
                        </S.SeverityBadge>
                      </S.ProblemCard>
                   

                    
                      <S.ProblemCard>
                        <S.ProblemTitle>Parte Inferior</S.ProblemTitle>
                        <S.ProblemDescription>{patient?.sessionInferiorDesc ?? "-"}</S.ProblemDescription>
                        <S.SeverityBadge $severity="high">
                        </S.SeverityBadge>
                      </S.ProblemCard>
                   

                    
                      <S.ProblemCard>
                        <S.ProblemTitle>Costas</S.ProblemTitle>
                        <S.ProblemDescription>{patient?.sessionBackDesc ?? "-"}</S.ProblemDescription>
                        <S.SeverityBadge $severity="medium">
                        </S.SeverityBadge>
                      </S.ProblemCard>
                 
                  </S.Section>
                </>

                <Separator />
              
              <>
                <S.Section>
                  <S.SectionTitle>Observações</S.SectionTitle>
                  <S.ObservationsText>{patient?.sessionDescription ?? "-"}</S.ObservationsText>
                </S.Section>
              </>

                <Separator />

              <S.Section>
                <S.SectionTitle>Dados da Patologia</S.SectionTitle>
                
                  <S.DataItem>
                    <S.InfoLabel>Diagnóstico Clínico</S.InfoLabel>
                    <S.InfoValue>{patient?.pathologyDiagnostic ?? "-"}</S.InfoValue>
                  </S.DataItem>
              
                
                  <S.DataItem>
                    <S.InfoLabel>HMA</S.InfoLabel>
                    <S.InfoValue>{patient?.pathologyHMA ?? "-"}</S.InfoValue>
                  </S.DataItem>
                
                
                  <S.DataItem>
                    <S.InfoLabel>Antecedentes Pessoais</S.InfoLabel>
                    <S.InfoValue>{patient?.pathologyPersonalBackground ?? "-"}</S.InfoValue>
                  </S.DataItem>
                
                
                  <S.DataItem>
                    <S.InfoLabel>Patologia Associada</S.InfoLabel>
                    <S.InfoValue>{patient?.pathologyAssociated ?? "-"}</S.InfoValue>
                  </S.DataItem>
               
                
                  <S.DataItem>
                    <S.InfoLabel>Medicação em Uso</S.InfoLabel>
                    <S.InfoValue>{patient?.pathologyTakeMeds ?? "-"}</S.InfoValue>
                  </S.DataItem>
               
               
                  <S.DataItem>
                    <S.InfoLabel>Início da Dor</S.InfoLabel>
                    <S.InfoValue>{patient?.pathologyWhenStarted ?? "-"}</S.InfoValue>
                  </S.DataItem>
               
                
                  <S.DataItem>
                    <S.InfoLabel>Posição da Dor</S.InfoLabel>
                    <S.InfoValue>{patient?.pathologyMoreIntensePosition ?? "-"}</S.InfoValue>
                  </S.DataItem>
                
                
                  <S.DataItem>
                    <S.InfoLabel>Posição de Trabalho</S.InfoLabel>
                    <S.InfoValue>{patient?.pathologyWorkPosition ?? "-"}</S.InfoValue>
                  </S.DataItem>
                
                
                  <S.DataItem>
                    <S.InfoLabel>Cirurgia</S.InfoLabel>
                    <S.InfoValue>{patient?.pathologyHadSurgery ?? "-"}</S.InfoValue>
                  </S.DataItem>
               
                
                  <S.DataItem>
                    <S.InfoLabel>Data da Cirurgia</S.InfoLabel>
                    <S.InfoValue>{patient?.pathologyDateSurgery ?? "-"}</S.InfoValue>
                  </S.DataItem>
                
                
                  <S.DataItem>
                    <S.InfoLabel>Exames Complementares</S.InfoLabel>
                    <S.InfoValue>{patient?.pathologyComplementaryExams ?? "-"}</S.InfoValue>
                  </S.DataItem>
                
                
                  <S.DataItem>
                    <S.InfoLabel>Comprometimento AVS</S.InfoLabel>
                    <S.InfoValue>{patient?.pathologyAVS ?? "-"}</S.InfoValue>
                  </S.DataItem>
                
                
                  <S.DataItem>
                    <S.InfoLabel>Limitação Funcional</S.InfoLabel>
                    <S.InfoValue>{patient?.pathologyFunctionalLimitation ?? "-"}</S.InfoValue>
                  </S.DataItem>
               
                
                  <S.DataItem>
                    <S.InfoLabel>Comprometimento da Marcha</S.InfoLabel>
                    <S.InfoValue>{patient?.pathologyMarcha ?? "-"}</S.InfoValue>
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
                        <S.InfoValue>{patient?.examPA ?? "-"}</S.InfoValue>
                      </div>
                    </S.InfoItem>
                 
                  
                    <S.InfoItem>
                      <FileText className="h-4 w-4 text-primary" />
                      <div>
                        <S.InfoLabel>Frequência Respiratória</S.InfoLabel>
                        <S.InfoValue>{patient?.examFR ?? "-"}</S.InfoValue>
                      </div>
                    </S.InfoItem>
                  
                 
                    <S.InfoItem>
                      <FileText className="h-4 w-4 text-primary" />
                      <div>
                        <S.InfoLabel>Frequência Cardíaca</S.InfoLabel>
                        <S.InfoValue>{patient?.examFC ?? "-"}</S.InfoValue>
                      </div>
                    </S.InfoItem>
                  
                </S.InfoGrid>
                
                  <S.DataItem>
                    <S.InfoLabel>Inspeção</S.InfoLabel>
                    <S.InfoValue>{patient?.examInspection ?? "-"}</S.InfoValue>
                  </S.DataItem>
                
               
                  <S.DataItem>
                    <S.InfoLabel>Palpação</S.InfoLabel>
                    <S.InfoValue>{patient?.examPalpation ?? "-"}</S.InfoValue>
                  </S.DataItem>
               
               
                  <S.DataItem>
                    <S.InfoLabel>Dor à Palpação</S.InfoLabel>
                    <S.InfoValue>({patient?.examPainPalpation === 0 ? "Não" : patient?.examPainPalpation === 1 ? "Sim" : "-"}) {patient?.examPainPalpationDesc ?? ""}</S.InfoValue>
                  </S.DataItem>
               
                
                  <S.DataItem>
                    <S.InfoLabel>Edema</S.InfoLabel>
                    <S.InfoValue>({patient?.examEdema === 0 ? "Não" : patient?.examEdema === 1 ? "Sim" : "-"})  {patient?.examEdemaDesc ?? ""}</S.InfoValue>
                  </S.DataItem>
               
               
                  <S.DataItem>
                    <S.InfoLabel>Testes Específicos</S.InfoLabel>
                    <S.InfoValue>{patient?.examSpecificTests ?? "-"}</S.InfoValue>
                  </S.DataItem>
               
               
                  <S.DataItem>
                    <S.InfoLabel>ADM</S.InfoLabel>
                    <S.InfoValue>({patient?.examADM === 0 ? "Normal" : patient?.examADM === 1 ? "Diminuída" : "-"}: {patient?.examADMDesc ?? ""})   {patient?.examADMDesc ?? ""}</S.InfoValue>
                  </S.DataItem>
                
                
                  <S.DataItem>
                    <S.InfoLabel>FM</S.InfoLabel>
                    <S.InfoValue>({patient?.examFM === 0 ?"Normal" : patient?.examFM === 1 ? "Diminuída" : "-"}) {patient?.examFMDesc ?? ""}</S.InfoValue>
                  </S.DataItem>
               
               
                  <S.DataItem>
                    <S.InfoLabel>Tônus Muscular</S.InfoLabel>
                    <S.InfoValue>({patient?.examMuscularTonus === 0 ? "Normal" :patient?.examMuscularTonus === 1 ? "Hipotônico" : patient?.examMuscularTonus === 2 ? "Hipertônico": "-"})  {patient?.examMuscularTonusDesc ?? ""}</S.InfoValue>
                  </S.DataItem>
                
               
                  <S.DataItem>
                    <S.InfoLabel>Movimento</S.InfoLabel>
                    <S.InfoValue>{patient?.examMovement === 0 ? "Ativo" : patient?.examMovement === 1 ? "Passivo" : patient?.examMovement === 2 ? "Ativo-Assistido" : "-"}</S.InfoValue>
                  </S.DataItem>
               
               
                  <S.DataItem>
                    <S.InfoLabel>Uso de Órtese</S.InfoLabel>
                    <S.InfoValue>{patient?.examOrtese === 0 ? "Não" : patient?.examOrtese === 1 ? "Sim":"-"}</S.InfoValue>
                  </S.DataItem>
                
               
                  <S.DataItem>
                    <S.InfoLabel>Tipo de Órtese</S.InfoLabel>
                    <S.InfoValue>{patient?.examOrteseDesc ?? "-"}</S.InfoValue>
                  </S.DataItem>
               
                
                  <S.DataItem>
                    <S.InfoLabel>Desvios Posturais</S.InfoLabel>
                    <S.InfoValue>{patient?.examPosturalDeviations === 0 ? "Não" : patient?.examPosturalDeviations === 1 ? "Sim" : "-"}</S.InfoValue>
                  </S.DataItem>
               
                
                  <S.DataItem>
                    <S.InfoLabel>Descrição dos Desvios Posturais</S.InfoLabel>
                    <S.InfoValue>{patient?.examPosturalDeviationsDesc ?? "-"}</S.InfoValue>
                  </S.DataItem>
              
              </S.Section>
           
              <Separator />

              <S.Section>
                <S.SectionTitle>Exame Fisioterápeutico</S.SectionTitle>
                    <S.DataItem>
                        <S.InfoLabel>Tratamento Proposto</S.InfoLabel>
                        <S.InfoValue>{patient?.traProposedTreatment ?? "-"}</S.InfoValue>
                    </S.DataItem>

                    <S.DataItem>
                        <S.InfoLabel>Objetivo do Tratamento</S.InfoLabel>
                        <S.InfoValue>{patient?.traTreatmentObjective ?? "-"}</S.InfoValue>
                    </S.DataItem>
              </S.Section>

                 <>
                  <Separator />
                  <S.Section>
                    <S.InfoItem>
                      <FileText className="h-4 w-4 text-primary" />
                      <div>
                        <S.InfoLabel>Última Edição Por</S.InfoLabel>
                        <S.InfoValue>{patient?.sessionLastEdit ?? "-"}</S.InfoValue>
                      </div>
                    </S.InfoItem>
                  </S.Section>
                </>
             

              <>
                <Separator />
                <S.ButtonContainer>
                  <Button  variant="outline" onClick={handlePrint}>
                    <Printer />
                    Imprimir PDF
                  </Button>
                  <Button variant="outline" >
                      <BookmarkCheck  />
                      Marcar Avulso
                  </Button>
                  {onEdit && (
                    <Button onClick={handleEdit} variant="outline">
                      <Edit />
                      Editar Paciente
                    </Button>
                  )}
                   
                </S.ButtonContainer>
              </>
            </S.Content>
          </DialogContent>
          <FichaAvaliacaoPrint ref={printRef} patient={patient}/>
        </Dialog>
        
  );
};

export default PatientDialog;