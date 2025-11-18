import React, { forwardRef } from "react";
import styled from "styled-components";

// =============================
// Componente invisível para impressão (com todos os campos do PDF enviado)
// =============================

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

const Container = styled.div`
  max-width: 780px;
  margin: 0 auto;
  padding: 28px;
  font-family: Arial, Helvetica, sans-serif;
  color: #000;
  font-size: 13px;
  line-height: 1.35;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 2px solid #1a4e8a20;
`;

const Logo = styled.img`
  width:100px;
  height: 50px;
  object-fit: contain;
`;

const Title = styled.h1`
  font-size: 20px;
  text-align: center;
  font-weight: bold;
  width: 100%;
`;

const Section = styled.div`
  margin-top: 18px;
`;

const SectionTitle = styled.h2`
  font-size: 15px;
  margin-bottom: 6px;
  border-bottom: 1px solid #444;
  padding-bottom: 3px;
  color: #222;
  font-weight: bold;
`;

const Row = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 6px;
  align-items: flex-start;
`;

const Label = styled.div`
  font-weight: bold;
  color: #333;
  font-size: 13px;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const SmallField = styled(Field)`
  flex: 0 0 120px;
`;

const Checkbox = styled.span`
  display: inline-block;
  min-width: 80px;
`;

const SignatureArea = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: space-between;
  padding: 0 40px;
`;

const SignatureBlock = styled.div`
  text-align: center;
  width: 40%;
`;

const SignatureLine = styled.div`
  width: 100%;
  border-bottom: 1px solid #000;
  height: 40px;
  margin-bottom: 6px;
`;

type Props = {
  patient?: any;
  logoSrc?: string;
};

const yesNo = (val: any) => {
  if (val === true || val === "Sim" || val === "sim" || val === "S" ) return "Sim";
  if (val === false || val === "Não" || val === "Nâo" || val === "nao" || val === "Não") return "Não";
  return val ?? "-";
};

const FichaAvaliacaoPrint = forwardRef<HTMLDivElement, Props>(({ patient, logoSrc = `http://localhost/Clinica SANGE/Peojeto Clinica SANGE/src/assets/Logo_pdf.png` }, ref) => {
  return (
    <HiddenWrapper ref={ref}>
     
      <Container>

        {/* Header */}
        <Header>
          
          <div style={{ flex: 1 }}>
            <Logo src={logoSrc} alt="SANGE" onError={(e) => { const el = e.currentTarget as HTMLImageElement; el.style.display = 'none'; }} />
            <Title>Ficha de avaliação de fisioterapia</Title>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "6px", fontSize: "13px" }}>
              <div><strong>Data da avaliação:</strong> {patient?.sessionAvaliationDate ?? "-"}</div>
              <div><SignatureLine /><strong>Autorização nº</strong></div>
            </div>
          </div>
        </Header>

        {/* Identificação / Dados pessoais */}
        <Section>
          <SectionTitle>Dados pessoais</SectionTitle>

          <Row>
            <Field>
              <Label>Nome</Label>
              {patient?.patientName ?? "-"}
            </Field>
            <SmallField>
              <Label>Carteirinha</Label>
              {patient?.patientCardNum ?? "-"}
            </SmallField>
            <SmallField>
              <Label>Sexo</Label>
              {patient?.patientGender ?? "-"}
            </SmallField>
          </Row>

          <Row>
            <SmallField>
              <Label>Data avaliação</Label>
              {patient?.sessionAvaliationDate ?? "-"}
            </SmallField>
            <SmallField>
              <Label>Autorização nº</Label>
              {patient?.authorizationNumber ?? patient?.patientAuthorization ?? "-"}
            </SmallField>
            <SmallField>
              <Label>Idade</Label>
              {patient?.patientAge ?? "-"}
            </SmallField>
            <SmallField>
              <Label>Peso</Label>
              {patient?.patientWeight ?? "-"}
            </SmallField>
            <SmallField>
              <Label>Altura</Label>
              {patient?.patientHeight ?? "-"}
            </SmallField>
          </Row>

          <Row>
            <Field>
              <Label>Profissão</Label>
              {patient?.patientProfession ?? "-"}
            </Field>
            <Field>
              <Label>Endereço</Label>
              Rua {patient?.addressStreet ?? "-"}, Nº {patient?.addressNumber ?? "-"} {patient?.addressComplement ? `- ${patient.addressComplement}` : ""}
            </Field>
          </Row>

          <Row>
            <Field>
              <Label>Cidade</Label>
              {patient?.addressCity ?? "-"} - {patient?.addressState ?? "-"}
            </Field>
            <Field>
              <Label>Telefone</Label>
              {patient?.patientNumber ?? "-"}
            </Field>
            <SmallField>
              <Label>Fumante</Label>
              {yesNo(patient?.patientSmoker)}
            </SmallField>
          </Row>
        </Section>

        {/* Dados da patologia */}
        <Section>
          <SectionTitle>Dados da patologia</SectionTitle>

          <Row>
            <Field>
              <Label>Diagnóstico clínico</Label>
              {patient?.patologyDiagnostic ?? "-"}
            </Field>
          </Row>

          <Row>
            <Field>
              <Label>HMA</Label>
              {patient?.patologyHMA ?? "-"}
            </Field>
          </Row>

          <Row>
            <SmallField>
              <Label>Fez alguma cirurgia?</Label>
              {yesNo(patient?.patologyHadSurgery)}
            </SmallField>
            <Field>
              <Label>Antecedentes pessoais / Patologia associada</Label>
              {patient?.patologyPersonalBackground ?? "-"} {patient?.patologyAssociatedPatology ? ` / ${patient.patologyAssociatedPatology}` : ""}
            </Field>
          </Row>

          <Row>
            <Field>
              <Label>Toma algum medicamento?</Label>
              {patient?.patologyTakeMeds ?? "-"}
            </Field>
          </Row>

          <Row>
            <SmallField>
              <Label>Quando começou a dor?</Label>
              {patient?.patologyWhenStarted ?? "-"}
            </SmallField>
            <Field>
              <Label>Em qual posição a dor é mais intensa?</Label>
              {patient?.patologyMoreIntensePosition ?? "-"}
            </Field>
          </Row>

          <Row>
            <Field>
              <Label>Qual a sua posição de trabalho?</Label>
              {patient?.patologyWorkPosition ?? "-"}
            </Field>
          </Row>

          <Row>
            <SmallField>
              <Label>Há comprometimento das AVS’s?</Label>
              {yesNo(patient?.patologyAVS)}
            </SmallField>
            <SmallField>
              <Label>Comprometimento de marcha?</Label>
              {yesNo(patient?.patologyMarcha)}
            </SmallField>
          </Row>

          <Row>
            <Field>
              <Label>Limitação funcional</Label>
              {patient?.patologyFunctionalLimitation ?? "-"}
            </Field>
          </Row>

          <Row>
            <SmallField>
              <Label>Data</Label>
              {patient?.patologyDate ?? "-"}
            </SmallField>
            <Field>
              <Label>Exames complementares</Label>
              {patient?.patologyComplementaryExams ?? "-"}
            </Field>
          </Row>
        </Section>

        {/* Exame físico */}
        <Section>
          <SectionTitle>Exame físico</SectionTitle>

          <Row>
            <SmallField>
              <Label>PA</Label>
              {patient?.examPA ?? "-"}
            </SmallField>
            <SmallField>
              <Label>FR</Label>
              {patient?.examFR ?? "-"}
            </SmallField>
            <SmallField>
              <Label>FC</Label>
              {patient?.examFC ?? "-"}
            </SmallField>
          </Row>

          <Row>
            <Field>
              <Label>Inspeção</Label>
              {patient?.examInspection ?? "-"}
            </Field>
          </Row>

          <Row>
            <Field>
              <Label>Palpação</Label>
              {patient?.examPalpation ?? "-"}
            </Field>
          </Row>

          <Row>
            <SmallField>
              <Label>Dor à palpação</Label>
              {yesNo(patient?.examPainPalpation)}
            </SmallField>
            <Field>
              <Label>Testes específicos</Label>
              {patient?.examSpecificTests ?? "-"}
            </Field>
          </Row>

          <Row>
            <SmallField>
              <Label>Edema</Label>
              {yesNo(patient?.examEdema)}
            </SmallField>
            <SmallField>
              <Label>ADM</Label>
              {patient?.examADM ?? "-"} {patient?.examADMDesc ? `- ${patient.examADMDesc}` : ""}
            </SmallField>
            <SmallField>
              <Label>FM</Label>
              {patient?.examFM ?? "-"} {patient?.examFMDesc ? `- ${patient.examFMDesc}` : ""}
            </SmallField>
          </Row>

          <Row>
            <Field>
              <Label>Tônus Muscular</Label>
              {patient?.examMuscularTonus ?? "-"} {patient?.examMuscularTonusDesc ? `- ${patient.examMuscularTonusDesc}` : ""}
            </Field>
          </Row>

          <Row>
            <Field>
              <Label>Movimento</Label>
              {patient?.examMovement ?? "-"}
            </Field>
            <Field>
              <Label>Faz uso de órtese</Label>
              {yesNo(patient?.examOrtese)} {patient?.examOrteseDesc ? `- ${patient.examOrteseDesc}` : ""}
            </Field>
          </Row>

          <Row>
            <Field>
              <Label>Desvios Posturais</Label>
              {yesNo(patient?.examPosturalDeviations)}
            </Field>
          </Row>

          <Row>
            <Field>
              <Label>Descrição dos desvios posturais</Label>
              {patient?.examPosturalDeviationsDesc ?? "-"}
            </Field>
          </Row>
        </Section>

        {/* Tratamento fisioterápico */}
        <Section>
          <SectionTitle>Tratamento fisioterápico</SectionTitle>

          <Row>
            <Field>
              <Label>Objetivos do tratamento</Label>
              {patient?.traTreatmentObjective ?? "-"}
            </Field>
          </Row>

          <Row>
            <Field>
              <Label>Tratamento proposto</Label>
              {patient?.traProposedTreatment ?? "-"}
            </Field>
          </Row>
        </Section>

        {/* Rodapé / metadados */}
        <Section>
          <Row>
            <Field>
              <Label>Número da guia / última edição</Label>
              {patient?.sessionLastEdit ?? patient?.patientGuideNumber ?? "-"}
            </Field>
            <Field>
              <Label>Convênio</Label>
              {patient?.patientTypeAgreement ?? "-"}
            </Field>
          </Row>
        </Section>

        {/* Assinaturas */}
        <SignatureArea>
          <SignatureBlock>
            <SignatureLine />
            Assinatura fisioterapeuta
          </SignatureBlock>

          <SignatureBlock>
            <SignatureLine />
            Assinatura beneficiário
          </SignatureBlock>
        </SignatureArea>

      </Container>
    </HiddenWrapper>
  );
});

export default FichaAvaliacaoPrint;


