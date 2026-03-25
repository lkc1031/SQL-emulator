import React from 'react';
import { Database, BookOpen, Table as TableIcon, ChevronRight } from 'lucide-react';
import { schemaDefinition } from '../data/schema';
import { sqlExamples } from '../data/examples';
import { cn } from '../lib/utils';

interface SidebarProps {
  onSelectExample: (query: string) => void;
  activeExampleQuery: string;
}

export function Sidebar({ onSelectExample, activeExampleQuery }: SidebarProps) {
  return (
    <div className="w-64 bg-slate-50 border-r border-slate-200 h-full flex flex-col overflow-hidden">
      <div className="p-4 border-b border-slate-200 bg-white">
        <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <Database className="w-6 h-6 text-blue-600" />
          SQL Learning Simulator
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
            <TableIcon className="w-4 h-4" />
            Database Schema
          </h2>
          <div className="space-y-4">
            {schemaDefinition.map((table) => (
              <div key={table.name} className="bg-white rounded-md border border-slate-200 shadow-sm overflow-hidden">
                <div className="bg-slate-100 px-3 py-2 flex justify-between items-center border-b border-slate-200">
                  <span className="text-sm font-medium text-slate-700">{table.name}</span>
                  <button 
                    onClick={() => onSelectExample(`SELECT * FROM ${table.name};`)}
                    className="text-xs text-blue-600 hover:text-blue-800 hover:underline"
                    title={`Preview ${table.name} data`}
                  >
                    Preview
                  </button>
                </div>
                <ul className="p-2 space-y-1">
                  {table.columns.map((col) => (
                    <li key={col.name} className="text-xs flex justify-between items-center text-slate-600">
                      <span className="font-mono">{col.name}</span>
                      <span className="text-slate-400">{col.type}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 border-t border-slate-200">
          <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            Learning Examples
          </h2>
          <div className="space-y-2">
            {sqlExamples.map((example, index) => {
              const isActive = activeExampleQuery === example.query;
              return (
                <button
                  key={index}
                  onClick={() => onSelectExample(example.query)}
                  className={cn(
                    "w-full text-left p-3 rounded-md transition-colors border",
                    isActive 
                      ? "bg-blue-50 border-blue-200 text-blue-700 shadow-sm" 
                      : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300"
                  )}
                >
                  <div className="font-medium text-sm flex items-center justify-between">
                    {example.title}
                    <ChevronRight className={cn("w-4 h-4", isActive ? "text-blue-500" : "text-slate-400")} />
                  </div>
                  <div className="text-xs mt-1 opacity-80">{example.description}</div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
