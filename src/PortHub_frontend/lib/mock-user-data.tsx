// Generate random date for member since
function randomMemberSince() {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const currentYear = new Date().getFullYear()
  const year = Math.floor(Math.random() * 5) + (currentYear - 5)
  const month = months[Math.floor(Math.random() * months.length)]

  return `${month} ${year}`
}

// Generate random bio
function randomBio() {
  const bios = [
    "Experienced trader specializing in electronics and technology products. Looking to expand my network of suppliers and buyers globally.",
    "Import-export specialist with over 10 years of experience in the food and beverage industry. Focused on quality products and reliable partnerships.",
    "New to the trading business but eager to establish connections. Primarily interested in textiles and fashion items.",
    "Family business owner looking to source raw materials for our manufacturing operations. We value long-term relationships with our suppliers.",
    "Export manager for a leading producer of agricultural products. We offer competitive prices and reliable delivery schedules.",
    "Procurement specialist for a retail chain. Looking for diverse suppliers who can meet our quality standards and volume requirements.",
    "Trading company representative specializing in connecting Asian manufacturers with Western markets. Extensive logistics experience.",
    "Sourcing agent with expertise in quality control and supplier verification. I help businesses find reliable trading partners.",
    "Entrepreneur building a new import business. Interested in unique products with growth potential in my local market.",
    "Logistics and supply chain expert offering consulting services to importers and exporters. Can help optimize your trading operations.",
  ]

  return bios[Math.floor(Math.random() * bios.length)]
}

// Generate random role
function randomRole() {
  const roles = [
    "Importer",
    "Exporter",
    "Trade Consultant",
    "Procurement Manager",
    "Supply Chain Specialist",
    "Business Owner",
    "Sourcing Agent",
    "Trading Company Representative",
    "Logistics Manager",
    "Trader",
  ]

  return roles[Math.floor(Math.random() * roles.length)]
}

// Generate random location
function randomLocation() {
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

// Generate a single mock user
function generateMockUser(id: number) {
  const firstNames = [
    "John",
    "Maria",
    "Wei",
    "Aisha",
    "Carlos",
    "Fatima",
    "Hiroshi",
    "Elena",
    "Mohammed",
    "Priya",
    "Kwame",
    "Sophia",
    "Raj",
    "Olga",
    "Luis",
    "Mei",
  ]

  const lastNames = [
    "Smith",
    "Garcia",
    "Chen",
    "Patel",
    "Rodriguez",
    "Al-Farsi",
    "Tanaka",
    "Petrova",
    "Al-Fayed",
    "Sharma",
    "Osei",
    "Kim",
    "Gupta",
    "Ivanova",
    "Hernandez",
    "Wong",
  ]

  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
  const name = `${firstName} ${lastName}`

  return {
    id: `user-${id}`,
    name,
    role: randomRole(),
    location: randomLocation(),
    memberSince: randomMemberSince(),
    bio: randomBio(),
    verified: Math.random() > 0.7, // 30% chance of being verified
  }
}

// Generate multiple mock users
export function generateMockUsers(count = 10) {
  const users = []

  for (let i = 1; i <= count; i++) {
    users.push(generateMockUser(i))
  }

  return users
}
