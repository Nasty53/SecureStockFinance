import React from 'react';

export default function TodoHeader() {
  return (
    <div className="text-center">
      <div className="flex justify-center mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-emerald rounded-xl flex items-center justify-center shadow-lg">
          <span className="text-white text-xl font-bold">✓</span>
        </div>
      </div>
      <h1 className="text-4xl font-bold text-slate-900 mb-2">SecureStock Todo</h1>
      <p className="text-slate-600">Stay organized with your tasks</p>
    </div>
  );
}
