import { forwardRef } from "react";
import styled from "styled-components";

const FormContainer = styled.div`
  background: white;
  color: black;
  padding: 20px;
  max-width: 210mm;
  margin: 0 auto;
  font-family: Arial, sans-serif;
  font-size: 11px;

  @media print {
    padding: 15px;
    margin: 0;
    font-size: 10px;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 12px;
  border-bottom: 2px solid #333;
  padding-bottom: 8px;
`;

const Title = styled.h1`
  font-size: 16px;
  font-weight: bold;
  margin: 0 0 6px 0;
  text-transform: uppercase;

  @media print {
    font-size: 14px;
  }
`;

const AuthNumber = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
`;

const Label = styled.span`
  font-weight: bold;
  font-size: 11px;
  white-space: nowrap;

  @media print {
    font-size: 9px;
  }
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid #333;
  padding: 2px 6px;
  font-size: 11px;
  flex: 1;
  margin-left: 6px;
  background: transparent;

  @media print {
    border-bottom: 1px solid #333;
    font-size: 9px;
    padding: 1px 4px;
  }
`;

const Section = styled.div`
  margin-bottom: 12px;

  @media print {
    margin-bottom: 8px;
  }
`;

const SectionTitle = styled.h2`
  font-size: 13px;
  font-weight: bold;
  margin-bottom: 8px;
  background: #f0f0f0;
  padding: 5px 10px;
  border-left: 3px solid #333;

  @media print {
    font-size: 11px;
    padding: 4px 8px;
    margin-bottom: 6px;
  }
`;

const Row = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 6px;
  align-items: center;
  flex-wrap: wrap;

  @media print {
    gap: 8px;
    margin-bottom: 4px;
  }
`;

const Field = styled.div<{ flex?: string; minWidth?: string }>`
  display: flex;
  align-items: center;
  flex: ${props => props.flex || '1'};
  min-width: ${props => props.minWidth || 'auto'};
`;

const TextArea = styled.textarea`
  border: 1px solid #ccc;
  padding: 4px 6px;
  font-size: 11px;
  width: 100%;
  min-height: 35px;
  font-family: Arial, sans-serif;
  resize: vertical;

  @media print {
    border: 1px solid #333;
    min-height: 25px;
    font-size: 9px;
    padding: 3px 4px;
  }
`;

const CheckboxGroup = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;

  @media print {
    gap: 8px;
  }
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  white-space: nowrap;

  @media print {
    font-size: 9px;
    gap: 3px;
  }
`;

const Checkbox = styled.input`
  width: 13px;
  height: 13px;

  @media print {
    width: 11px;
    height: 11px;
  }
`;

const SignatureSection = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  gap: 30px;

  @media print {
    margin-top: 25px;
  }
`;

const SignatureBox = styled.div`
  flex: 1;
  text-align: center;
`;

const SignatureLine = styled.div`
  border-top: 1px solid #333;
  margin-top: 35px;
  padding-top: 5px;
  font-size: 10px;

  @media print {
    margin-top: 30px;
    font-size: 9px;
  }
`;
const HiddenWrapper = styled.div`
  display: none;
  position: relative;

  @media print {
    display: block;
  }
;
  

  @media print {
    display: block;
  }
`;


type Props = {
  patient?: any;
};

const yesNo = (val: any) => {
  if (val === true || val === "Sim" || val === "sim" || val === "S" ) return "Sim";
  if (val === false || val === "Não" || val === "Nâo" || val === "nao" || val === "não") return "Não";
  return val ?? "-";
};

const FichaAvaliacaoPrint = forwardRef<HTMLDivElement, Props>(({ patient}, ref) => {
  console.log(patient?.examPainPalpation);
  return (

    <HiddenWrapper ref={ref}>
    <FormContainer>
      <Header>
        <Title>Ficha de avaliação de fisioterapia</Title>
        <AuthNumber>
          <Field flex="0 0 auto">
            <Label>Autorização nº</Label>
            <Input type="text" style={{ width: '150px' }} defaultValue="" />
          </Field>
          <Field flex="0 0 auto">
            <Label>Data avaliação:</Label>
            <Input type="date" style={{ width: '150px' }} defaultValue={patient?.sessionAvaliationDate} />
          </Field>
        </AuthNumber>
      </Header>

      <Section>
        <SectionTitle>Dados pessoais:</SectionTitle>
        <Row>
          <Field flex="2">
            <Label>Nome:</Label>
            <Input type="text" defaultValue={patient?.patientName} />
          </Field>
          <Field flex="1" minWidth="200px">
            <Label>Carteirinha:</Label>
            <Input type="text" defaultValue={patient?.patientCardNum} />
          </Field>
        </Row>
        <Row>
          <Field>
            <Label>Idade:</Label>
            <Input type="number" defaultValue={patient?.patientAge} />
          </Field>
          <Field>
            <Label>Sexo:</Label>
            <Input type="text" defaultValue={patient?.patientGender} />
          </Field>
          <Field>
            <Label>Estado civil:</Label>
            <Input type="text" defaultValue={patient?.patientMaritalStatus} />
          </Field>
          <Field>
            <Label>Peso:</Label>
            <Input type="text" defaultValue={patient?.patientWeight} />
          </Field>
          <Field>
            <Label>Altura:</Label>
            <Input type="text" defaultValue={patient?.patientHeight} />
          </Field>
        </Row>
        <Row>
          <Field flex="2">
            <Label>Profissão:</Label>
            <Input type="text" defaultValue={patient?.patientProfession} />
          </Field>
        </Row>
        <Row>
          <Field flex="2">
            <Label>Endereço:</Label>
            
            <p></p><Input type="text" defaultValue={patient?.addressStreet} /><p>, </p><Input type="text" defaultValue={patient?.addressNeighborhood} /><p> N°</p><Input type="text" defaultValue={patient?.addressNumber} /><p>, </p><Input type="text" defaultValue={patient?.addressComplement}/>
          </Field>
        </Row>
        <Row>
          <Field>
            <Label>Cidade:</Label>
            <Input type="text" defaultValue={patient?.addressCity} />
          </Field>
          <Field>
            <Label>Telefone:</Label>
            <Input type="tel" defaultValue={patient?.patientNumber} />
          </Field>
        </Row>
        <Row>
          <Label>Fumante:</Label>
          
            <CheckboxLabel>
              <Input type="text" defaultValue={patient?.patientSmoker} />
            </CheckboxLabel>
            
        </Row>
      </Section>

      <Section>
        <SectionTitle>Dados da patologia:</SectionTitle>
        <Row>
          <Field flex="1">
            <Label>Diagnóstico clínico:</Label>
            <Input type="text" defaultValue={patient?.patologyDiagnostic} />
          </Field>
        </Row>
        <Row>
          <div style={{ width: '100%' }}>
            <Label>HMA:</Label>
            <TextArea defaultValue={patient?.patologyHMA} />
          </div>
        </Row>
        <Row>
          <Field flex="1">
            <Label>Antecedentes pessoais?</Label>
            <Input type="text" defaultValue={patient?.patologyPersonalBackground} />
          </Field>
        </Row>
        <Row>
          <Field flex="1">
            <Label>Patologia associada?</Label>
            <Input type="text" defaultValue={patient?.patologyAssociatedPatology} />
          </Field>
        </Row>
        <Row>
          <Field flex="1">
            <Label>Toma algum medicamento?</Label>
            <Input type="text" defaultValue={patient?.patologyTakeMeds} />
          </Field>
        </Row>
        <Row>
          <Field flex="1">
            <Label>Quando começou a dor?</Label>
            <Input type="text" defaultValue={patient?.patologyWhenStarted} />
          </Field>
        </Row>
        <Row>
          <Field flex="1">
            <Label>Em qual posição a dor é mais intensa?</Label>
            <Input type="text" defaultValue={patient?.patologyMoreIntensePosition} />
          </Field>
        </Row>
        <Row>
          <Field flex="1">
            <Label>Qual a sua posição de trabalho?</Label>
            <Input type="text" defaultValue={patient?.patologyWorkPosition} />
          </Field>
        </Row>
        <Row>
          <Field>
            <Label>Fez alguma cirurgia?</Label>
          <p></p> <Input type="text" defaultValue={patient?.pathologyHadSurgery} />
          </Field>
          <Field>
            <Label>Data:</Label>
            <Input type="date" defaultValue={patient?.pathologyDateSurgery} />
          </Field>
        </Row>
        <Row>
          <Field flex="1">
            <Label>Exames complementares:</Label>
            <Input type="text" defaultValue={patient?.pathologyComplementaryExams} />
          </Field>
        </Row>
        <Row>
          <Field flex="1">
            <Label>Há comprometimento das AVS's?</Label>
            <Input type="text" defaultValue={patient?.pathologyAVS} />
          </Field>
        </Row>
        <Row>
          <Field flex="1">
            <Label>Limitação funcional:</Label>
            <Input type="text" defaultValue={patient?.pathologyFunctionalLimitation} />
          </Field>
        </Row>
        <Row>
          <Field flex="1">
            <Label>Comprometimento de marcha?</Label>
            <Input type="text" defaultValue={patient?.pathologyMarcha} />
          </Field>
        </Row>
      </Section>

      <Section>
        <SectionTitle>Exame físico:</SectionTitle>
        <Row>
          <Field>
            <Label>PA:</Label>
            <Input type="text" defaultValue={patient?.examPA} />
          </Field>
          <Field>
            <Label>FR:</Label>
            <Input type="text" defaultValue={patient?.examFR} />
          </Field>
          <Field>
            <Label>FC:</Label>
            <Input type="text" defaultValue={patient?.examFC} />
          </Field>
        </Row>
        <Row>
          <div style={{ width: '100%' }}>
            <Label>Inspeção:</Label>
            <TextArea defaultValue={patient?.examInspection} />
          </div>
        </Row>
        <Row>
          <div style={{ width: '100%' }}>
            <Label>Palpação:</Label>
            <TextArea defaultValue={patient?.examPalpation} />
          </div>
        </Row>
        <Row>
          <Label>Dor a palpação:</Label>
          <CheckboxGroup>
            <CheckboxLabel>
              <Checkbox type="radio" name="dorPalpacao1" value="sim" defaultChecked={yesNo(patient?.examPainPalpation) == "Sim"} /> Sim
            </CheckboxLabel>
            <CheckboxLabel>
              <Checkbox type="radio" name="dorPalpacao2" value="nao" defaultChecked={yesNo(patient?.examPainPalpation) =="Não"} /> Não
            </CheckboxLabel>
           
          </CheckboxGroup>
           <Input type="text" defaultValue={patient?.examPainPalpationDesc} />
        </Row>
        <Row>
          <Label>Edema:</Label>
          <CheckboxGroup>
            <CheckboxLabel>
              <Checkbox type="radio" name="edema" value="sim" defaultChecked={yesNo(patient?.examEdema) == "Sim"} /> Sim
            </CheckboxLabel>
            <CheckboxLabel>
              <Checkbox type="radio" name="edema" value="nao" defaultChecked={yesNo(patient?.examEdema) == "Não"} /> Não
            </CheckboxLabel>
          </CheckboxGroup>
          <Input type="text" defaultValue={patient?.examEdemaDesc} />
        </Row>
        <Row>
          <div style={{ width: '100%' }}>
            <Label>Testes específicos:</Label>
            <TextArea defaultValue={patient?.examSpecificTests} />
          </div>
        </Row>
        <Row>
          <Label>ADM:</Label>
          <CheckboxGroup>
            <CheckboxLabel>
              <Checkbox type="radio" name="adm" value="normal" defaultChecked={patient?.examADM == "normal"} /> Normal
            </CheckboxLabel>
            <CheckboxLabel>
              <Checkbox type="radio" name="adm" value="diminuida" defaultChecked={patient?.examADM == "diminuida"} /> Diminuída
            </CheckboxLabel>
          </CheckboxGroup>
          <Input type="text" defaultValue={patient?.examADMDesc} />
        </Row>
        <Row>
          <Label>FM:</Label>
          <CheckboxGroup>
            <CheckboxLabel>
              <Checkbox type="radio" name="fm" value="normal" defaultChecked={patient?.examFM == "normal"} /> Normal
            </CheckboxLabel>
            <CheckboxLabel>
              <Checkbox type="radio" name="fm" value="diminuida" defaultChecked={patient?.examFM == "diminuida"} /> Diminuída
            </CheckboxLabel>
          </CheckboxGroup>
          <Input type="text" defaultValue={patient?.examFMDesc} />
        </Row>
        <Row>
          <Label>Tônus Muscular:</Label>
          <CheckboxGroup>
            <CheckboxLabel>
              <Checkbox type="radio" name="tonus" value="normal" defaultChecked={patient?.examMuscularTonus == "normal"} /> Normal
            </CheckboxLabel>
            <CheckboxLabel>
              <Checkbox type="radio" name="tonus" value="hipotonico" defaultChecked={patient?.examMuscularTonus == "hipotonico"} /> Hipotônio
            </CheckboxLabel>
            <CheckboxLabel>
              <Checkbox type="radio" name="tonus" value="hipertonico" defaultChecked={patient?.examMuscularTonus == "hipertonico"} /> Hipertônico
            </CheckboxLabel>
          </CheckboxGroup>
          <Input type="text" defaultValue={patient?.examMuscularTonusDesc} />
        </Row>
        <Row>
          <Label>Movimento:</Label>
          <CheckboxGroup>
            <CheckboxLabel>
              <Checkbox type="radio" name="movimento" value="ativo" defaultChecked={patient?.examMovement == "ativo"} /> Ativo
            </CheckboxLabel>
            <CheckboxLabel>
              <Checkbox type="radio" name="movimento" value="passivo" defaultChecked={patient?.examMovement == "passivo"} /> Passivo
            </CheckboxLabel>
            <CheckboxLabel>
              <Checkbox type="radio" name="movimento" value="ativo-assistido" defaultChecked={patient?.examMovement == "ativo-assistido"} /> Ativo-Assistido
            </CheckboxLabel>
          </CheckboxGroup>
        </Row>
        <Row>
          <Label>Faz uso de órtese:</Label>
          <CheckboxGroup>
            <CheckboxLabel>
              <Checkbox type="radio" name="ortese" value="sim" defaultChecked={yesNo(patient?.examOrtese) == "Sim"} /> Sim
            </CheckboxLabel>
            <CheckboxLabel>
              <Checkbox type="radio" name="ortese" value="nao" defaultChecked={yesNo(patient?.examOrtese) == "Não"}/> Não
            </CheckboxLabel>
          </CheckboxGroup>
          <Field>
            <Label>Qual?</Label>
            <Input type="text" defaultValue={patient?.examOrteseDesc} />
          </Field>
        </Row>
        <Row>
          <Label>Desvios Posturais:</Label>
          <CheckboxGroup>
            <CheckboxLabel>
              <Checkbox type="radio" name="desvios" value="sim" defaultChecked={yesNo(patient?.examPosturalDeviations) == "Sim"} /> Sim
            </CheckboxLabel>
            <CheckboxLabel>
              <Checkbox type="radio" name="desvios" value="nao" defaultChecked={yesNo(patient?.examPosturalDeviations) == "Não"} /> Não
            </CheckboxLabel>
          </CheckboxGroup>
          <Input type="text" defaultValue={patient?.examPosturalDeviationsDesc} />
        </Row>
      </Section>

      <Section>
        <SectionTitle>Tratamento fisioterápico</SectionTitle>
        <Row>
          <div style={{ width: '100%' }}>
            <Label>Objetivos do tratamento:</Label>
            <TextArea defaultValue={patient?.traTreatmentObjective} />
          </div>
        </Row>
        <Row>
          <div style={{ width: '100%' }}>
            <Label>Tratamento proposto:</Label>
            <TextArea defaultValue={patient?.traProposedTreatment} />
          </div>
        </Row>
      </Section>

      <SignatureSection>
        <SignatureBox>
          <SignatureLine>Assinatura fisioterapeuta</SignatureLine>
        </SignatureBox>
        <SignatureBox>
          <SignatureLine>Assinatura beneficiário</SignatureLine>
        </SignatureBox>
      </SignatureSection>
    </FormContainer>
    </HiddenWrapper>
  );
});


export default FichaAvaliacaoPrint;
