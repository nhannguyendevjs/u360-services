
# Project Folders Structure

.
├── cmd/               # Contains executable applications
│   ├── cli/           # Command-line application
│   ├── cronjob/       # Scheduled jobs
│   └── server/        # Server application
│      └── main.go     # Run the application
├── config/            # Configuration for applications
│   └── config.yaml    # Main configuration file
├── docs/              # Project documentation
├── global/            # Global variables
├── internal/          # Internal packages
│   ├── controller/    # Handle client requests
│   ├── initialize/    # Initialize necessary components
│   ├── middlewares/   # Server middlewares
│   ├── models/        # Structs representing data
│   ├── repo/          # Query data from the database
│   ├── routers/       # Define routes for the server
│   ├── service/       # Handle business logic
├── migrations/        # Database migration scripts
├── pkg/               # Reusable packages
│   ├── logger/        # Logging for the application
│   ├── response/      # Handle response to the client
│   ├── setting/       # Application settings
│   └── utils/         # Utility functions
├── scripts/           # Development support scripts
├── tests/             # Test cases for the application
├── third_party/       # Third-party libraries
├── .gitignore         # Git ignore file
├── go.mod             # Go dependencies management
├── go.sum             # Contains checksums of dependencies
├── LICENSE            # Project license
└── README.md          # Project description
