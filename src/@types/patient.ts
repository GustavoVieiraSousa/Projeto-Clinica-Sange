export interface BodyProblem {
  description: string;
  severity: "low" | "medium" | "high" | "none";
}

export interface BodyProblems {
  upper?: BodyProblem;
  lower?: BodyProblem;
  back?: BodyProblem;
}

export interface Patient {
  id: string;
  // Dados Pessoais
  name: string;
  email: string;
  phone: string;
  cpf: string;
  birthDate: string;
  cardNumber?: string;
  age?: string;
  gender?: "masculino" | "feminino" | "outro";
  maritalStatus?: string;
  weight?: string;
  height?: string;
  profession?: string;
  address: string;
  city?: string;
  smoker?: boolean;
  healthInsurance?: string;
  
  // Dados da Patologia
  clinicalDiagnosis?: string;
  hma?: string;
  personalHistory?: string;
  associatedPathology?: string;
  medication?: string;
  painStart?: string;
  painPosition?: string;
  workPosition?: string;
  surgery?: string;
  surgeryDate?: string;
  complementaryExams?: string;
  avsCompromise?: string;
  functionalLimitation?: string;
  gaitCompromise?: string;
  
  // Exame Físico
  bloodPressure?: string;
  respiratoryRate?: string;
  heartRate?: string;
  inspection?: string;
  palpation?: string;
  palpationPain?: boolean;
  edema?: boolean;
  specificTests?: string;
  adm?: "normal" | "diminuida";
  fm?: "normal" | "diminuida";
  muscleTone?: "normal" | "hipotonico" | "hipertonico";
  movement?: "ativo" | "passivo" | "ativo-assistido";
  orthesisUse?: boolean;
  orthesisType?: string;
  posturalDeviations?: boolean;
  posturalDeviationsDescription?: string;
  
  // Tratamento
  treatmentObjectives?: string;
  proposedTreatment?: string;
  
  // Observações
  observations?: string;
  bodyProblems?: BodyProblems;
  
  // Metadata
  createdAt: string;
  lastEditedBy?: string;
  lastEditedAt?: string;
}
