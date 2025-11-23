# General Service - Complete Implementation Task List

## Overview
This document outlines all CRUD operations, schemas, DTOs, and endpoints required for the general-service backend based on the json.md analysis.

---

## 1. VENDOR MODULE

### Module: Vendor Master
**Endpoints Prefix:** `/generalservice/`

### Operations:
1. **Create Vendor**
   - Endpoint: `POST /generalservice/create-vendor`
   - Description: Create a new vendor record

2. **Get Vendors**
   - Endpoint: `POST /generalservice/get-vendors`
   - Description: Retrieve vendors with pagination, search, and population

3. **Update Vendor**
   - Endpoint: `POST /generalservice/update-vendor`
   - Description: Update existing vendor details

4. **Delete Vendor**
   - Endpoint: `POST /generalservice/delete-vendor`
   - Description: Soft delete vendor (set isDeleted flag)

### Schema Fields:
- `_id`: ObjectId (auto-generated)
- `name`: String (required, indexed)
- `companyName`: String (required, indexed)
- `companySize`: String
- `industry`: String (indexed)
- `natureOfCompany`: String
- `designation`: String
- `email`: String (required, indexed, unique)
- `gstNo`: String (indexed)
- `contact`: String (required, indexed)
- `pancardNo`: String
- `msmeNo`: String
- `gst`: Array of Strings (document paths)
- `msme`: Array of Strings (document paths)
- `pancard`: Array of Strings (document paths)
- `tdstcs`: Array of Strings (document paths)
- `billingAddresses`: Array of embedded BillingAddress schema
- `shippingAddresses`: Array of embedded ShippingAddress schema
- `bankDetails`: Array of embedded BankDetail schema
- `config`: Array (mixed type)
- `createdBy`: ObjectId (ref: 'User')
- `updatedBy`: ObjectId (ref: 'User')
- `isDeleted`: Boolean (default: false, indexed)
- `deletedAt`: Number (unix timestamp)
- `createdAt`: Number (unix timestamp, indexed descending)
- `updatedAt`: Number (unix timestamp)

### Embedded Schemas:

#### BillingAddress (Vendor):
- `address`: String (required)
- `landmark`: String
- `pinCode`: String (required)
- `country`: String (required)
- `state`: String (required, indexed)
- `city`: String (required, indexed)
- `gstNo`: String

#### ShippingAddress (Vendor):
- `address`: String (required)
- `landmark`: String
- `pinCode`: String (required)
- `country`: String (required)
- `state`: String (required, indexed)
- `city`: String (required, indexed)
- `gstNo`: String

#### BankDetail:
- `bankName`: String
- `accountNumber`: String
- `ifscCode`: String
- `accountHolderName`: String
- `branchName`: String

### Populated Fields:
- `createdBy` → User (on get-vendors with populate)
- `updatedBy` → User (on get-vendors with populate)

### Indexes:
- name (ascending)
- companyName (ascending)
- industry (ascending)
- email (ascending, unique)
- gstNo (ascending)
- contact (ascending)
- isDeleted (ascending)
- createdAt (descending)
- billingAddresses.state (ascending)
- billingAddresses.city (ascending)
- shippingAddresses.state (ascending)
- shippingAddresses.city (ascending)

---

## 2. CUSTOMER MODULE

### Module: Customer Master
**Endpoints Prefix:** `/generalservice/`

### Operations:
1. **Create Customer**
   - Endpoint: `POST /generalservice/create-customer`
   - Description: Create a new customer record

2. **Get Customers**
   - Endpoint: `POST /generalservice/get-customers`
   - Description: Retrieve customers with pagination, search, and population

3. **Update Customer**
   - Endpoint: `POST /generalservice/update-customer`
   - Description: Update existing customer details

4. **Delete Customer**
   - Endpoint: `POST /generalservice/delete-customer`
   - Description: Soft delete customer (set isDeleted flag)

### Schema Fields:
- `_id`: ObjectId (auto-generated)
- `name`: String (required, indexed)
- `companyName`: String (required, indexed)
- `companySize`: String
- `industry`: String (indexed)
- `natureOfCompany`: String
- `designation`: String
- `email`: String (required, indexed, unique)
- `gstNo`: String (indexed)
- `contact`: String (required, indexed)
- `pancardNo`: String
- `gst`: Array of Strings (document paths)
- `pancard`: Array of Strings (document paths)
- `billingAddresses`: Array of embedded BillingAddress schema
- `shippingAddresses`: Array of embedded ShippingAddress schema
- `config`: Array (mixed type)
- `leadSource`: String
- `createdBy`: ObjectId (ref: 'User')
- `updatedBy`: ObjectId (ref: 'User')
- `isDeleted`: Boolean (default: false, indexed)
- `deletedAt`: Number (unix timestamp)
- `createdAt`: Number (unix timestamp, indexed descending)
- `updatedAt`: Number (unix timestamp)

### Embedded Schemas:

#### BillingAddress (Customer):
- `address1`: String (required)
- `address2`: String
- `landmark`: String
- `city`: String (required, indexed)
- `state`: String (required, indexed)
- `pincode`: String (required)
- `gstNo`: String
- `gstDoc`: String (document path, nullable)
- `location`: Object (optional)
  - `lat`: Number
  - `lng`: Number

#### ShippingAddress (Customer):
- `address1`: String (required)
- `address2`: String
- `landmark`: String
- `city`: String (required, indexed)
- `state`: String (required, indexed)
- `pincode`: String (required)
- `gstNo`: String (optional)
- `gstDoc`: String (document path, nullable, optional)
- `location`: Object (optional)
  - `lat`: Number
  - `lng`: Number

### Populated Fields:
- `createdBy` → User (on get-customers with populate)
- `updatedBy` → User (on get-customers with populate)

### Indexes:
- name (ascending)
- companyName (ascending)
- industry (ascending)
- email (ascending, unique)
- gstNo (ascending)
- contact (ascending)
- isDeleted (ascending)
- createdAt (descending)
- billingAddresses.state (ascending)
- billingAddresses.city (ascending)
- shippingAddresses.state (ascending)
- shippingAddresses.city (ascending)

---

## 3. QUOTATION MODULE

### Module: Quotation Master
**Endpoints Prefix:** `/generalservice/`

### Operations:
1. **Create Quotation**
   - Endpoint: `POST /generalservice/create-quotation`
   - Description: Create a new quotation

2. **Get Quotations**
   - Endpoint: `POST /generalservice/get-quotations`
   - Description: Retrieve quotations with pagination, search, and population

3. **Update Quotation**
   - Endpoint: `POST /generalservice/update-quotation`
   - Description: Update existing quotation

4. **Delete Quotation**
   - Endpoint: `POST /generalservice/delete-quotation`
   - Description: Soft delete quotation (set isDeleted flag)

### Schema Fields:
- `_id`: ObjectId (auto-generated)
- `quotationNo`: String (required, unique, indexed)
- `products`: Array of embedded QuotationProduct schema
- `customerID`: ObjectId (ref: 'Customer', required, indexed)
- `customerIds`: Array of ObjectId (for backward compatibility)
- `leadId`: ObjectId (ref: 'Lead', indexed)
- `status`: String (required, indexed) [draft, sent, final_quotation, approved, rejected]
- `active`: Boolean (default: true, indexed)
- `config`: Array (mixed type)
- `version`: String
- `isDeleted`: Boolean (default: false, indexed)
- `deletedAt`: Number (unix timestamp)
- `createdAt`: Number (unix timestamp, indexed descending)
- `updatedAt`: Number (unix timestamp)

### Embedded Schemas:

#### QuotationProduct:
- `productId`: ObjectId (ref: 'Product', required)
- `productName`: String (required)
- `vendorId`: ObjectId (ref: 'Vendor', required)
- `parentProductId`: String (optional, for split products)
- `variant`: String (required)
- `variantOptions`: Array of VariantOption (from Product)
- `qty`: Number (required)
- `rate`: Number (required)
- `amount`: Number (required)
- `pRate`: Number (purchase rate)
- `pAmount`: Number (purchase amount)
- `gst`: Number (required)
- `splitCount`: Number (default: 0)
- `isSplit`: Boolean (default: false)
- `splitIndex`: Number (optional)
- `id`: String (unique identifier, required)

#### VariantOption (Embedded in QuotationProduct):
- `varientName`: String (required)
- `specifications`: String
- `price`: String (required)
- `askedPrice`: String (nullable)
- `minQty`: String (default: '1')
- `varientUnit`: String (required)
- `priceUnit`: String (required)
- `gst`: String (required)

### Populated Fields:
- `customerID` → Customer (populate full customer details)
- `leadId` → Lead (populate lead details)
- `products.vendorId` → Vendor (nested populate for vendor in products array)
- `products.productId` → Product (nested populate for product details)

### Indexes:
- quotationNo (ascending, unique)
- customerID (ascending)
- leadId (ascending)
- status (ascending)
- active (ascending)
- isDeleted (ascending)
- createdAt (descending)

---

## 4. PO (PURCHASE ORDER) MODULE

### Module: Purchase Order Master
**Endpoints Prefix:** `/generalservice/`

### Operations:
1. **Create PO**
   - Endpoint: `POST /generalservice/create-po`
   - Description: Create a new purchase order (client or vendor PO)

2. **Get POs**
   - Endpoint: `POST /generalservice/get-pos`
   - Description: Retrieve purchase orders with pagination, search, and population

3. **Update PO**
   - Endpoint: `POST /generalservice/update-po`
   - Description: Update existing purchase order

4. **Delete PO**
   - Endpoint: `POST /generalservice/delete-po`
   - Description: Soft delete purchase order (set isDeleted flag)

### Schema Fields:
- `_id`: ObjectId (auto-generated)
- `products`: Array of ObjectId (ref: 'Product')
- `quotations`: Array of ObjectId (ref: 'Quotation')
- `customers`: Array of ObjectId (ref: 'Customer')
- `orders`: Array of ObjectId (ref: 'Order')
- `files`: Array of ObjectId (ref: 'File')
- `poType`: String (required, indexed) [client, vendor]
- `isDeleted`: Boolean (default: false, indexed)
- `status`: String (required, indexed) [Pending, Approved, Completed, Cancelled]
- `config`: Array (mixed type)
- `createdBy`: ObjectId (ref: 'User', required)
- `updatedBy`: ObjectId (ref: 'User', required)
- `createdAt`: Number (unix timestamp, indexed descending)
- `updatedAt`: Number (unix timestamp)

### Populated Fields:
- `products` → Product (populate product details)
- `quotations` → Quotation (populate quotation details)
- `customers` → Customer (populate customer details)
- `orders` → Order (populate order details)
- `files` → File (populate file details with download links)
- `createdBy` → User (populate user details)
- `updatedBy` → User (populate user details)

### Indexes:
- poType (ascending)
- status (ascending)
- isDeleted (ascending)
- createdAt (descending)
- createdBy (ascending)

---

## 5. PIPELINE MODULE

### Module: Pipeline/Lead Master
**Endpoints Prefix:** `/generalservice/`

### Operations:
1. **Create Pipeline**
   - Endpoint: `POST /generalservice/create-pipeline`
   - Description: Create a new pipeline/lead record

2. **Get Pipelines**
   - Endpoint: `POST /generalservice/get-pipelines`
   - Description: Retrieve pipelines with pagination, search, and population

3. **Update Pipeline**
   - Endpoint: `POST /generalservice/update-pipeline`
   - Description: Update existing pipeline

4. **Delete Pipeline**
   - Endpoint: `POST /generalservice/delete-pipeline`
   - Description: Soft delete pipeline (set isDeleted flag)

### Schema Fields:
- `_id`: ObjectId (auto-generated)
- `leadDetails`: Embedded LeadDetails schema (required)
- `quotations`: Array of ObjectId (ref: 'Quotation')
- `customers`: Array of ObjectId (ref: 'Customer')
- `clientPos`: Array of ObjectId (ref: 'PO')
- `vendorPos`: Array of ObjectId (ref: 'PO')
- `orders`: Array of ObjectId (ref: 'Order')
- `finance`: Array of ObjectId (ref: 'Finance')
- `isDeleted`: Boolean (default: false, indexed)
- `config`: Array (mixed type)
- `sameAsBillingAddress`: Boolean (default: false)
- `products`: Array of embedded PipelineProduct schema
- `billingAddress`: Array of embedded Address schema
- `shippingAddress`: Array of embedded Address schema
- `remainingProducts`: Array of embedded RemainingProduct schema
- `selectedOrderId`: ObjectId (ref: 'Order')
- `deletedAt`: Number (unix timestamp)
- `createdAt`: Number (unix timestamp, indexed descending)
- `updatedAt`: Number (unix timestamp)

### Embedded Schemas:

#### LeadDetails:
- `refNo`: String (required, unique, indexed)
- `stakeHolder`: Array of StakeHolder schema
- `leadType`: String (required, indexed) [Organic, Inorganic]
- `leadSource`: ObjectId (ref: 'User', required)

#### StakeHolder:
- `userId`: ObjectId (ref: 'User', required)
- `permission`: Array of Permission schema

#### Permission:
- `sectionName`: String (required)
- `operation`: Array of String [view, edit, delete]

#### PipelineProduct:
- `productId`: ObjectId (ref: 'Product', required)
- `productName`: String (required)
- `vendorId`: ObjectId (ref: 'Vendor', required)
- `parentProductId`: String (optional)
- `variant`: String (required)
- `variantOptions`: Array of VariantOption
- `qty`: Number (required)
- `rate`: Number (required)
- `amount`: Number (required)
- `pRate`: Number (purchase rate)
- `pAmount`: Number (purchase amount)
- `gst`: Number (required)
- `splitCount`: Number (default: 0)
- `isSplit`: Boolean (default: false)
- `splitIndex`: Number (optional)
- `id`: String (unique identifier, required)

#### Address (Billing/Shipping):
- `address1`: String (required)
- `address2`: String
- `landmark`: String
- `city`: String (required)
- `state`: String (required)
- `pincode`: String (required)
- `gstNo`: String
- `gstDoc`: String (nullable)
- `location`: Object (optional)
  - `lat`: Number
  - `lng`: Number
- `index`: Number (required)

#### RemainingProduct:
- `productName`: String (required)
- `variant`: String (required)
- `gst`: Number (required)
- `unit`: String (required)
- `rate`: Number (required)
- `qty`: Number (required)
- `amount`: Number (required)
- `totalAmount`: Number (required)
- `cgst`: Number (required)
- `sgst`: Number (required)
- `totalTaxableAmount`: Number (required)

### Populated Fields:
- `customers` → Customer (populate full customer details)
- `quotations` → Quotation (populate quotation details)
  - Nested populate: `quotations.products.vendorId` → Vendor
- `leadDetails.stakeHolder.userId` → User (nested populate)
- `leadDetails.leadSource` → User (nested populate)
- `products.vendorId` → Vendor (nested populate)
- `products.productId` → Product (nested populate)
- `clientPos` → PO (populate PO details)
  - Nested populate: `clientPos.files` → File
- `vendorPos` → PO (populate PO details)
  - Nested populate: `vendorPos.files` → File
- `orders` → Order (populate order details)
  - Nested populate: `orders.quotationId` → Quotation
- `finance` → Finance (populate finance details)
- `selectedOrderId` → Order (populate selected order)

### Indexes:
- leadDetails.refNo (ascending, unique)
- leadDetails.leadType (ascending)
- leadDetails.leadSource (ascending)
- isDeleted (ascending)
- createdAt (descending)

---

## 6. ORDER MODULE

### Module: Order Master
**Endpoints Prefix:** `/generalservice/`

### Operations:
1. **Create Order**
   - Endpoint: `POST /generalservice/create-order`
   - Description: Create a new order

2. **Get Orders**
   - Endpoint: `POST /generalservice/get-orders`
   - Description: Retrieve orders with pagination, search, and population

3. **Update Order**
   - Endpoint: `POST /generalservice/update-order`
   - Description: Update existing order

4. **Delete Order**
   - Endpoint: `POST /generalservice/delete-order`
   - Description: Soft delete order (set isDeleted flag)

### Schema Fields:
- `_id`: ObjectId (auto-generated)
- `orderNo`: String (required, unique, indexed)
- `invoiceNo`: String (required, unique, indexed)
- `leadId`: ObjectId (ref: 'Lead', required, indexed)
- `quotationId`: ObjectId (ref: 'Quotation', required, indexed)
- `customers`: ObjectId (ref: 'Customer', required, indexed)
- `vendorIds`: Array of ObjectId (ref: 'Vendor')
- `billingAddress`: Array of embedded OrderAddress schema
- `shippingAddress`: Array of embedded OrderAddress schema
- `orderType`: String (required, indexed) [split, full]
- `status`: String (required, indexed) [pending, confirmed, shipped, delivered, cancelled]
- `products`: Array of embedded OrderProduct schema
- `calculations`: Embedded Calculation schema
- `isSplit`: Boolean (default: false, indexed)
- `splitIndex`: Number (optional)
- `splitCount`: Number (default: 0)
- `parentOrderId`: ObjectId (ref: 'Order', optional)
- `active`: Boolean (default: true, indexed)
- `isDeleted`: Boolean (default: false, indexed)
- `deletedAt`: Number (unix timestamp)
- `createdBy`: ObjectId (ref: 'User', required)
- `updatedBy`: ObjectId (ref: 'User', required)
- `createdAt`: Number (unix timestamp, indexed descending)
- `updatedAt`: Number (unix timestamp)

### Embedded Schemas:

#### OrderAddress:
- `address1`: String (required)
- `address2`: String
- `landmark`: String
- `city`: String (required)
- `state`: String (required)
- `pincode`: String (required)
- `gstNo`: String
- `gstDoc`: String (nullable)
- `index`: Number (required)
- `location`: Object (optional)
  - `lat`: Number
  - `lng`: Number

#### OrderProduct:
- `productName`: String (required)
- `variant`: String (required)
- `qty`: Number (required)
- `rate`: Number (required)
- `amount`: Number (required)
- `gst`: Number (required)
- `unit`: String (required)
- `vendorBreakdown`: Array of VendorBreakdown schema

#### VendorBreakdown:
- `vendorId`: ObjectId (ref: 'Vendor', required)
- `vendorName`: String (required)
- `qty`: Number (required)
- `pRate`: Number (purchase rate, required)
- `pAmount`: Number (purchase amount, required)
- `gst`: Number (required)

#### Calculation:
- `totalAmount`: Number (required)
- `cgst`: Number (required)
- `sgst`: Number (required)
- `totalTaxableAmount`: Number (required)

### Populated Fields:
- `leadId` → Lead (populate lead details)
- `quotationId` → Quotation (populate quotation details)
- `customers` → Customer (populate customer details)
- `vendorIds` → Vendor (populate vendor details array)
- `products.vendorBreakdown.vendorId` → Vendor (nested populate)
- `parentOrderId` → Order (populate parent order if split)
- `createdBy` → User (populate user details)
- `updatedBy` → User (populate user details)

### Indexes:
- orderNo (ascending, unique)
- invoiceNo (ascending, unique)
- leadId (ascending)
- quotationId (ascending)
- customers (ascending)
- orderType (ascending)
- status (ascending)
- isSplit (ascending)
- active (ascending)
- isDeleted (ascending)
- createdAt (descending)

---

## 7. USER MODULE

### Module: User Master
**Endpoints Prefix:** `/generalservice/`

### Operations:
1. **Create User**
   - Endpoint: `POST /generalservice/create-user`
   - Description: Create a new user

2. **Get Users**
   - Endpoint: `POST /generalservice/get-users`
   - Description: Retrieve users with pagination, search, and population

3. **Update User**
   - Endpoint: `POST /generalservice/update-user`
   - Description: Update existing user

4. **Delete User**
   - Endpoint: `POST /generalservice/delete-user`
   - Description: Soft delete user (set isDeleted flag)

### Schema Fields:
- `_id`: ObjectId (auto-generated)
- `name`: String (required, indexed)
- `username`: String (required, unique, indexed)
- `phoneNumber`: String (required, indexed)
- `gender`: String (required) [male, female, other]
- `roleId`: ObjectId (ref: 'Role', required, indexed)
- `email`: String (required, unique, indexed)
- `password`: String (required, excluded from query results by default)
- `userType`: String (required, indexed) [superadmin, admin, user]
- `isDeleted`: Boolean (default: false, indexed)
- `config`: Array (mixed type)
- `createdBy`: ObjectId (ref: 'User')
- `updatedBy`: ObjectId (ref: 'User')
- `createdAt`: Number (unix timestamp, indexed descending)
- `updatedAt`: Number (unix timestamp)

### Populated Fields:
- `roleId` → Role (populate role details with permissions)
- `createdBy` → User (populate creator details, select: username)
- `updatedBy` → User (populate updater details, select: username)

### Indexes:
- name (ascending)
- username (ascending, unique)
- phoneNumber (ascending)
- email (ascending, unique)
- roleId (ascending)
- userType (ascending)
- isDeleted (ascending)
- createdAt (descending)

### Special Notes:
- Password must be hashed using bcrypt before storing
- Password field should be excluded from GET responses
- Validation required for email format and phone number format

---

## 8. ROLE MODULE

### Module: Role and Permission Master
**Endpoints Prefix:** `/generalservice/`

### Operations:
1. **Create Role**
   - Endpoint: `POST /generalservice/create-role`
   - Description: Create a new role with permissions

2. **Get Roles**
   - Endpoint: `POST /generalservice/get-roles`
   - Description: Retrieve roles with pagination, search, and population

3. **Update Role**
   - Endpoint: `POST /generalservice/update-role`
   - Description: Update existing role and permissions

4. **Delete Role**
   - Endpoint: `POST /generalservice/delete-role`
   - Description: Soft delete role (set isDeleted flag)

### Schema Fields:
- `_id`: ObjectId (auto-generated)
- `roleName`: String (required, unique, indexed)
- `allowedEndPoints`: Array of String (list of allowed API endpoints)
- `permission`: Array of embedded RolePermission schema
- `status`: String (required, indexed) [active, inactive]
- `isDeleted`: Boolean (default: false, indexed)
- `roleType`: String (required, indexed) [superadmin, admin, user]
- `config`: Array (mixed type)
- `supportPermissions`: Array (mixed type)
- `createdBy`: ObjectId (ref: 'User')
- `updatedBy`: ObjectId (ref: 'User')
- `createdAt`: Number (unix timestamp, indexed descending)
- `updatedAt`: Number (unix timestamp)

### Embedded Schemas:

#### RolePermission:
- `value`: String (required) [e.g., "Customer Master", "Vendor Master"]
- `permission`: Array of PermissionLevel schema
- `child`: Array of RolePermission (nested permissions, nullable)

#### PermissionLevel:
- `read`: Boolean (default: false)
- `write`: Boolean (default: false)
- `delete`: Boolean (default: false)

### Populated Fields:
- `createdBy` → User (populate user details)
- `updatedBy` → User (populate user details)

### Indexes:
- roleName (ascending, unique)
- status (ascending)
- roleType (ascending)
- isDeleted (ascending)
- createdAt (descending)

### Special Notes:
- Check for dependent users before deletion
- Validate that at least one permission is granted
- Ensure endpoint strings match actual API routes

---

## 9. FILE SERVICE MODULE (End Task - To Be Implemented Later)

### Module: File Service
**Endpoints Prefix:** `/generalservice/`

### Operations:
1. **Upload File**
   - Endpoint: `POST /generalservice/upload-file`
   - Description: Upload single file via form-data, store in DB, return file info with download link

2. **Get Files**
   - Endpoint: `POST /generalservice/get-files`
   - Description: Retrieve files with pagination, search, and population

3. **Download File**
   - Endpoint: `GET /generalservice/download/:fileName`
   - Description: Download file by filename

4. **Delete File**
   - Endpoint: `POST /generalservice/delete-file`
   - Description: Soft delete file (set status to deleted)

### Schema Fields:
- `_id`: ObjectId (auto-generated)
- `originalName`: String (required, indexed)
- `fileName`: String (required, unique, indexed)
- `mimeType`: String (required)
- `size`: Number (required, in bytes)
- `downloadUrl`: String (required)
- `securePath`: String (required, actual file path)
- `uploadedBy`: ObjectId (ref: 'User')
- `status`: String (required, indexed) [active, deleted]
- `deletedAt`: Number (unix timestamp, nullable)
- `createdAt`: Number (unix timestamp, indexed descending)
- `updatedAt`: Number (unix timestamp)

### Populated Fields:
- `uploadedBy` → User (populate user details)

### Indexes:
- originalName (ascending)
- fileName (ascending, unique)
- status (ascending)
- createdAt (descending)

### Special Notes:
- Use multer for file upload handling
- Store files in `/app/uploads/` directory
- Generate UUID for fileName to prevent conflicts
- Create download URL pattern: `https://domain.com/fileservice/download/{fileName}`
- Implement file size limits (configurable)
- Support multiple file types validation
- This is marked as END TASK - implement after all other modules are complete

---

## 10. GLOBAL CONFIGURATIONS

### Common Features for All Modules:

#### Query Format (for all GET operations):
```typescript
{
  page: number (default: 1, min: 1)
  limit: number (default: 10, min: 1, max: 100)
  search: object (search criteria, dynamic fields)
  populate: array (populate configuration)
}
```

#### Pagination Response Format:
```typescript
{
  success: true
  statusCode: 200
  message: string
  data: array
  pagination: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
  timestamp: number
}
```

#### Standard Response Format (Create/Update):
```typescript
{
  success: true
  statusCode: 200 | 201
  message: string
  data: object
  timestamp: number
}
```

#### Error Response Format:
```typescript
{
  success: false
  statusCode: number
  error: string
  message: string[]
  timestamp: string (ISO)
  path: string
  method: string
}
```

### Global Middleware Requirements:
- ValidationPipe (transform, whitelist, forbidNonWhitelisted)
- TimeoutInterceptor (30 seconds)
- AllExceptionsFilter (global error handler)
- CORS configuration

### Common Validation Rules:
- ObjectId validation before database operations
- Email format validation
- Phone number format validation
- Required field validation
- String length limits
- Numeric range validation
- Date/timestamp validation
- Array length validation

### Error Handling Patterns:
- MongoDB duplicate key (11000) → ConflictException
- Invalid ObjectId → BadRequestException
- Document not found → NotFoundException
- Validation errors → BadRequestException
- Generic errors → InternalServerErrorException

### Soft Delete Pattern:
- Set `isDeleted: true`
- Set `deletedAt: Date.now()`
- Filter out deleted records in all queries: `{ isDeleted: false }`
- Cascade check: validate no dependent records before deletion

---

## 11. IMPLEMENTATION ORDER

### Phase 1: Foundation
1. User Module (required for createdBy/updatedBy references)
2. Role Module (required for User.roleId reference)

### Phase 2: Master Data
3. Vendor Module
4. Customer Module
5. Product Module (already exists, may need updates)

### Phase 3: Business Operations
6. Quotation Module
7. Order Module
8. PO Module

### Phase 4: Complex Modules
9. Pipeline Module (depends on all above modules)

### Phase 5: Support Services
10. File Service Module (end task)

---

## 12. ADDITIONAL NOTES

### Populate Deep Nesting Support:
- Support nested populate as shown in sample (e.g., quotations → products.vendorId)
- Use populate builder utility for dynamic population
- Validate populate paths before execution

### Search Query Building:
- String fields → case-insensitive regex search
- Number/Boolean → exact match
- Arrays → $in operator
- Objects → direct query merge
- Support dot notation for nested fields

### Validation Requirements:
- All fields with "Id" suffix must be valid ObjectId
- All fields with "Ids" suffix must be array of valid ObjectId
- **NO email validation, phone validation, length checks** - these are handled by frontend
- Only validate required fields and ObjectId format
- Required nested objects must have all required fields

### Index Strategy:
- Index all foreign key fields (ObjectId references)
- Index frequently searched fields (name, email, contact, etc.)
- Index status and isDeleted flags
- Index createdAt descending for recent-first queries
- Compound indexes where needed for complex queries

### API Conventions:
- All endpoints use POST method
- Request body contains search, pagination, and populate
- All responses follow standard format
- All timestamps use Unix timestamp (number)
- All soft deletes use isDeleted boolean flag

---

## 13. IMPLEMENTATION INSTRUCTIONS

### Code Quality Guidelines:
1. **Keep code clean and minimal** - easy to modify later
2. **No frontend validations** - no email format, phone format, length checks
3. **Only backend validations**: required fields, ObjectId format, data types
4. **Reusable code** - use existing utilities (ResponseUtil, QueryBuilderUtil, PopulateBuilderUtil)
5. **Consistent patterns** - follow existing Product module structure
6. **Proper error handling** - use try-catch with specific error types
7. **Soft delete everywhere** - never hard delete records

### Implementation Order (Follow Strictly):
1. **User Module** → Required for createdBy/updatedBy references in all other modules
2. **Role Module** → Required for User.roleId reference
3. **Vendor Module** → Master data, no dependencies after User
4. **Customer Module** → Master data, no dependencies after User
5. **Product Module** → Already exists, verify/update if needed
6. **Quotation Module** → Depends on Customer, Product, Vendor
7. **Order Module** → Depends on Customer, Quotation, Vendor
8. **PO Module** → Depends on Product, Quotation, Customer, Order
9. **Pipeline Module** → Depends on all above modules
10. **File Service Module** → End task, implement last

### Module Structure Template:
```
src/modules/{module-name}/
├── dto/
│   ├── create-{entity}.dto.ts
│   ├── update-{entity}.dto.ts
│   ├── delete-{entity}.dto.ts
│   └── query-{entity}.dto.ts
├── schemas/
│   ├── {entity}.schema.ts
│   └── {embedded-schemas}.schema.ts (if needed)
├── {module}.controller.ts
├── {module}.service.ts
└── {module}.module.ts
```

### DTO Guidelines:
- Use `class-validator` decorators: `@IsString()`, `@IsNumber()`, `@IsOptional()`, `@IsNotEmpty()`, `@IsArray()`, `@ValidateNested()`, `@Type()`
- Use `class-transformer` decorators: `@Type()`, `@Transform()`
- **NO** email validation (`@IsEmail()`), phone validation, length checks (`@Length()`, `@MinLength()`, `@MaxLength()`)
- Only validate: required fields, types, ObjectId format
- Use `@IsMongoId()` for ObjectId fields
- Use `@IsArray()` and `@ArrayMinSize()` where arrays are required

### Schema Guidelines:
- Use Mongoose decorators: `@Prop()`, `@Schema()`
- Set `timestamps: false` in schema options (we use custom unix timestamps)
- Define indexes in schema: `@Prop({ index: true })`, `@Prop({ unique: true, index: true })`
- Use `{ type: mongoose.Schema.Types.ObjectId, ref: 'ModelName' }` for references
- Set `_id: false` for embedded schemas that shouldn't have IDs
- Use `@Type()` from class-transformer for nested objects

### Service Guidelines:
- Inject dependencies: `@InjectModel(ModelName) private model: Model<ModelDocument>`
- Use try-catch in all methods
- Handle specific errors: duplicate key (11000), invalid ObjectId, not found
- Use `Date.now()` for timestamps (unix timestamp in milliseconds)
- Always filter `isDeleted: false` in queries
- Use `lean()` for better performance when not modifying documents
- Use `Promise.all()` for parallel operations (data + count)

### Controller Guidelines:
- Use `@Post()` for all endpoints
- Use `@Body()` to receive request payload
- Return responses using `ResponseUtil.success()`, `ResponseUtil.created()`, `ResponseUtil.paginated()`
- Keep controllers thin - delegate logic to services
- Use descriptive endpoint names: `create-vendor`, `get-vendors`, `update-vendor`, `delete-vendor`

### Error Handling Pattern:
```typescript
try {
  // logic
} catch (error) {
  if (error.code === 11000) {
    throw new ConflictException('Duplicate entry');
  }
  if (error.name === 'CastError') {
    throw new BadRequestException('Invalid ObjectId');
  }
  throw new InternalServerErrorException(error.message);
}
```

### Populate Implementation:
- Accept `populate` array in query DTOs
- Use `PopulateBuilderUtil.build()` to construct populate options
- Support nested populate (e.g., `quotations.products.vendorId`)
- Example:
```typescript
const populateOptions = PopulateBuilderUtil.build(populate);
const query = this.model.find(searchQuery).populate(populateOptions);
```

### Current Implementation Status:
- ✅ Product Module (complete)
- ⏳ User Module (next - required for all other modules)
- ⏳ Role Module (after User)
- ⏳ Vendor Module (starting now)
- ⏳ Customer Module
- ⏳ Quotation Module
- ⏳ Order Module
- ⏳ PO Module
- ⏳ Pipeline Module
- ⏳ File Service Module

---

## END OF TASK LIST
