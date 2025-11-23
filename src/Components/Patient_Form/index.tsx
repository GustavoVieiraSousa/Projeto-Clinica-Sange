import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog.tsx";
import { Button } from "../../Components/ui/button";
import { Input } from "../../Components/ui/input";
import { Label } from "../../Components/ui/label";
import { Textarea } from "../../Components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../Components/ui/select";
import { useState, useEffect } from "react";
import * as S from "./styles";
import { toast } from "sonner";


interface PatientFormProps {
  patientCode: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdated: () => void; // novo callback
}


const PatientForm = ({ patientCode, open, onOpenChange, onUpdated }: PatientFormProps) => {


  console.log("PatientForm: ", patientCode);
  const [patientData, setPatientData] = useState<any[]>([]);
  const [sessionCode, setSessionCode] = useState<number>(0);

  const [formData, setFormData] = useState({
    // Dados Pessoais
    name: "",
    email: "",
    phone: "",
    cpf: "",
    birthDate: "",
    cardNumber: "",
    agreement:"",
    age: "",
    gender: "Masculino" as "Masculino" | "Feminino" | "Outro",
    maritalStatus: "",
    weight: "",
    height: "",
    profession: "",
    addressStreet: "",
    addressNeighborhood: "",
    addressNumber: "",
    addressComplement: "",
    addressCEP:"",
    PatientLevel:"0" as "0" | "1" | "2",

    city: "",
    smoker: false,
    
    // Dados da Patologia
    clinicalDiagnosis: "",
    hma: "",
    personalHistory: "",
    associatedPathology: "",
    medication: "",
    painStart: "",
    painPosition: "",
    backPain:"Leve" as "Leve"|"Média"|"Alta" | "Nenhuma",
    backPainDesc:"",
    upperPain:"Leve" as "Leve"|"Média"|"Alta"| "Nenhuma",
    upperPainDesc:"",
    lowerPain:"Leve" as "Leve"|"Média"|"Alta"|"Nenhuma",
    lowerPainDesc:"",
    horarioSessao:"",
    dayStartTreatment:"",
    avaliationDay:"",
    QTDsessao:"",
    segundaFeira:false,
    tercaFeira:false,
    quartaFeira:false,
    quintaFeira:false,
    sextaFeira:false,

    workPosition: "",
    surgery: "",
    surgeryDate: "",
    complementaryExams: "",
    avsCompromise: "",
    functionalLimitation: "",
    gaitCompromise: "",
    
    // Exame Físico
    bloodPressure: "",
    respiratoryRate: "",
    heartRate: "",
    inspection: "",
    palpation: "",
    palpationPain: false,
    palpationPainDesc:"",
    edema: false,
    edemaDesc:"",
    specificTests: "",
    adm: "0" as "0" | "1" | "2",
    ADMDesc:"",
    fm: "0" as "0" | "1" | "2",
    FMDesc:"",
    muscleTone: "0" as "0" | "1" | "2",
    tonusMuscDesc:"",
    movement: "0" as "0" | "1" | "2",
    orthesisUse: false,
    orthesisType: "",
    posturalDeviations: false,
    posturalDeviationsDescription: "",
    
    // Tratamento
    treatmentObjectives: "",
    proposedTreatment: "",
    
    // Observações
    observations: "",
    lastEditedBy: "",
  });

  useEffect(() => {
  console.log("Antes: AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    
    if (patientCode !== 0) {
        (async () => {
          try {
            console.log("useEffect:", patientCode);
            const url = `http://localhost/Projeto-Clinica-Sange/src/php/getPatientDescription.php?patientCode=${patientCode}`;
            const res = await fetch(url);
            console.log('fetch status', res.status, res.statusText);
            const json = await res.json();

            if (json && Array.isArray(json.data)) {
              console.log("json.data[0]:", json.data);
              const p = json.data[0]; // objeto do paciente
              setPatientData(json.data);
              setSessionCode(p.sessionCode || 0);
              setFormData({
                //paciente
                name: p.patientName || "",
                email: p.patientEmail || "",
                phone: p.patientNumber || "",
                cpf: p.patientCPF || "",
                birthDate: p.birthDateRaw || "",
                cardNumber: p.patientCardNum || "",
                agreement: p.patientTypeAgreement || "",
                age: p.patientAge || "",
                gender: p.patientGender || "Outro",
                maritalStatus: p.patientMaritalStatus || "",
                weight: p.patientWeight || "",
                height: p.patientHeight || "",
                profession: p.patientProfession || "",
                smoker: p.patientSmoker || false,
                PatientLevel: p.patientLevel.toString() || "0",

                //endereco
                addressStreet: p.addressStreet || "",
                addressNeighborhood: p.addressNeighborhood || "",
                addressNumber: p.addressNumber || "",
                addressComplement: p.addressComplement || "",
                addressCEP: p.addressCEP || "",
                city: p.addressCity || "",
                
                //sessao
                backPain: p.sessionBack || "Nenhuma",
                backPainDesc: p.sessionBackDesc || "",
                upperPain: p.sessionSuperior || "Nenhuma",
                upperPainDesc: p.sessionSuperiorDesc || "",
                lowerPain: p.sessionInferior || "Nenhuma",
                lowerPainDesc: p.sessionInferiorDesc || "",
                avaliationDay: p.sessionAvaliationDate || "",
                observations: p.sessionDescription || "",
                lastEditedBy: p.sessionLastEdit || "",

                //patologia
                clinicalDiagnosis: p.pathologyDiagnostic || "",
                hma: p.pathologyHMA || "",
                personalHistory: p.pathologyPersonalBackground || "",
                associatedPathology: p.pathologyAssociated || "",
                medication: p.pathologyTakeMeds || "",
                painStart: p.pathologyWhenStarted || "",
                painPosition: p.pathologyMoreIntensePosition || "",
                workPosition:  p.pathologyWorkPosition || "",
                surgery: p.pathologyHadSurgery || "",
                surgeryDate:  p.pathologyDateSurgery || "",
                complementaryExams:  p.pathologyComplementaryExams || "",
                
                //diaHoraAgendado
                horarioSessao: p.dayTime || "",
                dayStartTreatment: p.dayDateStartSession || "",
                QTDsessao: p.dayQuantitySession || "0",
                segundaFeira: p.dayMonday || false,
                tercaFeira: p.dayTuesday || false,
                quartaFeira: p.dayWednesday || false,
                quintaFeira: p.dayThursday || false,
                sextaFeira: p.dayFriday || false,
                
                //exameFisico
                avsCompromise: p.pathologyAVS || "",
                functionalLimitation: p.pathologyFunctionalLimitation || "",
                gaitCompromise: p.pathologyMarcha || "",
                bloodPressure: p.examPA || "",
                respiratoryRate: p.examFR || "",
                heartRate: p.examFC || "",
                inspection: p.examInspection || "",
                palpation: p.examPalpation || "",
                palpationPain: p.examPainPalpation|| false,
                palpationPainDesc: p.examPainPalpationDesc || "",
                //TODO: adicionar palpationPainDesc
                // palpationPainDesc: p.examPalpationPainDesc || "",
                edema: p.examEdema || false,
                edemaDesc: p.examEdemaDesc || "",
                //TODO: adicionar edemaDesc
                // edemaDesc: p.examEdemaDesc || "",
                specificTests: p.examSpecificTests || "",
                adm: p.examADM.toString() || "0",
                ADMDesc: p.examADMDesc || "",
                //TODO: adicionar admDesc
                //admDesc: p.examADMDesc || "",
                fm: p.examFM.toString() || "0",
                FMDesc: p.examFMDesc || "",
                //TODO: adicionar fmDesc
                //fmDesc: p.examFMDesc || "",
                muscleTone: p.examMuscularTonus.toString() || "0",
                tonusMuscDesc: p.examMuscularTonusDesc || "",
                //TODO: adicionar MuscularDesc
                //muscleToneDesc: p.examMuscularTonusDesc || "",
                movement: p.examMovement.toString() || "0",
                orthesisUse: p.examOrtese || false,
                orthesisType: p.examOrteseDesc || "",
                posturalDeviations: p.examPosturalDeviations || false,
                posturalDeviationsDescription: p.examPosturalDeviationsDesc || "",
                
                //tratamento
                treatmentObjectives: p.traTreatmentObjective || "",
                proposedTreatment: p.traProposedTreatment || "",
              });

            } else {
              setPatientData([]);
              console.warn('Unexpected Error', json);
            }

          } catch (err) {
            console.error('Error getting data (when patientCode changed):', err);
          }
        })();
      
    }
    else{
      setFormData({
        // Dados Pessoais
        name: "",
        email: "",
        phone: "",
        cpf: "",
        birthDate: "",
        cardNumber: "",
        agreement:"",
        age: "",
        gender: "Outro",
        maritalStatus: "",
        weight: "",
        height: "",
        profession: "",
        addressStreet: "",
        addressNeighborhood: "",
        addressNumber: "",
        addressComplement: "",
        addressCEP:"",
        PatientLevel:"0",

        city: "",
        smoker: false,
        
        // Dados da Patologia
        clinicalDiagnosis: "",
        hma: "",
        personalHistory: "",
        associatedPathology: "",
        medication: "",
        painStart: "",
        painPosition: "",
        backPain:"Leve",
        backPainDesc:"",
        upperPain:"Leve",
        upperPainDesc:"",
        lowerPain:"Leve",
        lowerPainDesc:"",
        horarioSessao:"",
        dayStartTreatment:"",
        avaliationDay:"",
        QTDsessao: "",
        segundaFeira:false,
        tercaFeira:false,
        quartaFeira:false,
        quintaFeira:false,
        sextaFeira:false,

        workPosition: "",
        surgery: "",
        surgeryDate: "",
        complementaryExams: "",
        avsCompromise: "",
        functionalLimitation: "",
        gaitCompromise: "",
        
        // Exame Físico
        bloodPressure: "",
        respiratoryRate: "",
        heartRate: "",
        inspection: "",
        palpation: "",
        palpationPain: false,
        palpationPainDesc:"",
        edema: false,
        edemaDesc:"",
        specificTests: "",
        adm: "0",
        ADMDesc: "",
        fm: "0",
        FMDesc:"",
        muscleTone: "0",
        tonusMuscDesc:"",
        movement: "0",
        orthesisUse: false,
        orthesisType: "",
        posturalDeviations: false,
        posturalDeviationsDescription: "",
        
        // Tratamento
        treatmentObjectives: "",
        proposedTreatment: "",
        
        // Observações
        observations: "",
        lastEditedBy: "",
      })
    }
  }, [patientCode]);

  const addToDatabase = async () => {
    try{
      fetch(`http://localhost/Projeto-Clinica-Sange/src/php/addPatientData.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data: formData })
      })
      .then(async (response) => {
        const text = await response.text();
        try {
          const json = JSON.parse(text);
          console.log("JSON recebido:", json);
        } catch (err) {
          console.error("Resposta não é JSON. Conteúdo bruto:", text);
        }
      })
      .catch((error) => {
        console.error("Erro na requisição:", error);
      });
    } catch (err){
      console.error('Error sending data to database:', err);
    }
  }

  const editToDatabase = async () => {
    try{
      console.log("editToDatabase:", patientCode);

      fetch(`http://localhost/Projeto-Clinica-Sange/src/php/editPatientData.php?patientCode=${patientCode}&sessionCode=${sessionCode}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data: formData })
      })
      .then(async (response) => {
        const text = await response.text();
        try {
          const json = JSON.parse(text);
          console.log("JSON recebido:", json);
        } catch (err) {
          console.error("Resposta não é JSON. Conteúdo bruto:", text);
        }
      })
      .catch((error) => {
        console.error("Erro na requisição:", error);
      });
    } catch (err){
      console.error('Error sending data to database:', err);
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("handleSubmit:", patientCode);

    if (patientCode !== 0) {
      await editToDatabase();
      toast.success("Dados do paciente atualizados!");
    } else {
      await addToDatabase();
      toast.success("Novo paciente cadastrado!");
    }

    if (onUpdated) onUpdated();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {(patientCode !== 0) ? "Editar Ficha de Avaliação" : "Nova Ficha de Avaliação"}
          </DialogTitle>
        </DialogHeader>

        <S.Form onSubmit={handleSubmit}>
          {/* Dados Pessoais */}
          <S.Section>
            <S.SectionTitle>Dados Pessoais</S.SectionTitle>
            
            <S.FormField>
              <Label htmlFor="name">Nome Completo *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </S.FormField>
            <S.FormField>
                <Label htmlFor="typePatient">Qual o tipo do Paciente?</Label>
                <Select
                  value={formData.PatientLevel}
                  required
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  onValueChange={(value) => setFormData({ ...formData, PatientLevel: value as any })}
                >
                  <SelectTrigger id="typePatient">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Avaliação</SelectItem>
                    <SelectItem value="1">Especial</SelectItem>
                    <SelectItem value="2">Normal</SelectItem>
                  </SelectContent>
                </Select>
              </S.FormField>

              <S.FormField>
              <Label htmlFor="avaliationDay">Data da Avaliação</Label>
              <Input
                  id="avaliationDay"
                  required
                  type="date"
                  value={formData.avaliationDay}
                  onChange={(e) => setFormData({ ...formData, avaliationDay: e.target.value })}
                />
            </S.FormField>

            <S.FormGrid>
              <S.FormField>
                <Label htmlFor="cardNumber">Nº Carteirinha</Label>
                <Input
                  id="cardNumber"
                  value={formData.cardNumber}
                  onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                />
              </S.FormField>

              <S.FormField>
                <Label htmlFor="agreement">Convênio</Label>
                <Input
                  id="agreement"
                  value={formData.agreement}
                  onChange={(e) => setFormData({ ...formData, agreement: e.target.value })}
                />
              </S.FormField>

              <S.FormField>
                <Label htmlFor="gender">Sexo</Label>
                <Select
                  value={formData.gender}
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  onValueChange={(value) => setFormData({ ...formData, gender: value as any })}
                >
                  <SelectTrigger id="gender">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Masculino">Masculino</SelectItem>
                    <SelectItem value="Feminino">Feminino</SelectItem>
                    <SelectItem value="Outro">Outro</SelectItem>
                  </SelectContent>
                </Select>
              </S.FormField>

              <S.FormField>
                <Label htmlFor="maritalStatus">Estado Civil</Label>
                <Input
                  id="maritalStatus"
                  value={formData.maritalStatus}
                  onChange={(e) => setFormData({ ...formData, maritalStatus: e.target.value })}
                />
              </S.FormField>

              <S.FormField>
                <Label htmlFor="weight">Peso (kg)</Label>
                <Input
                  id="weight"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                />
              </S.FormField>

              <S.FormField>
                <Label htmlFor="height">Altura (cm)</Label>
                <Input
                  id="height"
                  value={formData.height}
                  onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                />
              </S.FormField>

              <S.FormField>
                <Label htmlFor="profession">Profissão</Label>
                <Input
                  id="profession"
                  value={formData.profession}
                  onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                />
              </S.FormField>

              <S.FormField>
                <Label htmlFor="city">Cidade</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                />
              </S.FormField>

              <S.FormField>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </S.FormField>

              <S.FormField>
                <Label htmlFor="phone">Telefone *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </S.FormField>

              <S.FormField>
                <Label htmlFor="cpf">CPF</Label>
                <Input
                  id="cpf"
                  value={formData.cpf}
                  onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
                />
              </S.FormField>

              <S.FormField>
                <Label htmlFor="birthDate">Data de Nascimento</Label>
                <Input
                  id="birthDate"
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                />
              </S.FormField>

              <S.FormField>
                <Label htmlFor="smoker">Fumante</Label>
                <Select
                  value={formData.smoker ? "sim" : "nao"}
                  onValueChange={(value) => setFormData({ ...formData, smoker: value === "sim" })}
                >
                  <SelectTrigger id="smoker">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sim">Sim</SelectItem>
                    <SelectItem value="nao">Não</SelectItem>
                  </SelectContent>
                </Select>
              </S.FormField>
            </S.FormGrid>

            <S.FormField>
              <Label htmlFor="address">Rua</Label>
              <Input
                id="address"
                value={formData.addressStreet}
                onChange={(e) => setFormData({ ...formData, addressStreet: e.target.value })}
              />
            </S.FormField>
            <S.FormField>
              <Label htmlFor="address">Número</Label>
              <Input
                id="address"
                value={formData.addressNumber}
                onChange={(e) => setFormData({ ...formData, addressNumber: e.target.value })}
              />
            </S.FormField>
            <S.FormField>
              <Label htmlFor="address">Bairro</Label>
              <Input
                id="address"
                value={formData.addressNeighborhood}
                onChange={(e) => setFormData({ ...formData, addressNeighborhood: e.target.value })}
              />
            </S.FormField>
            <S.FormField>
              <Label htmlFor="address">Complemento</Label>
              <Input
                id="address"
                value={formData.addressComplement}
                onChange={(e) => setFormData({ ...formData, addressComplement: e.target.value })}
              />
            </S.FormField>
            <S.FormField>
              <Label htmlFor="address">CEP</Label>
              <Input
                id="address"
                value={formData.addressCEP}
                onChange={(e) => setFormData({ ...formData, addressCEP: e.target.value })}
              />
            </S.FormField>
          </S.Section>

          {/* Dados da Consulta (sessão) */}
          <S.Section>
            <S.SectionTitle>Dados da Sessão</S.SectionTitle>

            

            <S.FormField>
              <Label htmlFor="dayStartTreatment">Data inicio do tratamento</Label>
              <Input
                  id="dayStartTreatment"
                  type="date"
                  value={formData.dayStartTreatment}
                  onChange={(e) => setFormData({ ...formData, dayStartTreatment: e.target.value })}
                />
            </S.FormField>

            <S.FormField>
              <Label htmlFor="horarioSessao">Horário das sessões</Label>
              <Input
                  id="horarioSessao"
                  type="time"
                  value={formData.horarioSessao}
                  onChange={(e) => setFormData({ ...formData, horarioSessao: e.target.value })}
                />
            </S.FormField>

            <S.FormField>
              <Label htmlFor="personalHistory">Quantidade de sessões</Label>
              <Input
                  id="age"
                  value={formData.QTDsessao}
                  onChange={(e) => setFormData({ ...formData, QTDsessao: e.target.value })}
                />
            </S.FormField>

           
            <S.FormGrid>
             <S.FormField>
                <Label htmlFor="Monday">Vai Segunda-Feira?</Label>
                <Select
                  value={formData.segundaFeira ? "sim" : "nao"}
                  onValueChange={(value) => setFormData({ ...formData, segundaFeira: value === "sim" })}
                >
                  <SelectTrigger id="Monday">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sim">Sim</SelectItem>
                    <SelectItem value="nao">Não</SelectItem>
                  </SelectContent>
                </Select>
              </S.FormField>

               <S.FormField>
                <Label htmlFor="Tuesday">Vai Terça-Feira?</Label>
                <Select
                  value={formData.tercaFeira ? "sim" : "nao"}
                  onValueChange={(value) => setFormData({ ...formData, tercaFeira: value === "sim" })}
                >
                  <SelectTrigger id="Tuesday">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sim">Sim</SelectItem>
                    <SelectItem value="nao">Não</SelectItem>
                  </SelectContent>
                </Select>
              </S.FormField>

            <S.FormField>
                <Label htmlFor="Wednesday">Vai Quarta-Feira?</Label>
                <Select
                  value={formData.quartaFeira ? "sim" : "nao"}
                  onValueChange={(value) => setFormData({ ...formData, quartaFeira: value === "sim" })}
                >
                  <SelectTrigger id="Wednesday">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sim">Sim</SelectItem>
                    <SelectItem value="nao">Não</SelectItem>
                  </SelectContent>
                </Select>
              </S.FormField>

               <S.FormField>
                <Label htmlFor="Thursday">Vai Quinta-Feira?</Label>
                <Select
                  value={formData.quintaFeira ? "sim" : "nao"}
                  onValueChange={(value) => setFormData({ ...formData, quintaFeira: value === "sim" })}
                >
                  <SelectTrigger id="Thursday">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sim">Sim</SelectItem>
                    <SelectItem value="nao">Não</SelectItem>
                  </SelectContent>
                </Select>
              </S.FormField>

                <S.FormField>
                <Label htmlFor="Friday">Vai Sexta-Feira?</Label>
                <Select
                  value={formData.sextaFeira ? "sim" : "nao"}
                  onValueChange={(value) => setFormData({ ...formData, sextaFeira: value === "sim" })}
                >
                  <SelectTrigger id="Friday">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sim">Sim</SelectItem>
                    <SelectItem value="nao">Não</SelectItem>
                  </SelectContent>
                </Select>
              </S.FormField>

                
            </S.FormGrid>

            

          </S.Section>

          <S.Section>
            <S.SectionTitle>Dados da Patologia</S.SectionTitle>

            <S.FormField>
              <Label htmlFor="clinicalDiagnosis">Diagnóstico Clínico</Label>
              <Textarea
                id="clinicalDiagnosis"
                value={formData.clinicalDiagnosis}
                onChange={(e) => setFormData({ ...formData, clinicalDiagnosis: e.target.value })}
                rows={2}
              />
            </S.FormField>

            <S.FormField>
              <Label htmlFor="hma">HMA (História da Moléstia Atual)</Label>
              <Textarea
                id="hma"
                value={formData.hma}
                onChange={(e) => setFormData({ ...formData, hma: e.target.value })}
                rows={3}
              />
            </S.FormField>

            <S.FormField>
              <Label htmlFor="personalHistory">Antecedentes Pessoais</Label>
              <Textarea
                id="personalHistory"
                value={formData.personalHistory}
                onChange={(e) => setFormData({ ...formData, personalHistory: e.target.value })}
                rows={2}
              />
            </S.FormField>

            <S.FormField>
              <Label htmlFor="associatedPathology">Patologia Associada</Label>
              <Textarea
                id="associatedPathology"
                value={formData.associatedPathology}
                onChange={(e) => setFormData({ ...formData, associatedPathology: e.target.value })}
                rows={2}
              />
            </S.FormField>

            <S.FormField>
              <Label htmlFor="medication">Medicamentos em Uso</Label>
              <Textarea
                id="medication"
                value={formData.medication}
                onChange={(e) => setFormData({ ...formData, medication: e.target.value })}
                rows={2}
              />
            </S.FormField>

            <S.FormGrid>
              <S.FormField>
                <Label htmlFor="painStart">Quando começou a dor?</Label>
                <Input
                  id="painStart"
                  value={formData.painStart}
                  onChange={(e) => setFormData({ ...formData, painStart: e.target.value })}
                />
              </S.FormField>

              <S.FormField>
                <Label htmlFor="painPosition">Posição de maior intensidade da dor</Label>
                <Input
                  id="painPosition"
                  value={formData.painPosition}
                  onChange={(e) => setFormData({ ...formData, painPosition: e.target.value })}
                />
              </S.FormField>

              <S.FormField>
                <Label htmlFor="workPosition">Posição de trabalho</Label>
                <Input
                  id="workPosition"
                  value={formData.workPosition}
                  onChange={(e) => setFormData({ ...formData, workPosition: e.target.value })}
                />
              </S.FormField>

              <S.FormField>
                <Label htmlFor="surgery">Cirurgia anterior</Label>
                <Input
                  id="surgery"
                  value={formData.surgery}
                  onChange={(e) => setFormData({ ...formData, surgery: e.target.value })}
                />
              </S.FormField>

              <S.FormField>
                <Label htmlFor="surgeryDate">Data da cirurgia</Label>
                <Input
                  id="surgeryDate"
                  type="date"
                  value={formData.surgeryDate}
                  onChange={(e) => setFormData({ ...formData, surgeryDate: e.target.value })}
                />
              </S.FormField>
            </S.FormGrid>

            <S.FormField>
              <Label htmlFor="complementaryExams">Exames Complementares</Label>
              <Textarea
                id="complementaryExams"
                value={formData.complementaryExams}
                onChange={(e) => setFormData({ ...formData, complementaryExams: e.target.value })}
                rows={2}
              />
            </S.FormField>

            <S.FormField>
              <Label htmlFor="avsCompromise">Comprometimento das AVS's</Label>
              <Textarea
                id="avsCompromise"
                value={formData.avsCompromise}
                onChange={(e) => setFormData({ ...formData, avsCompromise: e.target.value })}
                rows={2}
              />
            </S.FormField>

            <S.FormField>
              <Label htmlFor="functionalLimitation">Limitação Funcional</Label>
              <Textarea
                id="functionalLimitation"
                value={formData.functionalLimitation}
                onChange={(e) => setFormData({ ...formData, functionalLimitation: e.target.value })}
                rows={2}
              />
            </S.FormField>

            <S.FormField>
              <Label htmlFor="gaitCompromise">Comprometimento de Marcha</Label>
              <Textarea
                id="gaitCompromise"
                value={formData.gaitCompromise}
                onChange={(e) => setFormData({ ...formData, gaitCompromise: e.target.value })}
                rows={2}
              />
            </S.FormField>

            <S.FormField>
              <Label htmlFor="backPain">Dores nas Costas</Label>
               <Select
                  value={formData.backPain}
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  onValueChange={(value) => setFormData({ ...formData, backPain: value as any })}
                >
                  <SelectTrigger id="backPain">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Nenhuma</SelectItem>
                    <SelectItem value="low">Leve</SelectItem>
                    <SelectItem value="medium">Média</SelectItem>
                    <SelectItem value="high">Alta</SelectItem>
                  </SelectContent>
                </Select>
                <Textarea
                    id="backPainDesc"
                    value={formData.backPainDesc}
                    onChange={(e) => setFormData({ ...formData, backPainDesc: e.target.value })}
                    rows={2}
              />
            </S.FormField>

             <S.FormField>
              <Label htmlFor="upperPain">Dores na parte superior</Label>
               <Select
                  value={formData.upperPain}
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  onValueChange={(value) => setFormData({ ...formData, upperPain: value as any })}
                >
                  <SelectTrigger id="upperPain">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Nenhuma</SelectItem>
                    <SelectItem value="low">Leve</SelectItem>
                    <SelectItem value="medium">Média</SelectItem>
                    <SelectItem value="high">Alta</SelectItem>
                  </SelectContent>
                </Select>
                <Textarea
                    id="upperPainDesc"
                    value={formData.upperPainDesc}
                    onChange={(e) => setFormData({ ...formData, upperPainDesc: e.target.value })}
                    rows={2}
              />
            </S.FormField>

             <S.FormField>
              <Label htmlFor="lowerPain">Dores nas Partes inferiores</Label>
               <Select
                  value={formData.lowerPain}
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  onValueChange={(value) => setFormData({ ...formData, lowerPain: value as any })}
                >
                  <SelectTrigger id="lowerPain">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Nenhuma</SelectItem>
                    <SelectItem value="low">Leve</SelectItem>
                    <SelectItem value="medium">Média</SelectItem>
                    <SelectItem value="high">Alta</SelectItem>
                  </SelectContent>
                </Select>
                <Textarea
                    id="lowerPainDesc"
                    value={formData.lowerPainDesc}
                    onChange={(e) => setFormData({ ...formData, lowerPainDesc: e.target.value })}
                    rows={2}
              />
            </S.FormField>

          </S.Section>

          {/* Exame Físico */}
          <S.Section>
            <S.SectionTitle>Exame Físico</S.SectionTitle>

            <S.FormGrid>
              <S.FormField>
                <Label htmlFor="bloodPressure">PA (Pressão Arterial)</Label>
                <Input
                  id="bloodPressure"
                  value={formData.bloodPressure}
                  onChange={(e) => setFormData({ ...formData, bloodPressure: e.target.value })}
                  placeholder="120/80"
                />
              </S.FormField>

              <S.FormField>
                <Label htmlFor="respiratoryRate">FR (Frequência Respiratória)</Label>
                <Input
                  id="respiratoryRate"
                  value={formData.respiratoryRate}
                  onChange={(e) => setFormData({ ...formData, respiratoryRate: e.target.value })}
                />
              </S.FormField>

              <S.FormField>
                <Label htmlFor="heartRate">FC (Frequência Cardíaca)</Label>
                <Input
                  id="heartRate"
                  value={formData.heartRate}
                  onChange={(e) => setFormData({ ...formData, heartRate: e.target.value })}
                />
              </S.FormField>
            </S.FormGrid>

            <S.FormField>
              <Label htmlFor="inspection">Inspeção</Label>
              <Textarea
                id="inspection"
                value={formData.inspection}
                onChange={(e) => setFormData({ ...formData, inspection: e.target.value })}
                rows={3}
              />
            </S.FormField>

            <S.FormField>
              <Label htmlFor="palpation">Palpação</Label>
              <Textarea
                id="palpation"
                value={formData.palpation}
                onChange={(e) => setFormData({ ...formData, palpation: e.target.value })}
                rows={3}
              />
            </S.FormField>

            
              <S.FormField>
                <Label htmlFor="palpationPain">Dor à palpação</Label>
                <Select
                  value={formData.palpationPain ? "sim" : "nao"}
                  onValueChange={(value) => setFormData({ ...formData, palpationPain: value === "sim" })}
                >
                  <SelectTrigger id="palpationPain">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sim">Sim</SelectItem>
                    <SelectItem value="nao">Não</SelectItem>
                  </SelectContent>
                </Select>
              </S.FormField>
         {formData.palpationPain && (
              <S.FormField>
              <Label htmlFor="examPainPalpationDesc">Descrição da dor à palpação</Label>
              <Textarea
                id="examPainPalpationDesc"
                value={formData.palpationPainDesc}
                onChange={(e) => setFormData({ ...formData, palpationPainDesc: e.target.value })}
                rows={3}
              />
            </S.FormField>
         )}

              <S.FormField>
                <Label htmlFor="edema">Edema</Label>
                <Select
                  value={formData.edema ? "sim" : "nao"}
                  onValueChange={(value) => setFormData({ ...formData, edema: value === "sim" })}
                >
                  <SelectTrigger id="edema">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sim">Sim</SelectItem>
                    <SelectItem value="nao">Não</SelectItem>
                  </SelectContent>
                </Select>
              </S.FormField>
      {formData.edema && (
              <S.FormField>
              <Label htmlFor="edemaDesc">Descrição do Edema</Label>
              <Textarea
                id="edemaDesc"
                value={formData.edemaDesc}
                onChange={(e) => setFormData({ ...formData, edemaDesc: e.target.value })}
                rows={3}
              />
            </S.FormField>
      )}

              <S.FormField>
                <Label htmlFor="adm">ADM (Amplitude de Movimento)</Label>
                <Select
                  value={formData.adm}
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  onValueChange={(value) => setFormData({ ...formData, adm: value as any })}
                >
                  <SelectTrigger id="adm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Normal</SelectItem>
                    <SelectItem value="1">Diminuída</SelectItem>
                  </SelectContent>
                </Select>
              </S.FormField>

               <S.FormField>
              <Label htmlFor="ADMDesc">Descrição ADM</Label>
              <Textarea
                id="ADMDesc"
                value={formData.ADMDesc}
                onChange={(e) => setFormData({ ...formData, ADMDesc: e.target.value })}
                rows={3}
              />
            </S.FormField>

              <S.FormField>
                <Label htmlFor="fm">FM (Força Muscular)</Label>
                <Select
                  value={formData.fm}
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  onValueChange={(value) => setFormData({ ...formData, fm: value as any })}
                >
                  <SelectTrigger id="fm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Normal</SelectItem>
                    <SelectItem value="1">Diminuída</SelectItem>
                  </SelectContent>
                </Select>
              </S.FormField>

              <S.FormField>
              <Label htmlFor="FMDesc">Descrição FM</Label>
              <Textarea
                id="FMDesc"
                value={formData.FMDesc}
                onChange={(e) => setFormData({ ...formData, FMDesc: e.target.value })}
                rows={3}
              />
            </S.FormField>

              <S.FormField>
                <Label htmlFor="muscleTone">Tônus Muscular</Label>
                <Select
                  value={formData.muscleTone}
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  onValueChange={(value) => setFormData({ ...formData, muscleTone: value as any })}
                >
                  <SelectTrigger id="muscleTone">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Normal</SelectItem>
                    <SelectItem value="1">Hipotônico</SelectItem>
                    <SelectItem value="2">Hipertônico</SelectItem>
                  </SelectContent>
                </Select>
              </S.FormField>

              <S.FormField>
              <Label htmlFor="tonusMuscDesc">Descrição Tônus Muscular</Label>
              <Textarea
                id="tonusMuscDesc"
                value={formData.tonusMuscDesc}
                onChange={(e) => setFormData({ ...formData, tonusMuscDesc: e.target.value })}
                rows={3}
              />
            </S.FormField>


              <S.FormField>
                <Label htmlFor="movement">Movimento</Label>
                <Select
                  value={formData.movement}
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  onValueChange={(value) => setFormData({ ...formData, movement: value as any })}
                >
                  <SelectTrigger id="movement">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Ativo</SelectItem>
                    <SelectItem value="1">Passivo</SelectItem>
                    <SelectItem value="2">Ativo-Assistido</SelectItem>
                  </SelectContent>
                </Select>
              </S.FormField>

              <S.FormField>
                <Label htmlFor="orthesisUse">Faz uso de órtese</Label>
                <Select
                  value={formData.orthesisUse ? "sim" : "nao"}
                  onValueChange={(value) => setFormData({ ...formData, orthesisUse: value === "sim" })}
                >
                  <SelectTrigger id="orthesisUse">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sim">Sim</SelectItem>
                    <SelectItem value="nao">Não</SelectItem>
                  </SelectContent>
                </Select>
              </S.FormField>

              {formData.orthesisUse && (
                <S.FormField>
                  <Label htmlFor="orthesisType">Qual órtese?</Label>
                  <Input
                    id="orthesisType"
                    value={formData.orthesisType}
                    onChange={(e) => setFormData({ ...formData, orthesisType: e.target.value })}
                  />
                </S.FormField>
              )}

              <S.FormField>
                <Label htmlFor="posturalDeviations">Desvios Posturais</Label>
                <Select
                  value={formData.posturalDeviations ? "sim" : "nao"}
                  onValueChange={(value) => setFormData({ ...formData, posturalDeviations: value === "sim" })}
                >
                  <SelectTrigger id="posturalDeviations">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sim">Sim</SelectItem>
                    <SelectItem value="nao">Não</SelectItem>
                  </SelectContent>
                </Select>
              </S.FormField>
            

            {formData.posturalDeviations && (
              <S.FormField>
                <Label htmlFor="posturalDeviationsDescription">Descrição dos Desvios Posturais</Label>
                <Textarea
                  id="posturalDeviationsDescription"
                  value={formData.posturalDeviationsDescription}
                  onChange={(e) => setFormData({ ...formData, posturalDeviationsDescription: e.target.value })}
                  rows={2}
                />
              </S.FormField>
            )}

            <S.FormField>
              <Label htmlFor="specificTests">Testes Específicos</Label>
              <Textarea
                id="specificTests"
                value={formData.specificTests}
                onChange={(e) => setFormData({ ...formData, specificTests: e.target.value })}
                rows={3}
              />
            </S.FormField>
          </S.Section>

          {/* Tratamento Fisioterápico */}
          <S.Section>
            <S.SectionTitle>Tratamento Fisioterápico</S.SectionTitle>

            <S.FormField>
              <Label htmlFor="treatmentObjectives">Objetivos do Tratamento</Label>
              <Textarea
                id="treatmentObjectives"
                value={formData.treatmentObjectives}
                onChange={(e) => setFormData({ ...formData, treatmentObjectives: e.target.value })}
                rows={4}
              />
            </S.FormField>

            <S.FormField>
              <Label htmlFor="proposedTreatment">Tratamento Proposto</Label>
              <Textarea
                id="proposedTreatment"
                value={formData.proposedTreatment}
                onChange={(e) => setFormData({ ...formData, proposedTreatment: e.target.value })}
                rows={4}
              />
            </S.FormField>
          </S.Section>

          {/* Observações Gerais */}
          <S.Section>
            <S.SectionTitle>Observações Gerais</S.SectionTitle>

            <S.FormField>
              <Label htmlFor="observations">Observações Adicionais</Label>
              <Textarea
                id="observations"
                value={formData.observations}
                onChange={(e) => setFormData({ ...formData, observations: e.target.value })}
                rows={4}
              />
            </S.FormField>

            <S.FormField>
              <Label htmlFor="lastEditedBy">Última Edição Por (Nome do Fisioterapeuta)</Label>
              <Input
                id="lastEditedBy"
                value={formData.lastEditedBy}
                onChange={(e) => setFormData({ ...formData, lastEditedBy: e.target.value })}
                placeholder="Nome do fisioterapeuta"
              />
            </S.FormField>
          </S.Section>

          <S.ButtonContainer>
            <Button type="button" variant="outline" onClick={() => { onOpenChange(false); onUpdated(); }}>
              Cancelar
            </Button>
            <Button type="submit">
              {(patientCode !== 0) ? "Salvar Alterações" : "Cadastrar Paciente"}
            </Button>
          </S.ButtonContainer>
        </S.Form>
      </DialogContent>
    </Dialog>
  );
};

export default PatientForm;

