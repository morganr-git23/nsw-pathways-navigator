
export enum Domain {
  Language = "language",
  Literacy = "literacy",
  Numeracy = "numeracy",
  Digital = "digital"
}

export interface Answer {
  id: string;
  text: string;
  value: number;
}

export interface Question {
  id: string;
  text: string;
  domain: Domain;
  weight: number;
  answers: Answer[];
}

export interface UserResponse {
  questionId: string;
  answerId: string;
  value: number;
}

export interface DomainScore {
  domain: Domain;
  score: number;
  level: number;
  maxPossible: number;
}

export interface Result {
  domainScores: {
    [key in Domain]: DomainScore;
  };
  overallLevel: number;
  recommendedPathway: string;
  pathwayDetails: string;
  acsf: {
    level: number;
    description: string;
  };
}

export enum UserRole {
  User = "user",
  Admin = "admin"
}

export interface User {
  id: string;
  email: string;
  role: UserRole;
  name?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
}
