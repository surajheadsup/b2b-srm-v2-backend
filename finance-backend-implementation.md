# Finance Backend Implementation Guide

## Overview
This document provides complete backend implementation instructions for the Finance module based on the frontend code analysis.

**IMPORTANT:** All financial calculations (totals, remaining amounts, profit, etc.) are performed on the frontend. The backend should only store and retrieve data. Do NOT implement calculation logic in the backend.

---

## Quick Summary

### API Endpoints (7 Total)
1. **GET** `/api/finance/:leadId` or **POST** `/api/finance/get` - Get finance details for a lead
2. **POST** `/api/finance/add-client-payment` - Add client payment
3. **POST** `/api/finance/update-client-payment` - Update client payment
4. **POST** `/api/finance/delete-client-payment` - Delete client payment
5. **POST** `/api/finance/add-vendor-payment` - Add vendor payment
6. **POST** `/api/finance/update-vendor-payment` - Update vendor payment
7. **POST** `/api/finance/delete-vendor-payment` - Delete vendor payment

### Backend Responsibilities
- ✅ Store and retrieve payment data
- ✅ Validate data structure and required fields
- ✅ Handle file uploads for payment proofs
- ✅ Track user audit trail (createdBy, updatedBy)
- ❌ NO calculation logic
- ❌ NO dispatch management (separate service)

---

## Database Schema

### 1. Finance Model (Main Collection)

```javascript
const FinanceSchema = new Schema({
  // Reference to Lead/Pipeline
  leadId: {
    type: Schema.Types.ObjectId,
    ref: 'Pipeline',
    required: true,
    index: true
  },

  // Reference to Order
  orderId: {
    type: Schema.Types.ObjectId,
    ref: 'Order',
    required: true,
    index: true
  },

  // Client Payment Details
  clientPayments: [{
    id: { type: String, required: true, unique: true },
    orderId: { type: Schema.Types.ObjectId, ref: 'Order', required: true },
    type: { type: String, enum: ['client'], default: 'client' },
    amount: { type: Number, required: true, min: 0 },
    paymentType: { type: String, enum: ['full', 'partial', 'credit'], required: true },
    paymentMethod: { type: String, enum: ['cash', 'cheque', 'bank_transfer', 'upi', 'card'] },
    transactionId: { type: String },
    paymentDate: { type: Date, required: true },
    paymentProof: { type: String }, // File path or URL

    // Credit payment specific fields
    creditDays: { type: Number },
    interestRate: { type: Number },
    dueDate: { type: Date },
    interestAmount: { type: Number },

    remarks: { type: String },
    createdAt: { type: Date, default: Date.now },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    updatedAt: { type: Date },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'User' }
  }],

  // Vendor Payment Details
  vendorPayments: [{
    id: { type: String, required: true, unique: true },
    orderId: { type: Schema.Types.ObjectId, ref: 'Order', required: true },
    vendorId: { type: Schema.Types.ObjectId, ref: 'Vendor' }, // Optional: track vendor-wise payments
    type: { type: String, enum: ['vendor'], default: 'vendor' },
    amount: { type: Number, required: true, min: 0 },
    paymentType: { type: String, enum: ['full', 'partial', 'credit'], required: true },
    paymentMethod: { type: String, enum: ['cash', 'cheque', 'bank_transfer', 'upi', 'card'] },
    transactionId: { type: String },
    paymentDate: { type: Date, required: true },
    paymentProof: { type: String }, // File path or URL

    // Credit payment specific fields
    creditDays: { type: Number },
    interestRate: { type: Number },
    dueDate: { type: Date },
    interestAmount: { type: Number },

    remarks: { type: String },
    createdAt: { type: Date, default: Date.now },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    updatedAt: { type: Date },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'User' }
  }],

  // NOTE: Dispatch management is a SEPARATE backend service
  // Dispatch-related fields should NOT be part of Finance schema

  // Metadata
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  updatedAt: { type: Date },
  updatedBy: { type: Schema.Types.ObjectId, ref: 'User' }
}, {
  timestamps: true
});

// Indexes
FinanceSchema.index({ leadId: 1, orderId: 1 });
FinanceSchema.index({ 'clientPayments.orderId': 1 });
FinanceSchema.index({ 'vendorPayments.orderId': 1 });
```

### 2. Order Model (Reference - Key Fields for Finance)

The Order model should contain:
```javascript
{
  _id: ObjectId,
  orderNo: String,
  invoiceNo: String,
  leadId: ObjectId,
  quotationId: ObjectId,
  customers: ObjectId, // Reference to Client
  vendorIds: [ObjectId], // References to Vendors

  // Product Details with Vendor Breakdown
  products: [{
    productName: String,
    variant: String,
    qty: Number,
    rate: Number, // Client rate
    amount: Number, // Client amount (qty * rate)
    gst: Number,
    unit: String,

    // Vendor-wise breakdown for each product
    vendorBreakdown: [{
      vendorId: ObjectId,
      vendorName: String,
      qty: Number, // Quantity allocated to this vendor
      pRate: Number, // Purchase rate from vendor
      pAmount: Number, // Purchase amount (qty * pRate)
      gst: Number
    }]
  }],

  // Financial Calculations
  calculations: {
    totalAmount: Number, // Sum of all product amounts (before GST)
    cgst: Number, // 9% of totalAmount
    sgst: Number, // 9% of totalAmount
    totalTaxableAmount: Number // totalAmount + cgst + sgst
  },

  orderType: String, // 'complete' or 'split'
  status: String, // 'pending', 'initiated', etc.
  isSplit: Boolean,
  splitIndex: Number
}
```

---

## API Endpoints

### 1. Get Finance Details for a Lead

**Endpoint:** `GET /api/finance/:leadId` or `POST /api/finance/get`

**Request Body:**
```json
{
  "_id": "leadId",
  "search": {},
  "populate": [
    {
      "path": "orders",
      "populate": [
        { "path": "customers" },
        { "path": "vendorIds" }
      ]
    },
    { "path": "customers" }
  ]
}
```

**Response:**
```json
{
  "statusCode": 200,
  "data": {
    "_id": "leadId",
    "leadName": "Lead Name",
    "customers": [{
      "_id": "customerId",
      "companyName": "Client Company"
    }],
    "orders": [
      {
        "_id": "orderId",
        "orderNo": "ORD-001",
        "invoiceNo": "INV-001",
        "orderType": "complete",
        "status": "pending",
        "isSplit": false,
        "splitIndex": 0,
        "customers": {
          "_id": "customerId",
          "companyName": "Client Company"
        },
        "vendorIds": [
          {
            "_id": "vendorId1",
            "companyName": "Vendor 1"
          }
        ],
        "products": [
          {
            "productName": "Product A",
            "variant": "Variant 1",
            "qty": 100,
            "rate": 1000,
            "amount": 100000,
            "gst": 18,
            "unit": "MT",
            "vendorBreakdown": [
              {
                "vendorId": "vendorId1",
                "vendorName": "Vendor 1",
                "qty": 60,
                "pRate": 800,
                "pAmount": 48000,
                "gst": 18
              },
              {
                "vendorId": "vendorId2",
                "vendorName": "Vendor 2",
                "qty": 40,
                "pRate": 750,
                "pAmount": 30000,
                "gst": 18
              }
            ]
          }
        ],
        "calculations": {
          "totalAmount": 100000,
          "cgst": 9000,
          "sgst": 9000,
          "totalTaxableAmount": 118000
        }
      }
    ],
    "finance": {
      "_id": "financeId",
      "leadId": "leadId",
      "clientPayments": [
        {
          "id": "CLIENT-PAYMENT-1234567890",
          "orderId": "orderId",
          "type": "client",
          "amount": 50000,
          "paymentType": "partial",
          "paymentMethod": "bank_transfer",
          "transactionId": "TXN123456",
          "paymentDate": "2025-01-15T00:00:00.000Z",
          "paymentProof": "path/to/proof.jpg",
          "remarks": "First installment",
          "createdAt": "2025-01-15T10:30:00.000Z",
          "createdBy": "userId",
          "updatedBy": "userId"
        }
      ],
      "vendorPayments": [
        {
          "id": "VENDOR-PAYMENT-1234567890",
          "orderId": "orderId",
          "vendorId": "vendorId1",
          "type": "vendor",
          "amount": 30000,
          "paymentType": "partial",
          "paymentMethod": "upi",
          "transactionId": "UPI123456",
          "paymentDate": "2025-01-16T00:00:00.000Z",
          "remarks": "Payment to Vendor 1",
          "createdAt": "2025-01-16T09:00:00.000Z",
          "createdBy": "userId"
        }
      ]
    },
    "selectedOrderId": "orderId" // Optional: for UI state

    // NOTE: Dispatch data comes from a separate backend service
    // and is NOT part of the finance API response
  }
}
```

**Business Logic:**
1. Fetch lead details by leadId
2. Populate all orders with customer and vendor details
3. Fetch or create finance document for this leadId
4. Return combined data with orders and finance information

---

### 2. Add Client Payment

**Endpoint:** `POST /api/finance/add-client-payment`

**Request Body:**
```json
{
  "leadId": "leadId",
  "orderId": "orderId",
  "payment": {
    "amount": 50000,
    "paymentType": "partial",
    "paymentMethod": "bank_transfer",
    "transactionId": "TXN123456",
    "paymentDate": "2025-01-15",
    "paymentProof": "path/to/proof.jpg",
    "remarks": "First installment"
  },
  "createdBy": "userId"
}
```

**Response:**
```json
{
  "statusCode": 200,
  "message": "Client payment added successfully",
  "data": {
    "_id": "financeId",
    "clientPayments": [/* all client payments including new one */]
  }
}
```

**Validation:**
1. Check if orderId exists
2. For non-credit payments: paymentMethod is required
3. For non-cash payments: transactionId is required
4. For credit payments: creditDays and interestRate are required
5. Validate required fields (amount, paymentType, paymentDate)

**Business Logic:**
1. Generate unique payment ID: `CLIENT-PAYMENT-${Date.now()}`
2. If paymentType is 'credit', store creditDays, interestRate, dueDate, and interestAmount (these values come from frontend)
3. Find or create finance document for leadId
4. Push new payment to clientPayments array
5. Return updated finance document

**Note:** Frontend will calculate and send dueDate and interestAmount for credit payments. Backend should just store the values.

---

### 3. Update Client Payment

**Endpoint:** `POST /api/finance/update-client-payment`

**Request Body:**
```json
{
  "leadId": "leadId",
  "paymentId": "CLIENT-PAYMENT-1234567890",
  "updates": {
    "amount": 55000,
    "paymentMethod": "upi",
    "transactionId": "UPI789012",
    "remarks": "Updated first installment"
  },
  "updatedBy": "userId"
}
```

**Response:**
```json
{
  "statusCode": 200,
  "message": "Client payment updated successfully",
  "data": {
    "_id": "financeId",
    "clientPayments": [/* updated payments */]
  }
}
```

**Validation:**
- Same as Add Client Payment validation
- Check that payment exists

**Business Logic:**
1. Find finance document by leadId
2. Find payment in clientPayments array by paymentId
3. Update payment fields with the data sent from frontend
4. Set updatedAt and updatedBy
5. Return updated finance document

**Note:** Frontend will recalculate all values (including credit details) and send updated data. Backend should just update the stored values.

---

### 4. Delete Client Payment

**Endpoint:** `POST /api/finance/delete-client-payment`

**Request Body:**
```json
{
  "leadId": "leadId",
  "paymentId": "CLIENT-PAYMENT-1234567890"
}
```

**Response:**
```json
{
  "statusCode": 200,
  "message": "Client payment deleted successfully",
  "data": {
    "_id": "financeId",
    "clientPayments": [/* remaining payments */]
  }
}
```

**Business Logic:**
1. Find finance document by leadId
2. Remove payment from clientPayments array
3. Return updated finance document

---

### 5. Add Vendor Payment

**Endpoint:** `POST /api/finance/add-vendor-payment`

**Request Body:**
```json
{
  "leadId": "leadId",
  "orderId": "orderId",
  "payment": {
    "vendorId": "vendorId1", // Optional: to track vendor-wise
    "amount": 30000,
    "paymentType": "partial",
    "paymentMethod": "bank_transfer",
    "transactionId": "TXN654321",
    "paymentDate": "2025-01-16",
    "remarks": "Payment to Vendor 1"
  },
  "createdBy": "userId"
}
```

**Response:**
```json
{
  "statusCode": 200,
  "message": "Vendor payment added successfully",
  "data": {
    "_id": "financeId",
    "vendorPayments": [/* all vendor payments including new one */]
  }
}
```

**Validation:**
1. Check if orderId exists
2. For non-credit payments: paymentMethod is required
3. For non-cash payments: transactionId is required
4. For credit payments: creditDays and interestRate are required
5. Validate required fields (amount, paymentType, paymentDate)

**Business Logic:**
1. Generate unique payment ID: `VENDOR-PAYMENT-${Date.now()}`
2. If paymentType is 'credit', store creditDays, interestRate, dueDate, and interestAmount (these values come from frontend)
3. Find or create finance document for leadId
4. Push new payment to vendorPayments array
5. Return updated finance document

**Note:** Frontend handles all calculations. Backend should just store the values.

---

### 6. Update Vendor Payment

**Endpoint:** `POST /api/finance/update-vendor-payment`

**Request Body:**
```json
{
  "leadId": "leadId",
  "paymentId": "VENDOR-PAYMENT-1234567890",
  "updates": {
    "amount": 35000,
    "remarks": "Updated payment amount"
  },
  "updatedBy": "userId"
}
```

**Response:**
```json
{
  "statusCode": 200,
  "message": "Vendor payment updated successfully",
  "data": {
    "_id": "financeId",
    "vendorPayments": [/* updated payments */]
  }
}
```

**Validation & Business Logic:**
- Same as Update Client Payment

---

### 7. Delete Vendor Payment

**Endpoint:** `POST /api/finance/delete-vendor-payment`

**Request Body:**
```json
{
  "leadId": "leadId",
  "paymentId": "VENDOR-PAYMENT-1234567890"
}
```

**Response:**
```json
{
  "statusCode": 200,
  "message": "Vendor payment deleted successfully",
  "data": {
    "_id": "financeId",
    "vendorPayments": [/* remaining payments */]
  }
}
```

**Business Logic:**
- Same as Delete Client Payment

---

**Note:** Dispatch management APIs (add, update, delete dispatch) will be implemented as a SEPARATE backend service and are NOT part of this finance backend implementation.

---

## Financial Calculations

**IMPORTANT:** All financial calculations are done on the FRONTEND, not the backend. The frontend uses the following calculations (provided here for reference only):

### Frontend Calculation Reference (DO NOT IMPLEMENT IN BACKEND)

- **Client Total:** Product amount + CGST (9%) + SGST (9%) - calculated from `order.calculations.totalTaxableAmount`
- **Vendor Total:** Sum of all `vendorBreakdown[].pAmount` from all products
- **Total Paid:** Sum of all payment amounts for an order
- **Remaining Amount:** Total Amount - Total Paid
- **Gross Profit:** Client Total - Vendor Total
- **Profit Percentage:** (Gross Profit / Vendor Total) * 100
- **Credit Due Date:** Payment Date + Credit Days
- **Credit Interest:** Amount * (Interest Rate / 100) * (Credit Days / 365)

These calculations exist in `/src/pages/advanced-leads/steps/finance/finance-service.js` on the frontend.

---

## Key Features to Implement

### 1. **Order-Based Finance Tracking**
- Each order has separate finance tracking
- Support for both complete and split orders
- Track payments and dispatches per order

### 2. **Client Payment Management**
- Track multiple payments per order
- Support full, partial, and credit payments
- Validate payments don't exceed order total
- Store payment proofs/documents

### 3. **Vendor Payment Management**
- Track vendor-wise payments
- Support vendor breakdown from order
- Calculate vendor totals from product vendor breakdowns
- Validate vendor payments

### 4. **Dispatch Management** (SEPARATE BACKEND SERVICE - NOT PART OF FINANCE)
- This will be implemented as a separate backend service
- Not covered in this finance backend implementation

### 5. **Financial Calculations** (FRONTEND ONLY)
- All calculations are done on the frontend
- Backend should NOT implement any calculation logic

### 6. **Vendor-wise Breakdown** (FRONTEND ONLY)
- Vendor breakdown data comes from order.products[].vendorBreakdown
- All calculations are done on the frontend

---

## Important Notes

1. **Backend Role - Data Storage Only:**
   - Backend should ONLY store and retrieve data
   - DO NOT implement any calculation logic
   - Frontend sends all calculated values (totals, remaining amounts, credit details, etc.)
   - Backend validates data structure and stores it

2. **Payment Data:**
   - Store payment data as received from frontend
   - For credit payments, frontend sends calculated dueDate and interestAmount
   - Backend just stores these values

3. **Dispatch Management:**
   - Dispatch will be a SEPARATE backend service
   - NOT part of the finance backend implementation
   - Remove all dispatch-related code from finance APIs

4. **User Tracking:**
   - Always track createdBy and updatedBy using logged-in user ID
   - Store timestamps for audit trail

5. **Data Population:**
   - Always populate orders with customer and vendor details
   - Populate vendorIds in orders to get vendor company names

6. **File Upload:**
   - Handle file uploads for payment proofs
   - Store file paths or URLs in database
   - Implement file size validation (max 5MB for images)

---

## API Response Pattern

All APIs should follow this pattern:
```json
{
  "statusCode": 200,
  "message": "Success message",
  "data": {
    // Actual data
  }
}
```

Error responses:
```json
{
  "statusCode": 400,
  "message": "Error message",
  "error": "Detailed error description"
}
```

---

## Testing Checklist

- [ ] Create finance document when first payment is added
- [ ] Client payment add/update/delete operations work correctly
- [ ] Vendor payment add/update/delete operations work correctly
- [ ] Payment data is stored exactly as received from frontend
- [ ] Credit payment fields (dueDate, interestAmount) are stored correctly
- [ ] File uploads work for payment proofs
- [ ] Multiple orders per lead work correctly
- [ ] Populate orders with customer and vendor details
- [ ] User tracking (createdBy, updatedBy) works correctly
- [ ] Backend does NOT implement any calculation logic
- [ ] Dispatch APIs are NOT part of finance backend

---

## Summary

This finance backend implementation provides:
1. **Data storage only** - No calculation logic
2. Client payment management (add, update, delete)
3. Vendor payment management (add, update, delete)
4. Finance tracking per order
5. File upload support for payment proofs
6. User audit trail (createdBy, updatedBy)
7. Proper data validation and error handling

**What is NOT included:**
- Dispatch management (separate backend service)
- Any financial calculation logic (done on frontend)
- Validation of payment amounts against order totals (done on frontend)
