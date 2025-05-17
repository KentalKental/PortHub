"use client"

import type React from "react"

import { useState, useContext } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { ListingsContext } from "@/context/listings-context"

export default function SearchFilters() {
  const { applyFilters } = useContext(ListingsContext)
  const [searchInput, setSearchInput] = useState("")
  const [activeType, setActiveType] = useState("all")
  const [category, setCategory] = useState("")
  const [sortBy, setSortBy] = useState("newest")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    applyFilters({
      searchTerm: searchInput,
      category,
      sortBy,
      type: activeType !== "all" ? activeType : "",
    })
  }

  const handleTypeFilter = (type: string) => {
    setActiveType(type)
    applyFilters({
      searchTerm: searchInput,
      category,
      sortBy,
      type: type !== "all" ? type : "",
    })
  }

  const handleCategoryChange = (value: string) => {
    setCategory(value)
    applyFilters({
      searchTerm: searchInput,
      category: value,
      sortBy,
      type: activeType !== "all" ? activeType : "",
    })
  }

  const handleSortChange = (value: string) => {
    setSortBy(value)
    applyFilters({
      searchTerm: searchInput,
      category,
      sortBy: value,
      type: activeType !== "all" ? activeType : "",
    })
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
      <div className="flex flex-wrap gap-3 mb-4">
        <Button
          variant={activeType === "all" ? "default" : "outline"}
          onClick={() => handleTypeFilter("all")}
          className="rounded-full"
        >
          All
        </Button>
        <Button
          variant={activeType === "importer" ? "default" : "outline"}
          onClick={() => handleTypeFilter("importer")}
          className={`rounded-full ${activeType === "importer" ? "bg-[#3B82F6] hover:bg-[#3B82F6]/90" : ""}`}
        >
          Importers
        </Button>
        <Button
          variant={activeType === "exporter" ? "default" : "outline"}
          onClick={() => handleTypeFilter("exporter")}
          className={`rounded-full ${activeType === "exporter" ? "bg-[#8B5CF6] hover:bg-[#8B5CF6]/90" : ""}`}
        >
          Exporters
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <form onSubmit={handleSearch} className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            type="text"
            placeholder="Search listings..."
            className="pl-10"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </form>

        <Select onValueChange={handleCategoryChange}>
          <SelectTrigger>
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="Fish">Fish</SelectItem>
            <SelectItem value="Meat">Meat</SelectItem>
            <SelectItem value="Beverages">Beverages</SelectItem>
            <SelectItem value="Food">Food</SelectItem>
            <SelectItem value="Electronics">Electronics</SelectItem>
            <SelectItem value="Energy">Energy</SelectItem>
            <SelectItem value="Furniture">Furniture</SelectItem>
            <SelectItem value="Daily Goods">Daily Goods</SelectItem>
            <SelectItem value="Textiles">Textiles</SelectItem>
            <SelectItem value="Machinery">Machinery</SelectItem>
            <SelectItem value="Raw Materials">Raw Materials</SelectItem>
            <SelectItem value="Construction">Construction</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger>
            <SelectValue placeholder="All Countries" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Countries</SelectItem>
            <SelectItem value="United States">United States</SelectItem>
            <SelectItem value="China">China</SelectItem>
            <SelectItem value="Germany">Germany</SelectItem>
            <SelectItem value="Japan">Japan</SelectItem>
            <SelectItem value="United Kingdom">United Kingdom</SelectItem>
            <SelectItem value="France">France</SelectItem>
            <SelectItem value="India">India</SelectItem>
            <SelectItem value="Brazil">Brazil</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={handleSortChange}>
          <SelectTrigger>
            <SelectValue placeholder="Sort by Date" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="oldest">Oldest First</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
