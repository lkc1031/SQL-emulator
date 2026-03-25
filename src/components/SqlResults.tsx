import React from 'react';
import { AlertCircle, CheckCircle2, Table2 } from 'lucide-react';

interface SqlResultsProps {
  result: { success: boolean; data?: any[]; error?: string } | null;
}

export function SqlResults({ result }: SqlResultsProps) {
  if (!result) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-slate-400 p-8 text-center bg-slate-50/50">
        <Table2 className="w-12 h-12 mb-4 text-slate-300" />
        <p className="text-sm font-medium">執行 SQL 查詢以查看結果</p>
        <p className="text-xs mt-1">結果將顯示在這裡</p>
      </div>
    );
  }

  if (!result.success) {
    return (
      <div className="p-6 bg-red-50/50 h-full overflow-auto">
        <div className="flex items-start gap-3 text-red-700 bg-red-100 p-4 rounded-lg border border-red-200 shadow-sm">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-sm mb-1">語法錯誤 (Syntax Error)</h3>
            <p className="text-sm font-mono bg-red-50 p-2 rounded border border-red-100 mt-2 break-all">
              {result.error}
            </p>
          </div>
        </div>
      </div>
    );
  }

  const data = result.data || [];

  if (data.length === 0) {
    return (
      <div className="p-6 bg-slate-50 h-full flex flex-col items-center justify-center">
        <CheckCircle2 className="w-10 h-10 text-emerald-500 mb-3" />
        <p className="text-sm font-medium text-slate-600">查詢成功執行</p>
        <p className="text-xs text-slate-400 mt-1">但沒有符合條件的資料 (0 rows returned)</p>
      </div>
    );
  }

  const columns = Object.keys(data[0]);

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="px-4 py-2 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          查詢結果
        </div>
        <div className="text-xs text-slate-500 bg-white px-2 py-1 rounded border border-slate-200 shadow-sm">
          共 {data.length} 筆資料
        </div>
      </div>
      <div className="flex-1 overflow-auto p-4">
        <div className="inline-block min-w-full align-middle border border-slate-200 rounded-lg shadow-sm overflow-hidden">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                {columns.map((col, i) => (
                  <th
                    key={i}
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider border-b border-slate-200"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-100">
              {data.map((row, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-slate-50 transition-colors">
                  {columns.map((col, colIndex) => (
                    <td
                      key={colIndex}
                      className="px-4 py-3 whitespace-nowrap text-sm text-slate-700 font-mono"
                    >
                      {row[col] !== null && row[col] !== undefined ? String(row[col]) : <span className="text-slate-300 italic">NULL</span>}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
