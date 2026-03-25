/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { SqlEditor } from './components/SqlEditor';
import { SqlResults } from './components/SqlResults';
import { initializeDatabase, runQuery } from './data/schema';
import { sqlExamples } from './data/examples';

export default function App() {
  const [query, setQuery] = useState(sqlExamples[0].query);
  const [result, setResult] = useState<{ success: boolean; data?: any[]; error?: string } | null>(null);
  const [isDbInitialized, setIsDbInitialized] = useState(false);

  useEffect(() => {
    // Initialize database only once
    if (!isDbInitialized) {
      try {
        initializeDatabase();
        setIsDbInitialized(true);
      } catch (error) {
        console.error("Failed to initialize database:", error);
      }
    }
  }, [isDbInitialized]);

  const handleRunQuery = (queryToRun: string = query) => {
    if (!queryToRun.trim()) return;
    const res = runQuery(queryToRun);
    setResult(res);
  };

  const handleSelectExample = (exampleQuery: string) => {
    setQuery(exampleQuery);
    // Auto run the query when an example or preview is clicked
    handleRunQuery(exampleQuery);
  };

  if (!isDbInitialized) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-50 text-slate-500">
        載入資料庫中...
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full bg-slate-100 overflow-hidden font-sans text-slate-900">
      {/* Sidebar for Schema and Examples */}
      <Sidebar 
        onSelectExample={handleSelectExample} 
        activeExampleQuery={query} 
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Top Half: SQL Editor */}
        <div className="h-1/2 border-b border-slate-300 shadow-sm z-10">
          <SqlEditor 
            query={query} 
            onChange={setQuery} 
            onRun={() => handleRunQuery(query)} 
          />
        </div>

        {/* Bottom Half: Results */}
        <div className="h-1/2 bg-slate-50 overflow-hidden relative">
          <SqlResults result={result} />
        </div>
      </div>
    </div>
  );
}

