import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LanguageType } from "@/ui/contexts/LanguageContext";
import { RotateCcw } from "lucide-react";

interface IFilterBarProps {
  selectedYear: string;
  setSelectedYear: (year: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  years: number[];
  langugae: LanguageType;
  categories: { value: string; label: { en: string; ar: string } }[];
  sortBy: string;
  setSortBy: (sortBy: string) => void;
  sortOptions: { value: string; label: { en: string; ar: string } }[];
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
  resetFilters: () => void;
}

export const FilterBar = ({
  selectedYear,
  setSelectedYear,
  selectedCategory,
  setSelectedCategory,
  years,
  categories,
  langugae,
  sortBy,
  setSortBy,
  sortOptions,
  searchTerm,
  setSearchTerm,
  resetFilters,
}: IFilterBarProps) => {
  return (
    <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm w-full">
      <div className="container mx-auto px-1 py-4">
        <div className="flex flex-col lg:flex-row gap-4 justify-between">
          {/* Search and Reset */}
          <div className="flex gap-2 w-full lg:flex-1 lg:max-w-md">
            <Input
              placeholder={
                langugae === "en"
                  ? "Search artworks or artists..."
                  : "بحث عن الاعمال او اصحاب الاعمال......."
              }
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
            <Button
              variant="outline"
              size="icon"
              onClick={resetFilters}
              className="shrink-0"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            {/* Year Selection */}
            <Select
              dir={langugae === "en" ? "ltr" : "rtl"}
              value={selectedYear}
              onValueChange={setSelectedYear}
            >
              <SelectTrigger className="w-full sm:w-32">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">
                  {langugae === "en" ? "All Years" : "كل السنين"}
                </SelectItem>
                {years.reverse().map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {/* Category Filter */}
            <Select
              dir={langugae === "en" ? "ltr" : "rtl"}
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label[langugae]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {/* Sort By */}
            <Select
              dir={langugae === "en" ? "ltr" : "rtl"}
              value={sortBy}
              onValueChange={setSortBy}
            >
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label[langugae]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};
