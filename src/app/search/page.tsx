'use client';

import { useState } from "react";
import { Search, X, Tag, Camera } from "lucide-react";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { Hero, SectionContainer } from "@/components/ui";
import { AVAILABLE_TAGS } from "@/lib/mock-tag-data";

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setCurrentPage(1);
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
    setCurrentPage(1);
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedTags([]);
    setCurrentPage(1);
  };

  const handleLoadMore = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setCurrentPage(prev => prev + 1);
    setIsLoading(false);
  };

  const hasActiveFilters = searchQuery !== '' || selectedTags.length > 0;

  return (
    <div className="page-gradient">
      <Hero
        title="Search Photos"
        description="Find the perfect photo by title, tag, or photographer"
      />

      <SectionContainer>
        {/* Search Input */}
        <div className="card-base p-6 mb-8">
          <div className="relative max-w-2xl mx-auto">
            <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-6 w-6" />
            <input
              type="text"
              placeholder="Search by title, tag, or photographer..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-white/80 dark:bg-slate-800/80 pl-12 pr-12 py-4 text-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition shadow-sm hover:shadow-md"
              aria-label="Search photos"
              autoFocus
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                aria-label="Clear search"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>

        {/* Tag Suggestions */}
        <div className="card-base p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Tag className="h-5 w-5 text-slate-500 dark:text-slate-400" />
            <h3 className="font-medium text-slate-900 dark:text-white">Filter by Tags</h3>
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="ml-auto text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
              >
                Clear all filters
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {AVAILABLE_TAGS.map(tag => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  selectedTags.includes(tag)
                    ? 'bg-blue-500 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Results Section */}
        <div className="mb-4">
          <div className="flex items-center gap-2">
            <Camera className="h-5 w-5 text-slate-500 dark:text-slate-400" />
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              {hasActiveFilters ? 'Search Results' : 'All Photos'}
            </h3>
          </div>
        </div>

        <GalleryGrid
          limit={9}
          currentPage={currentPage}
          onLoadMore={handleLoadMore}
          isLoading={isLoading}
          selectedTags={selectedTags}
          searchQuery={searchQuery}
        />
      </SectionContainer>
    </div>
  );
}
