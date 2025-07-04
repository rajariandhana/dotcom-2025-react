export interface Project {
    slug : string;
    name : string;
    techs : string[];
    description : string;
    numPhoto : number;
    extension : string;
    repo : string;
    demo : string;
    size : string;
    category: string;
}

export interface Employer {
  slug: string;
  name: string;
  link: string;
}

export interface Position {
  slug: string;
  employer_slug: string;
  name: string;
  date: string;
  description: string;
  skills: string;
}