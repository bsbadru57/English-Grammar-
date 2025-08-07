// Mock data for English Grammar Books website

export const mockPlans = [
  {
    id: 1,
    name: "Basic Plan",
    price: 2,
    originalPrice: null,
    description: "Perfect for beginners who want to master the fundamentals of English grammar",
    features: [
      "All basic grammar rules and concepts",
      "Simple sentence structures", 
      "Parts of speech (nouns, verbs, adjectives, etc.)",
      "Basic tenses and verb forms",
      "Common grammar mistakes to avoid",
      "Practice exercises with answers",
      "PDF format for easy reading",
      "Lifetime access"
    ],
    isPopular: false,
    isBestValue: false,
    downloadLink: "/downloads/basic-grammar-book.pdf"
  },
  {
    id: 2,
    name: "Expert Plan", 
    price: 5,
    originalPrice: null,
    description: "For intermediate learners who want to improve their daily English conversation",
    features: [
      "Daily basic English spoken lines",
      "Common conversational phrases",
      "Everyday expressions and idioms", 
      "Business English basics",
      "Email writing guidelines",
      "Grammar for speaking fluently",
      "Pronunciation tips and tricks",
      "Audio pronunciation guide",
      "Practice dialogues",
      "Lifetime access"
    ],
    isPopular: true,
    isBestValue: false,
    downloadLink: "/downloads/expert-english-book.pdf"
  },
  {
    id: 3,
    name: "Legend Plan",
    price: 15,
    originalPrice: 22, // Basic ($2) + Expert ($5) + Legend premium value
    description: "The ultimate package - Everything you need to become an English master",
    features: [
      "🎉 INCLUDES Basic Plan (FREE - $2 value)",
      "🎉 INCLUDES Expert Plan (FREE - $5 value)", 
      "Advanced grammar concepts",
      "Complex sentence structures",
      "Professional writing techniques",
      "Advanced speaking patterns",
      "Academic English skills",
      "Literature and creative writing",
      "Advanced vocabulary building",
      "Grammar for IELTS/TOEFL prep",
      "Exclusive bonus materials",
      "Priority email support",
      "Lifetime access to all content"
    ],
    isPopular: false,
    isBestValue: true,
    downloadLink: "/downloads/legend-complete-package.zip"
  }
];

export const mockTestimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Mumbai, India",
    rating: 5,
    text: "The Basic Plan helped me understand grammar fundamentals that I struggled with for years. Highly recommended for beginners!",
    plan: "Basic Plan"
  },
  {
    id: 2, 
    name: "Rajesh Kumar",
    location: "Delhi, India",
    rating: 5,
    text: "Expert Plan improved my daily English conversation significantly. The spoken lines and phrases are very practical.",
    plan: "Expert Plan"
  },
  {
    id: 3,
    name: "Anita Patel",
    location: "Bangalore, India", 
    rating: 5,
    text: "Legend Plan is amazing! Getting all three books for just ₹15 was incredible value. My English has transformed completely.",
    plan: "Legend Plan"
  }
];

export const mockPaymentInfo = {
  upiId: "shekhparbeen@okaxis",
  upiName: "Sheikh Parbeen",
  instructions: [
    "Choose your plan from the pricing section above",
    "Open any UPI app (PhonePe, GPay, Paytm, etc.)",
    "Send the exact amount to: shekhparbeen@okaxis", 
    "Take a screenshot of the payment confirmation",
    "Email the screenshot to: support@englishgrammarmaster.com",
    "You will receive download links within 2-4 hours"
  ],
  supportEmail: "support@englishgrammarmaster.com",
  supportWhatsApp: "+91-9999999999" // Mock number
};

export const mockDownloadProcess = {
  steps: [
    {
      step: 1,
      title: "Make Payment",
      description: "Send payment to our UPI ID with your plan details"
    },
    {
      step: 2, 
      title: "Send Confirmation",
      description: "Email payment screenshot to our support team"
    },
    {
      step: 3,
      title: "Get Download Link", 
      description: "Receive secure download links within 2-4 hours"
    },
    {
      step: 4,
      title: "Start Learning",
      description: "Download your books and begin your English mastery journey"
    }
  ]
};

export const mockFAQ = [
  {
    id: 1,
    question: "How do I get the books after payment?",
    answer: "After making payment via UPI, email the screenshot to our support team. You'll receive download links within 2-4 hours."
  },
  {
    id: 2,
    question: "What format are the books in?",
    answer: "All books are in PDF format for easy reading on any device. The Legend Plan includes additional audio files."
  },
  {
    id: 3,
    question: "Is the Legend Plan really better value?",
    answer: "Absolutely! With Legend Plan, you get Basic Plan (₹2) + Expert Plan (₹5) + exclusive advanced content - all for just ₹15."
  },
  {
    id: 4,
    question: "Can I get a refund if I'm not satisfied?",
    answer: "We offer a 7-day money-back guarantee if you're not completely satisfied with your purchase."
  }
];

// Mock function to simulate purchase process
export const mockPurchase = async (planId, paymentProof) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const plan = mockPlans.find(p => p.id === planId);
  
  return {
    success: true,
    message: `Thank you for purchasing ${plan.name}! You will receive download links within 2-4 hours.`,
    orderId: `ORDER_${Date.now()}`,
    plan: plan.name,
    amount: plan.price
  };
};