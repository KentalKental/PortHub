// Generate random time
function randomTime() {
  const hours = Math.floor(Math.random() * 12) + 1
  const minutes = Math.floor(Math.random() * 60)
  const ampm = Math.random() > 0.5 ? "AM" : "PM"
  return `${hours}:${minutes < 10 ? "0" + minutes : minutes} ${ampm}`
}

// Generate random date within the last week
function randomRecentDate() {
  const now = new Date()
  const pastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
  const timestamp = pastWeek.getTime() + Math.random() * (now.getTime() - pastWeek.getTime())
  const date = new Date(timestamp)

  // If it's today, return the time
  if (date.toDateString() === now.toDateString()) {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  // If it's yesterday, return "Yesterday"
  const yesterday = new Date(now)
  yesterday.setDate(now.getDate() - 1)
  if (date.toDateString() === yesterday.toDateString()) {
    return "Yesterday"
  }

  // Otherwise return the day name
  return date.toLocaleDateString([], { weekday: "short" })
}

// Generate random messages
function generateRandomMessages(count = 10) {
  const messages = []
  const senders = ["user", "other"]
  const now = new Date()

  for (let i = 0; i < count; i++) {
    const sender = senders[Math.floor(Math.random() * senders.length)]
    const messageTime = new Date(now.getTime() - (count - i) * 5 * 60 * 1000)

    messages.push({
      sender,
      text: getRandomMessage(sender),
      time: messageTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    })
  }

  return messages
}

// Get random message based on sender
function getRandomMessage(sender: string) {
  const userMessages = [
    "Hi there, I'm interested in your listing.",
    "What's the minimum order quantity?",
    "Can you ship to my location?",
    "Do you have any other similar products?",
    "What's your best price for bulk orders?",
    "How long would shipping take?",
    "Is this product still available?",
    "Can you provide more details about the specifications?",
    "Do you accept payment via letter of credit?",
    "I'd like to place an order soon.",
    "Can you send me some samples first?",
    "What are your payment terms?",
  ]

  const otherMessages = [
    "Hello! Yes, it's still available.",
    "The minimum order is 100 units.",
    "We can definitely ship to your location.",
    "We have several similar products. What specifically are you looking for?",
    "For bulk orders, we can offer a 15% discount.",
    "Shipping usually takes 2-3 weeks depending on your location.",
    "Yes, we accept letter of credit for orders over $10,000.",
    "I'd be happy to send you the detailed specifications.",
    "We can arrange for samples. There would be a small fee that's refundable on purchase.",
    "Our standard payment terms are 50% upfront and 50% before shipping.",
    "Let me check with our logistics team and get back to you.",
    "We've worked with clients in your region before without any issues.",
  ]

  return sender === "user"
    ? userMessages[Math.floor(Math.random() * userMessages.length)]
    : otherMessages[Math.floor(Math.random() * otherMessages.length)]
}

// Generate a single mock chat
function generateMockChat(id:number, userName:string) {
  const messages = generateRandomMessages(Math.floor(Math.random() * 15) + 5)
  const lastMessage = messages[messages.length - 1].text
  const lastMessageTime = randomRecentDate()

  const statuses = ["Online", "Offline", "Away", "Last seen recently"]

  return {
    id: id.toString(),
    user: {
      id: `user-${id}`,
      name: userName,
      status: statuses[Math.floor(Math.random() * statuses.length)],
    },
    messages,
    lastMessage,
    lastMessageTime,
  }
}

// Generate multiple mock chats
export function generateMockChats(count = 8) {
  const chats = []
  const names = [
    "John Smith",
    "Maria Garcia",
    "Wei Chen",
    "Aisha Patel",
    "Carlos Rodriguez",
    "Fatima Al-Farsi",
    "Hiroshi Tanaka",
    "Elena Petrova",
    "Mohammed Al-Fayed",
    "Priya Sharma",
    "Kwame Osei",
    "Sophia Kim",
  ]

  // Shuffle the names array
  const shuffledNames = [...names].sort(() => 0.5 - Math.random())

  for (let i = 0; i < Math.min(count, shuffledNames.length); i++) {
    chats.push(generateMockChat(i + 1, shuffledNames[i]))
  }

  return chats
}
