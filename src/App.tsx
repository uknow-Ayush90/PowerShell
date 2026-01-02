import React, { useState } from 'react';
import { Shield, BarChart3, FileText, Database, Brain, GitCompare, FileOutput, Search, Activity, Target, Eye, Zap, Cpu } from 'lucide-react';
import FileUpload from './components/FileUpload';
import AnalysisResults from './components/AnalysisResults';
import DataVisualization from './components/DataVisualization';
import ResultsTable from './components/ResultsTable';
import ThreatIntelligence from './components/ThreatIntelligence';
import ScriptComparison from './components/ScriptComparison';
import ReportGenerator from './components/ReportGenerator';
import YaraAnalysis from './components/YaraAnalysis';
import BehaviorAnalysis from './components/BehaviorAnalysis';
import SandboxSimulation from './components/SandboxSimulation';
import LiveMonitoring from './components/LiveMonitoring';
import ThreatHunting from './components/ThreatHunting';
import { AnalysisResult } from './types/analysis';
import { analyzeScript } from './utils/powershellAnalyzer';

function App() {
  const [results, setResults] = useState<AnalysisResult[]>([]);
  const [selectedResult, setSelectedResult] = useState<AnalysisResult | null>(null);
  const [activeTab, setActiveTab] = useState<'upload' | 'results' | 'visualization' | 'table' | 'intelligence' | 'comparison' | 'reports' | 'yara' | 'behavior' | 'sandbox' | 'monitoring' | 'hunting'>('upload');

  const handleFileAnalyze = (content: string, filename: string) => {
    const result = analyzeScript(content, filename);
    setResults(prev => [...prev, result]);
    setSelectedResult(result);
    setActiveTab('results');
  };

  const handleSelectResult = (result: AnalysisResult) => {
    setSelectedResult(result);
    setActiveTab('results');
  };

  const clearResults = () => {
    setResults([]);
    setSelectedResult(null);
    setActiveTab('upload');
  };

  const tabs = [
    { id: 'upload', label: 'Upload & Analyze', icon: FileText },
    { id: 'results', label: 'Analysis Results', icon: Shield, disabled: !selectedResult },
    { id: 'visualization', label: 'Visualizations', icon: BarChart3, disabled: results.length === 0 },
    { id: 'table', label: 'Results Table', icon: Database, disabled: results.length === 0 },
    { id: 'intelligence', label: 'Threat Intelligence', icon: Brain, disabled: results.length === 0 },
    { id: 'comparison', label: 'Script Comparison', icon: GitCompare, disabled: results.length < 2 },
    { id: 'reports', label: 'Security Reports', icon: FileOutput, disabled: results.length === 0 },
    { id: 'yara', label: 'YARA Analysis', icon: Search, disabled: results.length === 0 },
    { id: 'behavior', label: 'Behavior Analysis', icon: Activity, disabled: results.length === 0 },
    { id: 'sandbox', label: 'Sandbox Simulation', icon: Cpu, disabled: results.length === 0 },
    { id: 'monitoring', label: 'Live Monitoring', icon: Zap, disabled: results.length === 0 },
    { id: 'hunting', label: 'Threat Hunting', icon: Target, disabled: results.length === 0 }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <Shield className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  PowerShell Static Analyzer
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Advanced threat detection and analysis platform
                </p>
              </div>
            </div>
            {results.length > 0 && (
              <button
                onClick={clearResults}
                className="px-4 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                Clear Results
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {tabs.map(({ id, label, icon: Icon, disabled }) => (
              <button
                key={id}
                onClick={() => !disabled && setActiveTab(id as any)}
                disabled={disabled}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                  activeTab === id
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : disabled
                    ? 'border-transparent text-gray-400 dark:text-gray-600 cursor-not-allowed'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'upload' && (
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                PowerShell Script Analysis
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Advanced static analysis with threat intelligence, obfuscation detection, and security recommendations
              </p>
            </div>
            <FileUpload onFileAnalyze={handleFileAnalyze} />
          </div>
        )}

        {activeTab === 'results' && selectedResult && (
          <AnalysisResults result={selectedResult} />
        )}

        {activeTab === 'visualization' && (
          <DataVisualization results={results} />
        )}

        {activeTab === 'table' && (
          <ResultsTable results={results} onSelectResult={handleSelectResult} />
        )}

        {activeTab === 'intelligence' && (
          <ThreatIntelligence results={results} />
        )}

        {activeTab === 'comparison' && (
          <ScriptComparison results={results} />
        )}

        {activeTab === 'reports' && (
          <ReportGenerator results={results} />
        )}

        {activeTab === 'yara' && (
          <YaraAnalysis results={results} />
        )}

        {activeTab === 'behavior' && (
          <BehaviorAnalysis results={results} />
        )}

        {activeTab === 'sandbox' && (
          <SandboxSimulation results={results} />
        )}

        {activeTab === 'monitoring' && (
          <LiveMonitoring results={results} />
        )}

        {activeTab === 'hunting' && (
          <ThreatHunting results={results} />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-sm text-gray-500 dark:text-gray-400">
            <p>
              PowerShell Static Analyzer - Enterprise-grade threat detection and analysis platform
            </p>
            <p className="mt-1">
              Features: YARA Rules • Behavioral Analysis • Sandbox Simulation • Live Monitoring • Threat Hunting • Advanced Reporting
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;