my-app-backend/
├── node_modules/               # Auto-generated, ignore in git
├── prisma/                     # Prisma ORM files
│   └── schema.prisma           # Your database models (User, Product, Transaction, Role enum)
├── src/                        # All source code (optional but recommended for separation)
│   ├── middleware/             # Custom middleware
│   │   ├── auth.js             # JWT verification + RBAC (requireRole)
│   │   └── errorHandler.js     # Global error handling middleware
│   ├── routes/                 # All API routes
│   │   ├── auth.js             # /auth/register, /auth/login
│   │   ├── products.js         # /products CRUD (Agent only)
│   │   ├── transactions.js     # /transactions/buy, /transactions/history
│   │   ├── users.js            # /users (Admin only: list, manage)
│   │   └── admin.js            # Admin-specific routes (e.g., /admin/users)
│   ├── controllers/            # Optional: Move logic here if routes get crowded
│   │   ├── authController.js
│   │   ├── productController.js
│   │   └── transactionController.js
│   ├── services/               # Optional: Business logic (e.g., buyProduct service)
│   │   └── productService.js
│   ├── utils/                  # Helper functions
│   │   └── auth.js             # JWT sign/verify
│   └── db/                     # Database connection
│       └── prisma.js           # Exports PrismaClient instance
├── public/                     # Optional: Static files (if you serve images directly)
├── .env                        # Environment variables (DATABASE_URL, JWT_SECRET)
├── .env.example                # Template for .env (commit this)
├── .gitignore                  # Ignore node_modules, .env, etc.
├── index.js                    # Main server entry point (or app.js)
├── package.json
└── README.md                   # Project docs: How to run, setup, etc.