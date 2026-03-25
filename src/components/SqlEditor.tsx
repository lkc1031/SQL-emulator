import React, { useState, useEffect } from 'react';
import { Play, Trash2, Code2 } from 'lucide-react';
import { cn } from '../lib/utils';

interface SqlEditorProps {
  query: string;
  onChange: (query: string) => void;
  onRun: () => void;
}

export function SqlEditor({ query, onChange, onRun }: SqlEditorProps) {
  const [isFocused, setIsFocused] = useState(false);

  // Handle Ctrl+Enter to run query
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        onRun();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onRun]);

  return (
    <div className="flex flex-col h-full bg-white border-b border-slate-200">
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-slate-50">
        <div className="flex items-center gap-2 text-slate-600 font-medium text-sm">
          <Code2 className="w-4 h-4" />
          SQL 編輯器
          <span className="text-xs font-normal text-slate-400 ml-2 hidden sm:inline-block">
            (您可以自由修改此處的 SQL 語法並執行)
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onChange('')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 bg-white border border-slate-200 rounded-md hover:bg-slate-50 hover:text-red-600 transition-colors"
            title="清除內容"
          >
            <Trash2 className="w-3.5 h-3.5" />
            清除
          </button>
          <button
            onClick={onRun}
            className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors shadow-sm"
            title="執行查詢 (Ctrl + Enter)"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            執行查詢
          </button>
        </div>
      </div>
      <div className={cn(
        "flex-1 p-4 transition-colors",
        isFocused ? "bg-blue-50/30" : "bg-white"
      )}>
        <textarea
          value={query}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="在這裡輸入你的 SQL 語法... (例如: SELECT * FROM students;)"
          className="w-full h-full resize-none outline-none font-mono text-sm text-slate-800 bg-transparent placeholder:text-slate-400"
          spellCheck={false}
        />
      </div>
    </div>
  );
}
