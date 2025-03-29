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

export type Thresholds = Record<Domain, number>;

export type Recommendations = Record<Domain, string>;
