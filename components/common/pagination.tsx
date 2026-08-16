"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (!totalPages || totalPages <= 1) return null;

  const pages = [];
  const startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(totalPages, currentPage + 2);

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <nav
      aria-label="Pagination"
      className="flex flex-wrap items-center justify-center gap-1.5"
    >
      <NavButton
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        <ChevronLeft className="size-4" />
      </NavButton>

      {startPage > 1 && (
        <>
          <PageButton page={1} onClick={() => onPageChange(1)} />
          {startPage > 2 && (
            <span className="px-1 text-muted-foreground">...</span>
          )}
        </>
      )}

      {pages.map((page) => (
        <PageButton
          key={page}
          page={page}
          isActive={page === currentPage}
          onClick={() => onPageChange(page)}
        />
      ))}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && (
            <span className="px-1 text-muted-foreground">...</span>
          )}
          <PageButton page={totalPages} onClick={() => onPageChange(totalPages)} />
        </>
      )}

      <NavButton
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        <ChevronRight className="size-4" />
      </NavButton>
    </nav>
  );
}

function PageButton({
  page,
  isActive,
  onClick,
}: {
  page: number;
  isActive?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "flex size-8 cursor-pointer items-center justify-center rounded-md text-[13px] font-medium transition",
        isActive
          ? "bg-primary text-white"
          : "text-muted-foreground hover:bg-muted hover:text-foreground",
      )}
    >
      {page}
    </button>
  );
}

function NavButton({
  children,
  disabled,
  onClick,
  ...rest
}: React.ComponentProps<"button">) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="flex size-8 cursor-pointer items-center justify-center rounded-md border border-border text-muted-foreground transition hover:bg-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
      {...rest}
    >
      {children}
    </button>
  );
}
