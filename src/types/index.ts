// Game data types for Apocalypsis rules helper

export interface GameInfo {
  gameName: string;
  playerCount: {
    min: number;
    max: number;
  };
  playTime: string;
  theme: string;
}

export interface WinCondition {
  collective: string;
  loss: string;
  individual: string;
}

export interface SetupStep {
  step: number;
  instruction: string;
  components?: string[];
  note?: string;
}

export interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  category: 'resource' | 'characteristic' | 'class' | 'component' | 'mechanic' | 'region' | 'status';
  relatedTerms?: string[];
}

export interface TurnPhase {
  id: string;
  name: string;
  order: number;
  description: string;
  actions: PhaseAction[];
  notes?: string[];
}

export interface PhaseAction {
  name: string;
  description: string;
  cost?: string;
  limit?: string;
}

export interface Rule {
  id: string;
  category: RuleCategory;
  title: string;
  content: string;
  pageReference?: number;
  exceptions?: string[];
  relatedRules?: string[];
  isException?: boolean;
  isImportant?: boolean;
}

export type RuleCategory =
  | 'agents'
  | 'resources'
  | 'checks'
  | 'tasks'
  | 'disasters'
  | 'vatican'
  | 'northKorea'
  | 'regions'
  | 'tracks'
  | 'enhancements'
  | 'healing'
  | 'combat'
  | 'endgame';

export interface Exception {
  id: string;
  rule: string;
  exception: string;
  priority: 'high' | 'medium' | 'low';
}

export interface Erratum {
  id: string;
  number: number;
  title: string;
  affectedItem: string;
  itemType: 'card' | 'agent' | 'faction' | 'rule' | 'component' | 'tutorial';
  description: string;
  solution: string;
  affectsGameplay: boolean;
}

export interface Tip {
  id: string;
  title: string;
  content: string;
  category: string;
}

export interface Characteristic {
  id: string;
  name: string;
  abbreviation: string;
  description: string;
}

export interface AgentClass {
  id: string;
  name: string;
  icon?: string;
  description: string;
}

export interface Resource {
  id: string;
  name: string;
  description: string;
  usage: string[];
}

export interface Region {
  id: string;
  name: string;
  bonusOnSuccess: string;
  bonusOnFailure?: string;
  penalty?: string;
  specialRule?: string;
}

export interface Track {
  id: string;
  name: string;
  abbreviation: string;
  description: string;
  modifiers: {
    range: string;
    value: number;
  }[];
  vaticanThresholds?: number[];
  disasterRemoval?: string;
}

export interface GameRulesData {
  gameInfo: GameInfo;
  winCondition: WinCondition;
  setup: SetupStep[];
  glossary: GlossaryTerm[];
  turnStructure: {
    description: string;
    phases: TurnPhase[];
  };
  characteristics: Characteristic[];
  agentClasses: AgentClass[];
  resources: Resource[];
  regions: Region[];
  tracks: Track[];
  rules: Rule[];
  exceptions: Exception[];
  tips: Tip[];
  errata: Erratum[];
}

// Search result type
export interface SearchResult {
  type: 'rule' | 'glossary' | 'setup' | 'phase' | 'exception' | 'tip';
  id: string;
  title: string;
  content: string;
  category?: string;
}

// Theme type
export type Theme = 'light' | 'dark';

// Navigation tab type
export type TabId = 'overview' | 'setup' | 'turn' | 'rules' | 'glossary' | 'errata';
