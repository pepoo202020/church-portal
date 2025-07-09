"use client";
import { Button } from "@/components/ui/button";
import { categories, mockArtworks, sortOptions } from "@/constant/data";
import { ArtWorkCard } from "@/ui/components/gallery/ArtWorkCard";
import { FilterBar } from "@/ui/components/gallery/FilterBar";
import { GalleryFooter } from "@/ui/components/gallery/Footer";
import { ScrollToTopButton } from "@/ui/components/gallery/ScrollToTopButton";
import { useLanguage } from "@/ui/contexts/LanguageContext";
import { useEffect, useRef, useState } from "react";

const ArtsPage = () => {
  const { language } = useLanguage();
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState<string>(
    currentYear.toString()
  );
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("latest");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [artworks, setArtworks] = useState(mockArtworks);
  const [filteredArtworks, setFilteredArtworks] = useState(mockArtworks);
  const [newComments, setNewComments] = useState<{ [key: number]: string }>({});
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Generate years from 2000 to current + 2 future years
  const years = Array.from(
    { length: currentYear - 2000 + 3 },
    (_, i) => 2000 + i
  );
  const resetFilters = () => {
    setSearchTerm("");
    setSelectedYear(currentYear.toString());
    setSelectedCategory("all");
    setSortBy("latest");
  };
  useEffect(() => {
    const filtered = artworks.filter((artwork) => {
      const matchesSearch =
        artwork.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        artwork.artist.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesYear =
        selectedYear === currentYear.toString() ||
        artwork.year.toString() === selectedYear;
      const matchesCategory =
        selectedCategory === "all" || artwork.category === selectedCategory;

      return matchesSearch && matchesYear && matchesCategory;
    });

    // Sort artworks
    if (sortBy === "most-voted") {
      filtered.sort((a, b) => b.votes - a.votes);
    } else if (sortBy === "alphabetical") {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else {
      // latest - keep original order
    }

    setFilteredArtworks(filtered);
  }, [
    artworks,
    searchTerm,
    selectedYear,
    selectedCategory,
    sortBy,
    currentYear,
  ]);

  const handleVote = (id: number) => {
    setArtworks((prev) =>
      prev.map((artwork) =>
        artwork.id === id ? { ...artwork, votes: artwork.votes + 1 } : artwork
      )
    );
  };

  const handleAddComment = (id: number) => {
    const comment = newComments[id];
    if (!comment?.trim()) return;

    setArtworks((prev) =>
      prev.map((artwork) =>
        artwork.id === id
          ? {
              ...artwork,
              comments: [...artwork.comments, { user: "You", text: comment }],
            }
          : artwork
      )
    );
    setNewComments((prev) => ({ ...prev, [id]: "" }));
  };

  return (
    <div
      dir={language === "en" ? "ltr" : "rtl"}
      className="relative w-full flex h-full flex-col items-start justify-start gap-5"
    >
      <ScrollToTopButton />
      {/* Sticky Filter Bar */}
      <div className="sticky top-0 z-20 w-full bg-background/80 pb-4 pt-2 backdrop-blur-sm">
        <FilterBar
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
          years={years}
          langugae={language}
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          sortBy={sortBy}
          setSortBy={setSortBy}
          sortOptions={sortOptions}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          resetFilters={resetFilters}
        />
      </div>
      <div ref={scrollContainerRef} className="w-full flex-1 overflow-y-auto">
        <div className="flex flex-col">
          {filteredArtworks.map((artwork) => (
            <ArtWorkCard
              key={artwork.id}
              artwork={artwork}
              onVote={handleVote}
              handleAddComment={handleAddComment}
              newComments={newComments}
              setNewComments={setNewComments}
            />
          ))}
          {/* No Results */}
          {filteredArtworks.length === 0 && (
            <div className="col-span-full text-center py-12">
              <p className="text-lg text-muted-foreground">
                No artworks found matching your criteria.
              </p>
              <Button variant="outline" onClick={resetFilters} className="mt-4">
                Reset Filters
              </Button>
            </div>
          )}
        </div>
        <GalleryFooter />
      </div>
    </div>
  );
};

export default ArtsPage;
