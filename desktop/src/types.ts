export type VerdictType = 'safe' | 'caution' | 'warning' | 'blocked';

export interface Alternative {
  title: str;
  url: str;
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
  // Add other API methods here as they are defined
}

declare global {
  interface Window {
    falahAPI: FalahAPI;
  }
}
