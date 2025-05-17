// Generate random date within the last year
function randomDate(): string {
  const now = new Date()
  const pastYear = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate())
  const timestamp = pastYear.getTime() + Math.random() * (now.getTime() - pastYear.getTime())
  const date = new Date(timestamp)
  return date.toISOString().split("T")[0]
}

// Generate random user name
function randomUserName(): string {
  const firstNames = [
    "Alex",
    "Jamie",
    "Jordan",
    "Taylor",
    "Morgan",
    "Casey",
    "Riley",
    "Quinn",
    "Avery",
    "Skyler",
    "Reese",
    "Parker",
    "Blake",
    "Dakota",
    "Hayden",
    "Rowan",
  ]

  const lastNames = [
    "Smith",
    "Johnson",
    "Williams",
    "Brown",
    "Jones",
    "Garcia",
    "Miller",
    "Davis",
    "Rodriguez",
    "Martinez",
    "Hernandez",
    "Lopez",
    "Gonzalez",
    "Wilson",
    "Anderson",
    "Thomas",
  ]

  return `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`
}

// Generate random location
function randomLocation(): string {
  const countries = [
    "United States",
    "China",
    "Germany",
    "Japan",
    "United Kingdom",
    "France",
    "India",
    "Italy",
    "Brazil",
    "Canada",
    "South Korea",
    "Australia",
    "Spain",
    "Mexico",
    "Indonesia",
    "Netherlands",
    "Saudi Arabia",
    "Turkey",
    "Switzerland",
    "Taiwan",
    "Poland",
    "Sweden",
    "Belgium",
    "Thailand",
    "Ireland",
    "Austria",
    "Norway",
    "United Arab Emirates",
    "Israel",
    "Denmark",
    "Singapore",
    "Malaysia",
    "Hong Kong",
    "Philippines",
    "Vietnam",
    "South Africa",
  ]

  const cities = [
    "New York",
    "Shanghai",
    "Berlin",
    "Tokyo",
    "London",
    "Paris",
    "Mumbai",
    "Rome",
    "São Paulo",
    "Toronto",
    "Seoul",
    "Sydney",
    "Madrid",
    "Mexico City",
    "Jakarta",
    "Amsterdam",
    "Riyadh",
    "Istanbul",
    "Zurich",
    "Taipei",
    "Warsaw",
    "Stockholm",
    "Brussels",
    "Bangkok",
    "Dublin",
    "Vienna",
    "Oslo",
    "Dubai",
    "Tel Aviv",
    "Copenhagen",
    "Singapore",
    "Kuala Lumpur",
    "Hong Kong",
    "Manila",
    "Ho Chi Minh City",
    "Johannesburg",
  ]

  const city = cities[Math.floor(Math.random() * cities.length)]
  const country = countries[Math.floor(Math.random() * countries.length)]

  return `${city}, ${country}`
}

// Generate random regions
function randomRegions(count = 3): string[] {
  const regions = [
    "North America",
    "South America",
    "Europe",
    "Asia",
    "Africa",
    "Oceania",
    "Middle East",
    "Southeast Asia",
    "Eastern Europe",
    "Western Europe",
    "Central America",
    "Caribbean",
    "East Asia",
    "South Asia",
    "Central Asia",
    "Nordic Countries",
    "Mediterranean",
    "Scandinavia",
    "Baltics",
    "Balkans",
    "United States",
    "China",
    "European Union",
    "ASEAN",
    "BRICS",
    "Gulf States",
  ]

  const shuffled = [...regions].sort(() => 0.5 - Math.random())

  if (Math.random() < 0.2) {
    return ["Anywhere"]
  }

  return shuffled.slice(0, Math.min(count, regions.length))
}

// Generate random item name
function randomItemName(): string {
  const items = [
    "Wood",
    "Coal",
    "Steel",
    "Aluminum",
    "Copper",
    "Cotton",
    "Wool",
    "Leather",
    "Plastic",
    "Glass",
    "Cement",
    "Paper",
    "Rubber",
    "Silicon",
    "Textiles",
    "Electronics",
    "Machinery",
    "Vehicles",
    "Furniture",
    "Chemicals",
    "Pharmaceuticals",
    "Food Products",
    "Beverages",
    "Agricultural Products",
    "Seafood",
    "Meat",
    "Dairy Products",
    "Fruits",
    "Vegetables",
    "Grains",
    "Coffee",
    "Tea",
    "Spices",
    "Oil",
    "Gas",
    "Solar Panels",
    "Batteries",
    "Microchips",
    "Smartphones",
    "Computers",
  ]

  const units = ["kg", "tons", "units", "pallets", "containers", "boxes", "packages"]

  const item = items[Math.floor(Math.random() * items.length)]
  const quantity = Math.floor(Math.random() * 1000) + 1
  const unit = units[Math.floor(Math.random() * units.length)]

  return `${item} ${quantity} ${unit}`
}

// Generate random category
function randomCategory(): string {
  const categories = [
    "Fish",
    "Meat",
    "Beverages",
    "Food",
    "Electronics",
    "Energy",
    "Furniture",
    "Daily Goods",
    "Textiles",
    "Machinery",
    "Raw Materials",
    "Construction",
  ]

  return categories[Math.floor(Math.random() * categories.length)]
}

// Generate a single mock listing
function generateMockListing(id: string) {
  const type = Math.random() > 0.5 ? "importer" : "exporter"
  const isFeatured = Math.random() > 0.7
  const userId = `user-${Math.floor(Math.random() * 10) + 1}`

  const base = {
    id: id.toString(),
    type: type as "importer" | "exporter",
    userName: randomUserName(),
    userId,
    itemName: randomItemName(),
    category: randomCategory(),
    date: randomDate(),
    featured: isFeatured,
  }

  if (type === "importer") {
    return {
      ...base,
      currentLocation: randomLocation(),
      desiredSourceRegions: randomRegions(Math.floor(Math.random() * 3) + 1),
    }
  } else {
    return {
      ...base,
      basedIn: randomLocation(),
      exportLimitations: randomRegions(Math.floor(Math.random() * 3) + 1),
    }
  }
}

// Generate multiple mock listings
export function generateMockListings(count = 10) {
  const listings = []

  for (let i = 0; i < count; i++) {
    // Generate a unique ID based on timestamp and random number
    const id = Date.now().toString() + Math.floor(Math.random() * 1000).toString()
    listings.push(generateMockListing(id))
  }

  return listings
}
