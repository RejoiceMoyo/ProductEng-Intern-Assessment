export interface Person {
  id: string;
  name: string;
  picture?: string;
  professionalHeadline?: string;
  username: string;
  verified: boolean;
  weight: number;
}

export interface Strength {
  id: string;
  code: number;
  name: string;
  weight: number;
  recommendations: number;
}

export interface GenomeData {
  person: Person;
  strengths: Strength[];
}