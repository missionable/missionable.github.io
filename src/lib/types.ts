export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export interface Task {
  id: string;
  title: string;
  description: string;
}

export interface Mission {
  slug: string;
  title: string;
  description: string;
  tools: string[];
  difficulty: Difficulty;
  duration: string;
  category: string;
  overview: string;
  tasks: Task[];
  skills: string[];
  jobRelevance: string;
}

export interface CareerPath {
  id: string;
  title: string;
  icon: string;
  description: string;
  avgSalary: string;
  skills: string[];
  missionSlugs: string[];
  learningOrder: string[];
}

export interface RoadmapNode {
  topic: string;
  description: string;
}

export interface RoadmapCategory {
  id: string;
  title: string;
  icon: string;
  color: string;
  beginner: string[];
  intermediate: string[];
  advanced: string[];
}
