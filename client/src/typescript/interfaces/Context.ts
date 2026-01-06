import { TagCount, NewSnippet, Snippet, SearchQuery } from '.';

export interface ImportResult {
  imported: number;
  updated: number;
  skipped: number;
  total: number;
}

export interface ExportData {
  version: string;
  exportedAt: string;
  count: number;
  snippets: ExportSnippet[];
}

export interface ExportSnippet {
  title: string;
  description: string;
  language: string;
  code: string;
  docs: string;
  isPinned: boolean;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Context {
  snippets: Snippet[];
  searchResults: Snippet[];
  currentSnippet: Snippet | null;
  tagCount: TagCount[];
  getSnippets: () => void;
  getSnippetById: (id: number) => void;
  setSnippet: (id: number) => void;
  createSnippet: (snippet: NewSnippet) => void;
  updateSnippet: (snippet: NewSnippet, id: number, isLocal?: boolean) => void;
  deleteSnippet: (id: number) => void;
  toggleSnippetPin: (id: number) => void;
  countTags: () => void;
  searchSnippets: (query: SearchQuery) => void;
  exportSnippets: () => Promise<ExportData>;
  importSnippets: (snippets: ExportSnippet[], overwrite: boolean) => Promise<ImportResult>;
}
