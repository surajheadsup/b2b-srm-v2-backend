const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/general-service';

// Define Schemas
const RoleSchema = new mongoose.Schema({
  roleName: String,
  allowedEndPoints: [String],
  permission: Array,
  status: String,
  roleType: String,
  noGst: Boolean,
  supportPermissions: Array,
  isDeleted: { type: Boolean, default: false },
  createdAt: Number,
  updatedAt: Number,
  createdBy: mongoose.Schema.Types.ObjectId,
  updatedBy: mongoose.Schema.Types.ObjectId,
});

const UserSchema = new mongoose.Schema({
  name: String,
  username: String,
  email: String,
  password: String,
  phoneNumber: String,
  gender: String,
  roleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' },
  userType: String,
  isDeleted: { type: Boolean, default: false },
  config: Array,
  createdAt: Number,
  updatedAt: Number,
  createdBy: mongoose.Schema.Types.ObjectId,
  updatedBy: mongoose.Schema.Types.ObjectId,
});

const Role = mongoose.model('Role', RoleSchema, 'roles');
const User = mongoose.model('User', UserSchema, 'users');

// Demo Users Data
const demoUsers = [
  { 
    label: "Sumit (Superadmin)", 
    username: "sumit", 
    password: "Sumit@123_+",
    name: "Sumit Kumar",
    email: "sumit@headsupb2b.com",
    phoneNumber: "9876543210",
    gender: "male",
    userType: "superadmin"
  },
  { 
    label: "Support", 
    username: "support", 
    password: "Support@123_+",
    name: "Support Team",
    email: "support@headsupb2b.com",
    phoneNumber: "9876543211",
    gender: "male",
    userType: "admin"
  },
  { 
    label: "Tanshi", 
    username: "tanshi", 
    password: "Tanshi@123_+",
    name: "Tanshi",
    email: "tanshi@headsupb2b.com",
    phoneNumber: "9876543212",
    gender: "female",
    userType: "user"
  },
];

// Initialize Database
async function initializeDatabase() {
  try {
    console.log('');
    console.log('Starting Database Initialization...');
    console.log('');
    
    // Connect to MongoDB
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
    console.log('');

    // Create Superadmin Role
    console.log('Creating superadmin Role...');

    const existingSuperadminRole = await Role.findOne({ roleName: 'superadmin' });

    let superadminRole;
    if (existingSuperadminRole) {
      console.log('superadmin role already exists, using existing role');
      superadminRole = existingSuperadminRole;
    } else {
      superadminRole = await Role.create({
        roleName: 'superadmin',
        allowedEndPoints: [
          '/get-dashboards',
          '/create-dashboard',
          '/update-dashboard',
          '/delete-dashboard',
          '/get-pipelines',
          '/create-pipeline',
          '/update-pipeline',
          '/delete-pipeline',
          '/get-quotations',
          '/create-quotation',
          '/update-quotation',
          '/delete-quotation',
          '/create-order',
          '/update-order',
          '/get-orders',
          '/delete-order',
          '/create-vendor',
          '/update-vendor',
          '/get-vendors',
          '/delete-vendor',
          '/create-customer',
          '/update-customer',
          '/get-customers',
          '/delete-customer',
          '/create-product',
          '/update-product',
          '/get-products',
          '/delete-product',
          '/create-user',
          '/update-user',
          '/get-users',
          '/delete-user',
          '/create-role',
          '/update-role',
          '/get-roles',
          '/delete-role',
          '/create-po',
          '/update-po',
          '/get-pos',
          '/delete-po',
          '/add-client-payment',
          '/update-client-payment',
          '/delete-client-payment',
          '/add-vendor-payment',
          '/update-vendor-payment',
          '/delete-vendor-payment',
          '/fileservice/upload',
          '/fileservice/download'
        ],
        permission: [
          {
            value: 'My Dashboard',
            permission: [{ read: true, write: true, delete: true }],
            child: null
          },
          {
            value: 'Active Leads',
            permission: [{ read: true, write: true, delete: true }],
            child: null
          },
          {
            value: 'Quotation Master',
            permission: [{ read: true, write: true, delete: true }],
            child: null
          },
          {
            value: 'Client PO Master',
            permission: [{ read: true, write: true, delete: true }],
            child: null
          },
          {
            value: 'Order Master',
            permission: [{ read: true, write: true, delete: true }],
            child: null
          },
          {
            value: 'Finance Master',
            permission: [{ read: true, write: true, delete: true }],
            child: null
          },
          {
            value: 'Vendor Master',
            permission: [{ read: true, write: true, delete: true }],
            child: null
          },
          {
            value: 'Customer Master',
            permission: [{ read: true, write: true, delete: true }],
            child: null
          },
          {
            value: 'Product Master',
            permission: [{ read: true, write: true, delete: true }],
            child: null
          },
          {
            value: 'User Management',
            permission: [{ read: true, write: true, delete: true }],
            child: null
          },
          {
            value: 'Role Management',
            permission: [{ read: true, write: true, delete: true }],
            child: null
          }
        ],
        status: 'active',
        roleType: 'superadmin',
        noGst: false,
        supportPermissions: [],
        isDeleted: false,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
      console.log('Superadmin role created');
    }

    // Create Demo Users
    console.log('');
    console.log('Creating Demo Users...');
    console.log('');
    
    const createdUsers = [];
    for (let i = 0; i < demoUsers.length; i++) {
      const demoUser = demoUsers[i];
      const existingUser = await User.findOne({ username: demoUser.username });
      
      if (existingUser) {
        console.log('User "' + demoUser.label + '" already exists, skipping...');
        createdUsers.push(existingUser);
        continue;
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(demoUser.password, 10);

      const newUser = await User.create({
        name: demoUser.name,
        username: demoUser.username,
        email: demoUser.email,
        password: hashedPassword,
        phoneNumber: demoUser.phoneNumber,
        gender: demoUser.gender,
        roleId: superadminRole._id,
        userType: demoUser.userType,
        isDeleted: false,
        config: [],
        createdAt: Date.now(),
        updatedAt: Date.now(),
        createdBy: superadminRole._id,
        updatedBy: superadminRole._id,
      });

      console.log('Created user: ' + demoUser.label);
      console.log('   Username: ' + demoUser.username);
      console.log('   Password: ' + demoUser.password);
      console.log('   User Type: ' + demoUser.userType);
      console.log('');
      
      createdUsers.push(newUser);
    }

    // Summary
    console.log('');
    console.log('============================================================');
    console.log('Database Initialization Complete!');
    console.log('============================================================');
    console.log('');
    console.log('Summary:');
    console.log('   Role: ' + superadminRole.roleName + ' (ID: ' + superadminRole._id + ')');
    console.log('   Users Created: ' + createdUsers.length);
    console.log('');
    console.log('Login Credentials:');
    console.log('');
    
    for (let i = 0; i < demoUsers.length; i++) {
      const user = demoUsers[i];
      console.log('   ' + (i + 1) + '. ' + user.label);
      console.log('      Username: ' + user.username);
      console.log('      Password: ' + user.password);
      console.log('      Type: ' + user.userType);
      console.log('');
    }

    console.log('Next Steps:');
    console.log('   1. Start your services: ./services.sh');
    console.log('   2. Login at: http://localhost:9000/auth/login');
    console.log('   3. Use any of the credentials above');
    console.log('');
    console.log('Happy Testing!');
    console.log('');

  } catch (error) {
    console.error('');
    console.error('Error initializing database:', error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('Disconnected from MongoDB');
    console.log('');
    process.exit(0);
  }
}

// Run initialization
initializeDatabase();
