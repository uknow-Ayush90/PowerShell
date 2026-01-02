export interface AnalysisFeatures {
  entropy: number;
  base64Strings: string[];
  base64Count: number;
  maxStringLength: number;
  suspiciousKeywords: string[];
  suspiciousKeywordCount: number;
  totalLength: number;
  lineCount: number;
  averageLineLength: number;
  obfuscationScore: number;
  // New features
  urlsFound: string[];
  urlCount: number;
  ipAddresses: string[];
  ipCount: number;
  fileExtensions: string[];
  fileExtensionCount: number;
  powershellCommands: string[];
  powershellCommandCount: number;
  encodingMethods: string[];
  encodingMethodCount: number;
  stringObfuscationTechniques: string[];
  variableObfuscationScore: number;
  commentRatio: number;
  functionCount: number;
  nestedBlockDepth: number;
}

export interface AnalysisResult {
  filename: string;
  features: AnalysisFeatures;
  classification: 'benign' | 'suspicious' | 'malicious';
  confidence: number;
  timestamp: Date;
  scriptContent: string;
  threatCategories: string[];
  riskFactors: RiskFactor[];
  recommendations: string[];
  yara: YaraMatch[];
  behaviorAnalysis: BehaviorAnalysis;
  timeline: TimelineEvent[];
  sandbox: SandboxResult;
}

export interface YaraMatch {
  ruleName: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  tags: string[];
  matches: string[];
}

export interface BehaviorAnalysis {
  fileOperations: string[];
  registryOperations: string[];
  networkConnections: string[];
  processCreation: string[];
  serviceManipulation: string[];
  scheduledTasks: string[];
  persistenceMechanisms: string[];
  antiAnalysis: string[];
  dataExfiltration: string[];
  privilegeEscalation: string[];
}

export interface TimelineEvent {
  timestamp: string;
  action: string;
  description: string;
  severity: 'info' | 'warning' | 'critical';
  lineNumber?: number;
}

export interface SandboxResult {
  safeToExecute: boolean;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  detectedCapabilities: string[];
  networkActivity: NetworkActivity[];
  fileSystemChanges: FileSystemChange[];
  registryChanges: RegistryChange[];
  processActivity: ProcessActivity[];
}

export interface NetworkActivity {
  type: 'dns' | 'http' | 'https' | 'tcp' | 'udp';
  destination: string;
  port?: number;
  purpose: string;
}

export interface FileSystemChange {
  action: 'create' | 'modify' | 'delete' | 'read';
  path: string;
  description: string;
}

export interface RegistryChange {
  action: 'create' | 'modify' | 'delete' | 'read';
  key: string;
  value?: string;
  description: string;
}

export interface ProcessActivity {
  action: 'start' | 'stop' | 'inject';
  process: string;
  arguments?: string;
  description: string;
}
export interface RiskFactor {
  category: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  evidence: string[];
}

export interface DatasetEntry {
  filename: string;
  label: 'benign' | 'malicious';
  features: AnalysisFeatures;
}