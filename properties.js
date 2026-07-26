// Opulent Acres - 300+ Premium Property Data Source
const baseProperties = [
  {
    title: "Aurora Skyline Residences",
    category: "Sky Residences",
    location: "Dubai",
    priceRange: "$2.5M - $8.0M",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
    thumbnail: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=150&q=70",
    status: "New Launch"
  },
  {
    title: "The Palm Court Villas",
    category: "Villas",
    location: "Goa",
    priceRange: "$1.8M - $4.5M",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    thumbnail: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=150&q=70",
    status: "Ready to Move"
  },
  {
    title: "Marina Glass Towers",
    category: "Waterfront",
    location: "Abu Dhabi",
    priceRange: "$3.2M - $12.0M",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
    thumbnail: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=150&q=70",
    status: "Under Construction"
  },
  {
    title: "Celeste Business Park",
    category: "Commercial",
    location: "Gurugram",
    priceRange: "$5.0M - $25.0M",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    thumbnail: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=150&q=70",
    status: "Ready to Move"
  },
  {
    title: "Emerald Heights",
    category: "Luxury Apartments",
    location: "Mumbai",
    priceRange: "$1.5M - $3.8M",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    thumbnail: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=150&q=70",
    status: "New Launch"
  },
  {
    title: "The Horizon Penthouses",
    category: "Penthouses",
    location: "Pune",
    priceRange: "$2.2M - $5.5M",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    thumbnail: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=150&q=70",
    status: "Under Construction"
  },
  {
    title: "One Boulevard Residences",
    category: "Luxury Apartments",
    location: "Noida",
    priceRange: "$1.2M - $2.8M",
    image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80",
    thumbnail: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=150&q=70",
    status: "Ready to Move"
  },
  {
    title: "The Whitefield Estate",
    category: "Villas",
    location: "Bangalore",
    priceRange: "$2.0M - $6.0M",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
    thumbnail: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=150&q=70",
    status: "Ready to Move"
  },
  {
    title: "Azure Bay Villas",
    category: "Waterfront",
    location: "Goa",
    priceRange: "$3.5M - $9.0M",
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80",
    thumbnail: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=150&q=70",
    status: "New Launch"
  },
  {
    title: "Capital Square Commercial",
    category: "Commercial",
    location: "Hyderabad",
    priceRange: "$4.0M - $18.0M",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    thumbnail: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=150&q=70",
    status: "Ready to Move"
  },
  {
    title: "Lakefront Signature Homes",
    category: "Waterfront",
    location: "Bangalore",
    priceRange: "$2.4M - $7.2M",
    image: "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?auto=format&fit=crop&w=1200&q=80",
    thumbnail: "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?auto=format&fit=crop&w=150&q=70",
    status: "Under Construction"
  },
  {
    title: "Solaris Smart Residences",
    category: "Smart Homes",
    location: "Pune",
    priceRange: "$1.4M - $3.5M",
    image: "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?auto=format&fit=crop&w=1200&q=80",
    thumbnail: "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?auto=format&fit=crop&w=150&q=70",
    status: "Ready to Move"
  },
  {
    title: "The Oberoi Sanctuary",
    category: "Villas",
    location: "Delhi NCR",
    priceRange: "$4.5M - $11.0M",
    image: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=1200&q=80",
    thumbnail: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=150&q=70",
    status: "New Launch"
  },
  {
    title: "Vedic Meadows",
    category: "Farmhouses",
    location: "Ahmedabad",
    priceRange: "$1.1M - $3.2M",
    image: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=80",
    thumbnail: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=150&q=70",
    status: "Ready to Move"
  },
  {
    title: "Viceroy Retail Pavilion",
    category: "Retail Spaces",
    location: "Mumbai",
    priceRange: "$2.8M - $9.5M",
    image: "https://images.unsplash.com/photo-1555637138-afc9f1f75529?auto=format&fit=crop&w=1200&q=80",
    thumbnail: "https://images.unsplash.com/photo-1555637138-afc9f1f75529?auto=format&fit=crop&w=150&q=70",
    status: "Under Construction"
  },
  {
    title: "Infinity Sky Deck",
    category: "Sky Residences",
    location: "Dubai",
    priceRange: "$6.0M - $22.0M",
    image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=1200&q=80",
    thumbnail: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=150&q=70",
    status: "New Launch"
  },
  {
    title: "The Legacy Estates",
    category: "Plots",
    location: "Goa",
    priceRange: "$0.8M - $2.5M",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
    thumbnail: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=150&q=70",
    status: "Ready to Move"
  },
  {
    title: "Centrum Corporate Hub",
    category: "Commercial",
    location: "Chennai",
    priceRange: "$3.5M - $14.0M",
    image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80",
    thumbnail: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=150&q=70",
    status: "Ready to Move"
  },
  {
    title: "Prism Smart Living",
    category: "Smart Homes",
    location: "Noida",
    priceRange: "$0.9M - $2.1M",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80",
    thumbnail: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=150&q=70",
    status: "New Launch"
  },
  {
    title: "Athenaeum Library Plaza",
    category: "Upcoming Projects",
    location: "Hyderabad",
    priceRange: "$2.0M - $5.0M",
    image: "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?auto=format&fit=crop&w=1200&q=80",
    thumbnail: "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?auto=format&fit=crop&w=150&q=70",
    status: "Upcoming"
  },
  {
    title: "Oasis Waterfront Duplex",
    category: "Waterfront",
    location: "Abu Dhabi",
    priceRange: "$4.2M - $10.5M",
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80",
    thumbnail: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=150&q=70",
    status: "Under Construction"
  },
  {
    title: "Verdant Hills Villa",
    category: "Villas",
    location: "Pune",
    priceRange: "$2.6M - $5.8M",
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
    thumbnail: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=150&q=70",
    status: "Ready to Move"
  },
  {
    title: "Elysian Fields",
    category: "Plots",
    location: "Ahmedabad",
    priceRange: "$0.5M - $1.8M",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    thumbnail: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=150&q=70",
    status: "Ready to Move"
  },
  {
    title: "The Quartz Penthouse",
    category: "Penthouses",
    location: "Mumbai",
    priceRange: "$5.5M - $15.0M",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80",
    thumbnail: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=150&q=70",
    status: "Ready to Move"
  },
  {
    title: "Metropolitan Towers",
    category: "Luxury Apartments",
    location: "Gurugram",
    priceRange: "$1.8M - $4.0M",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
    thumbnail: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=150&q=70",
    status: "Ready to Move"
  },
  {
    title: "Zen Oasis Farmhouse",
    category: "Farmhouses",
    location: "Delhi NCR",
    priceRange: "$3.0M - $7.5M",
    image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1200&q=80",
    thumbnail: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=150&q=70",
    status: "Ready to Move"
  },
  {
    title: "Summit Commercial Center",
    category: "Commercial",
    location: "Bangalore",
    priceRange: "$8.0M - $30.0M",
    image: "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=80",
    thumbnail: "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=150&q=70",
    status: "Ready to Move"
  },
  {
    title: "Prestige Sky Villas",
    category: "Sky Residences",
    location: "Hyderabad",
    priceRange: "$3.8M - $9.2M",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80",
    thumbnail: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=150&q=70",
    status: "New Launch"
  },
  {
    title: "Aura Smart Terraces",
    category: "Smart Homes",
    location: "Chennai",
    priceRange: "$1.6M - $3.9M",
    image: "https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=1200&q=80",
    thumbnail: "https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=150&q=70",
    status: "Under Construction"
  },
  {
    title: "The Arc Retail Boulevard",
    category: "Retail Spaces",
    location: "Noida",
    priceRange: "$2.2M - $8.0M",
    image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1200&q=80",
    thumbnail: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=150&q=70",
    status: "Ready to Move"
  },
  {
    title: "Soleil Beach Manor",
    category: "Waterfront",
    location: "Goa",
    priceRange: "$4.8M - $13.5M",
    image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1200&q=80",
    thumbnail: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=150&q=70",
    status: "Ready to Move"
  },
  {
    title: "Signature Ridge Estates",
    category: "Plots",
    location: "Pune",
    priceRange: "$0.7M - $2.2M",
    image: "https://images.unsplash.com/photo-1444653389962-8149286c578a?auto=format&fit=crop&w=1200&q=80",
    thumbnail: "https://images.unsplash.com/photo-1444653389962-8149286c578a?auto=format&fit=crop&w=150&q=70",
    status: "Ready to Move"
  },
  {
    title: "Apex Business HQ",
    category: "Commercial",
    location: "Mumbai",
    priceRange: "$12.0M - $45.0M",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    thumbnail: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=150&q=70",
    status: "Ready to Move"
  },
  {
    title: "Opus Penthouse & Spa",
    category: "Penthouses",
    location: "Dubai",
    priceRange: "$8.5M - $26.0M",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
    thumbnail: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=150&q=70",
    status: "Ready to Move"
  },
  {
    title: "Vasant Vihar Greens",
    category: "Farmhouses",
    location: "Delhi NCR",
    priceRange: "$5.0M - $12.0M",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80",
    thumbnail: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=150&q=70",
    status: "Ready to Move"
  },
  {
    title: "Urban Square Apartments",
    category: "Affordable Luxury",
    location: "Ahmedabad",
    priceRange: "$0.6M - $1.4M",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
    thumbnail: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=150&q=70",
    status: "New Launch"
  },
  {
    title: "Giga Mall Suites",
    category: "Retail Spaces",
    location: "Gurugram",
    priceRange: "$1.8M - $6.5M",
    image: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1200&q=80",
    thumbnail: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=150&q=70",
    status: "Ready to Move"
  },
  {
    title: "Mirage Waterfront Condos",
    category: "Waterfront",
    location: "Dubai",
    priceRange: "$4.0M - $15.0M",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    thumbnail: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=150&q=70",
    status: "Under Construction"
  },
  {
    title: "Elysium Smart Tower",
    category: "Smart Homes",
    location: "Bangalore",
    priceRange: "$1.5M - $4.0M",
    image: "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?auto=format&fit=crop&w=1200&q=80",
    thumbnail: "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?auto=format&fit=crop&w=150&q=70",
    status: "New Launch"
  },
  {
    title: "Serenade Wood Estate",
    category: "Villas",
    location: "Goa",
    priceRange: "$2.5M - $5.5M",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    thumbnail: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=150&q=70",
    status: "Ready to Move"
  },
  {
    title: "Noida Trade Junction",
    category: "Commercial",
    location: "Noida",
    priceRange: "$3.0M - $11.0M",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    thumbnail: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=150&q=70",
    status: "Ready to Move"
  },
  {
    title: "Crown Jewels Sky Villa",
    category: "Sky Residences",
    location: "Mumbai",
    priceRange: "$8.0M - $28.0M",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80",
    thumbnail: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=150&q=70",
    status: "Under Construction"
  },
  {
    title: "Rivera Walkways",
    category: "Waterfront",
    location: "Pune",
    priceRange: "$2.0M - $5.0M",
    image: "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?auto=format&fit=crop&w=1200&q=80",
    thumbnail: "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?auto=format&fit=crop&w=150&q=70",
    status: "Ready to Move"
  },
  {
    title: "The Meadows Phase II",
    category: "Plots",
    location: "Hyderabad",
    priceRange: "$0.6M - $2.0M",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
    thumbnail: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=150&q=70",
    status: "New Launch"
  },
  {
    title: "Smart Hub One",
    category: "Smart Homes",
    location: "Abu Dhabi",
    priceRange: "$1.8M - $4.5M",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80",
    thumbnail: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=150&q=70",
    status: "Ready to Move"
  },
  {
    title: "Hinterland Farmhouses",
    category: "Farmhouses",
    location: "Ahmedabad",
    priceRange: "$1.3M - $3.8M",
    image: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=80",
    thumbnail: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=150&q=70",
    status: "Ready to Move"
  },
  {
    title: "Aura Premium Homes",
    category: "Affordable Luxury",
    location: "Chennai",
    priceRange: "$0.7M - $1.6M",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
    thumbnail: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=150&q=70",
    status: "Ready to Move"
  },
  {
    title: "Upcoming Project Alpha",
    category: "Upcoming Projects",
    location: "Mumbai",
    priceRange: "TBD",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    thumbnail: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=150&q=70",
    status: "Upcoming"
  },
  {
    title: "Upcoming Project Beta",
    category: "Upcoming Projects",
    location: "Gurugram",
    priceRange: "TBD",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    thumbnail: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=150&q=70",
    status: "Upcoming"
  },
  {
    title: "Grand Palace Villa",
    category: "Villas",
    location: "Dubai",
    priceRange: "$5.0M - $18.0M",
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80",
    thumbnail: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=150&q=70",
    status: "Ready to Move"
  },
  {
    title: "Lakeside Plaza",
    category: "Retail Spaces",
    location: "Bangalore",
    priceRange: "$3.0M - $10.0M",
    image: "https://images.unsplash.com/photo-1555637138-afc9f1f75529?auto=format&fit=crop&w=1200&q=80",
    thumbnail: "https://images.unsplash.com/photo-1555637138-afc9f1f75529?auto=format&fit=crop&w=150&q=70",
    status: "Ready to Move"
  },
  {
    title: "The Vantage Sky Penthouse",
    category: "Penthouses",
    location: "Abu Dhabi",
    priceRange: "$7.2M - $20.0M",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80",
    thumbnail: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=150&q=70",
    status: "Ready to Move"
  },
  {
    title: "Palm View Terrace",
    category: "Luxury Apartments",
    location: "Dubai",
    priceRange: "$2.0M - $4.8M",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
    thumbnail: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=150&q=70",
    status: "Ready to Move"
  },
  {
    title: "Greenwood Sanctuary Plots",
    category: "Plots",
    location: "Pune",
    priceRange: "$0.5M - $1.5M",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
    thumbnail: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=150&q=70",
    status: "Ready to Move"
  },
  {
    title: "Centennial Corporate Center",
    category: "Commercial",
    location: "Gurugram",
    priceRange: "$9.0M - $35.0M",
    image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80",
    thumbnail: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=150&q=70",
    status: "Ready to Move"
  },
  {
    title: "The Marina Sands Villa",
    category: "Waterfront",
    location: "Goa",
    priceRange: "$4.1M - $11.0M",
    image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1200&q=80",
    thumbnail: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=150&q=70",
    status: "New Launch"
  },
  {
    title: "Zephyr Smart Duplex",
    category: "Smart Homes",
    location: "Noida",
    priceRange: "$1.1M - $2.8M",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80",
    thumbnail: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=150&q=70",
    status: "Ready to Move"
  },
  {
    title: "Aura Heritage Farms",
    category: "Farmhouses",
    location: "Ahmedabad",
    priceRange: "$2.0M - $5.5M",
    image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1200&q=80",
    thumbnail: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=150&q=70",
    status: "Ready to Move"
  },
  {
    title: "The Boulevard Arcades",
    category: "Retail Spaces",
    location: "Delhi NCR",
    priceRange: "$3.5M - $12.0M",
    image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1200&q=80",
    thumbnail: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=150&q=70",
    status: "Ready to Move"
  },
  {
    title: "Apex Residence Phase III",
    category: "Affordable Luxury",
    location: "Hyderabad",
    priceRange: "$0.8M - $1.8M",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
    thumbnail: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=150&q=70",
    status: "Ready to Move"
  },
  {
    title: "Upcoming Project Gamma",
    category: "Upcoming Projects",
    location: "Chennai",
    priceRange: "TBD",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    thumbnail: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=150&q=70",
    status: "Upcoming"
  }
];

// Generate 300+ entries using structured variation
const properties = [];
const statusOptions = ["Ready to Move", "Under Construction", "New Launch", "Sold Out"];
const suffixes = ["Premium", "Elite", "Signature", "Heritage", "Majestic", "Exclusive", "Royal", "Sovereign"];

for (let i = 0; i < 300; i++) {
  const base = baseProperties[i % baseProperties.length];
  const suffix = suffixes[Math.floor(i / baseProperties.length) % suffixes.length];
  
  properties.push({
    id: i + 1,
    title: `${base.title} ${suffix || ""}`.trim(),
    category: base.category,
    location: base.location,
    priceRange: base.priceRange,
    image: base.image,
    thumbnail: base.thumbnail,
    status: i % 10 === 0 ? "Sold Out" : statusOptions[i % statusOptions.length]
  });
}

// Export to window/global scope for static HTML load
if (typeof window !== "undefined") {
  window.properties = properties;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = properties;
}
