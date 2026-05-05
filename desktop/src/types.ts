export type VerdictType = 'safe' | 'caution' | 'warning' | 'blocked';

export interface Alternative {
  title: string;
  url: string;
}

export interface ClassificationResult {
  verdict: VerdictType;
  reason: string;
  evidence: string;
  alternatives: Alternative[];
}

export interface Tab {
  id: number;
  url: string;
  active: boolean;
  verdict: VerdictType;
}

export interface FalahAPI {
  classifyPage: (url: string, text: string) => Promise<ClassificationResult>;
}

declare global {
  interface Window {
    falahAPI: FalahAPI;
  }
}
