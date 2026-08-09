"use client";
import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const maxPagesToShow = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  let endPage = startPage + maxPagesToShow - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }

  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="flex justify-center items-center space-x-2 mt-12 mb-8">
      <button
        onClick={() => {
          onPageChange(currentPage - 1);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        disabled={currentPage === 1}
        className="px-3 py-2 rounded text-ink-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        이전
      </button>
      
      {startPage > 1 && (
        <>
          <button onClick={() => { onPageChange(1); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="w-10 h-10 rounded font-medium text-ink hover:bg-gray-100 transition-colors">
            1
          </button>
          {startPage > 2 && <span className="text-ink-2">...</span>}
        </>
      )}

      {pages.map(page => (
        <button
          key={page}
          onClick={() => { onPageChange(page); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className={`w-10 h-10 rounded font-bold transition-all ${
            currentPage === page
              ? "bg-deep-navy text-white shadow-md"
              : "text-ink hover:bg-gray-100"
          }`}
        >
          {page}
        </button>
      ))}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span className="text-ink-2">...</span>}
          <button onClick={() => { onPageChange(totalPages); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="w-10 h-10 rounded font-medium text-ink hover:bg-gray-100 transition-colors">
            {totalPages}
          </button>
        </>
      )}

      <button
        onClick={() => {
          onPageChange(currentPage + 1);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        disabled={currentPage === totalPages}
        className="px-3 py-2 rounded text-ink-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        다음
      </button>
    </div>
  );
}
