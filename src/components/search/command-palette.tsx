//==============================================================================
// COMMAND PALETTE (SITE SEARCH)
//==============================================================================
// Vercel-style search dialog: opens with the header button or Ctrl/Cmd+K,
// filters the build-time search index, full keyboard navigation. Dependency
// free; results grouped by section.
//------------------------------------------------------------------------------

"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { searchEntries, type SearchEntry } from "@/lib/search-index";
import { SearchIcon } from "@/components/icons";
import { cx } from "@/lib/cx";

export function CommandSearch() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = searchEntries(query);

  //----------------------------------------------------------------------------
  // GLOBAL SHORTCUT (Ctrl/Cmd+K) & BODY SCROLL LOCK
  //----------------------------------------------------------------------------
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((value) => !value);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    inputRef.current?.focus();
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  //----------------------------------------------------------------------------
  // ACTIONS
  //----------------------------------------------------------------------------
  function close() {
    setOpen(false);
    setQuery("");
    setSelected(0);
  }

  function go(entry: SearchEntry) {
    close();
    router.push(entry.href);
  }

  function onInputKeyDown(event: React.KeyboardEvent) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setSelected((value) => Math.min(value + 1, results.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setSelected((value) => Math.max(value - 1, 0));
    } else if (event.key === "Enter" && results[selected]) {
      event.preventDefault();
      go(results[selected]);
    } else if (event.key === "Escape") {
      close();
    }
  }

  //----------------------------------------------------------------------------
  // GROUPED RESULTS (preserves ranking order inside each group)
  //----------------------------------------------------------------------------
  const groups = results.reduce<Map<string, SearchEntry[]>>((map, entry) => {
    const list = map.get(entry.group) ?? [];
    list.push(entry);
    map.set(entry.group, list);
    return map;
  }, new Map());

  return (
    <>
      {/*----------------------------------------------------------------------
        TRIGGER (header)
      ----------------------------------------------------------------------*/}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Search the site"
        className="inline-flex h-9 items-center gap-2 rounded-full border border-border px-3 text-sm text-muted transition-colors hover:border-foreground/30 hover:text-foreground"
      >
        <SearchIcon className="size-4" />
        <span className="hidden lg:inline">Search</span>
        <kbd className="hidden rounded-md border border-border bg-surface-2 px-1.5 py-0.5 font-mono text-[10px] lg:inline">
          ⌘K
        </kbd>
      </button>

      {/*----------------------------------------------------------------------
        DIALOG
      ----------------------------------------------------------------------*/}
      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center p-4 pt-[12vh]"
          role="dialog"
          aria-modal="true"
          aria-label="Site search"
        >
          {/* Backdrop */}
          <button
            type="button"
            aria-label="Close search"
            onClick={close}
            className="absolute inset-0 cursor-default bg-black/50 backdrop-blur-sm"
          />

          {/* Panel */}
          <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl">
            {/* Input row */}
            <div className="flex items-center gap-3 border-b border-border px-4">
              <SearchIcon className="size-4 shrink-0 text-muted" />
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setSelected(0);
                }}
                onKeyDown={onInputKeyDown}
                placeholder="Search services, case studies, insights…"
                aria-label="Search query"
                className="h-13 w-full bg-transparent py-4 text-sm text-foreground placeholder:text-muted/60 focus:outline-none"
              />
              <kbd className="rounded-md border border-border bg-surface-2 px-1.5 py-0.5 font-mono text-[10px] text-muted">
                ESC
              </kbd>
            </div>

            {/* Results */}
            <div className="max-h-80 overflow-y-auto p-2">
              {results.length === 0 && (
                <p className="px-3 py-8 text-center text-sm text-muted">
                  No results for &ldquo;{query}&rdquo;
                </p>
              )}
              {[...groups.entries()].map(([group, entries]) => (
                <div key={group}>
                  <p className="px-3 pb-1 pt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted/70">
                    {group}
                  </p>
                  {entries.map((entry) => {
                    const index = results.indexOf(entry);
                    return (
                      <button
                        key={entry.href}
                        type="button"
                        onClick={() => go(entry)}
                        onMouseEnter={() => setSelected(index)}
                        className={cx(
                          "flex w-full flex-col rounded-lg px-3 py-2.5 text-left transition-colors",
                          index === selected ? "bg-surface-2" : "hover:bg-surface-2",
                        )}
                      >
                        <span className="text-sm font-medium text-foreground">
                          {entry.title}
                        </span>
                        <span className="mt-0.5 line-clamp-1 text-xs text-muted">
                          {entry.description}
                        </span>
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
