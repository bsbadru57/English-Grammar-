# API Contracts for English Grammar Books Website

## Frontend & Backend Integration Plan

### Current Mock Data to Replace:
- `mockPlans` - Replace with real database data from `/api/plans`
- `mockPaymentInfo` - Replace with real payment processing via `/api/orders`
- `mockDownloadProcess` - Replace with secure download links via `/api/downloads`
- `mockTestimonials` - Replace with real testimonials from `/api/testimonials`

---

## MongoDB Models

### 1. Plan Model
```javascript
{
  _id: ObjectId,
  name: String, // "Basic Plan", "Expert Plan", "Legend Plan"
  price: Number, // 2, 5, 15
  currency: String, // "$"
  originalPrice: Number, // null or original price for discounts
  description: String,
  features: [String], // Array of feature descriptions
  isPopular: Boolean,
  isBestValue: Boolean,
  downloadFiles: [String], // Array of file paths/URLs
  isActive: Boolean, // For enabling/disabling plans
  createdAt: Date,
  updatedAt: Date
}
```

### 2. Order Model
```javascript
{
  _id: ObjectId,
  orderId: String, // "ORDER_" + timestamp
  customerEmail: String,
  customerName: String,
  planId: ObjectId, // Reference to Plan
  planName: String,
  amount: Number,
  currency: String,
  paymentStatus: String, // "pending", "confirmed", "failed"
  paymentProof: String, // Screenshot/proof image URL
  upiTransactionId: String,
  downloadLinks: [String], // Secure download URLs
  downloadCount: Number, // Track how many times downloaded
  maxDownloads: Number, // Limit downloads (default: 5)
  expiresAt: Date, // Download link expiry
  isActive: Boolean,
  notes: String,
  createdAt: Date,
  updatedAt: Date
}
```

### 3. Testimonial Model
```javascript
{
  _id: ObjectId,
  name: String,
  location: String,
  rating: Number, // 1-5
  text: String,
  planName: String,
  isApproved: Boolean,
  isActive: Boolean,
  createdAt: Date
}
```

---

## API Endpoints to Implement

### 1. Plans Management
```
GET /api/plans
- Returns all active plans
- Response: { success: true, data: [plans] }

GET /api/plans/:id  
- Returns specific plan details
- Response: { success: true, data: plan }
```

### 2. Order Processing
```
POST /api/orders
- Creates new order after payment
- Body: { customerEmail, customerName, planId, paymentProof, upiTransactionId }
- Response: { success: true, data: { orderId, message } }

GET /api/orders/:orderId
- Returns order details and status
- Response: { success: true, data: order }

PUT /api/orders/:orderId/confirm
- Admin endpoint to confirm payment and generate download links
- Body: { status: "confirmed" }
- Response: { success: true, data: { downloadLinks } }
```

### 3. Secure Downloads
```
GET /api/downloads/:orderId/:token
- Provides secure download links
- Validates order, token, and download limits
- Returns download file or secure URL

POST /api/downloads/request
- Customer requests download link via email
- Body: { orderId, email }
- Sends email with download links
```

### 4. Testimonials
```
GET /api/testimonials
- Returns approved testimonials
- Response: { success: true, data: [testimonials] }

POST /api/testimonials
- Customers can submit testimonials
- Body: { name, location, rating, text, planName, email }
- Response: { success: true, message: "Thank you for your feedback!" }
```

---

## Frontend Integration Changes

### 1. Replace Mock Data with API Calls

**In PricingSection.js:**
```javascript
// Replace mockPlans import with API call
useEffect(() => {
  fetchPlans(); // Call /api/plans
}, []);
```

**In PaymentSection.js:**
```javascript
// Replace mockPaymentInfo with real order processing
const handleOrderSubmission = async (planId, paymentData) => {
  const response = await fetch('/api/orders', {
    method: 'POST',
    body: paymentData
  });
};
```

### 2. Add Order Tracking
- Add order status page
- Email verification system  
- Download progress tracking

### 3. Real Download System
- Replace mock download links
- Add download counters
- Implement download expiry

---

## Security Considerations

### 1. File Storage
- Store PDF files securely (not in public directory)
- Use signed URLs for downloads
- Implement download rate limiting

### 2. Payment Verification
- Manual payment confirmation workflow
- Admin dashboard for order management
- Email notifications for new orders

### 3. Data Protection
- Encrypt sensitive customer data
- Secure file access tokens
- Audit trail for downloads

---

## Email System Integration

### 1. Customer Notifications
- Order confirmation emails
- Download link delivery
- Payment instructions

### 2. Admin Notifications  
- New order alerts
- Payment proof submissions
- System status updates

---

## Implementation Priority

1. **Phase 1**: Basic CRUD for Plans and Orders
2. **Phase 2**: Payment processing and email notifications
3. **Phase 3**: Secure download system with file management
4. **Phase 4**: Admin dashboard and testimonials

---

## Testing Requirements

### Backend Testing:
- Test all API endpoints
- Validate data models
- Test error handling
- Security penetration testing

### Frontend Integration:
- Test plan selection and ordering flow
- Test payment submission
- Test download functionality  
- Test responsive design

---

This contract ensures seamless integration between frontend mock functionality and real backend services.