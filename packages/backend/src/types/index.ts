export interface Answer {
  value: number;
  question_id: string;
}

export interface DomainMapping {
  question_id: string;
  domain: "depression" | "mania" | "anxiety" | "substance_use";
}

export interface AssessmentRequest {
  answers: Answer[];
}

export interface AssessmentResponse {
  results?: string[];
  error?: string;
}

export type Domain = DomainMapping["domain"];

export interface Thresholds {
  [key in Domain]: number;
}

export interface Recommendations {
  [key in Domain]: string;
}
