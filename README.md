# helpme-api

## Setup

### Technical Requirements
1. Mongoddb
2. ServiceNow Instance

### Starting a ServiceNow Instance

1. Create an account in https://developer.servicenow.com/
2. Create an instance in https://developer.servicenow.com/app.do#!/instance (Don't forget to take note of the username and password)

### Configuration

The following are what you need to fill up in your `.env` file to get up and running
```
SERVICENOW_INSTANCE=""
SERVICENOW_USERNAME=""
SERVICENOW_PASSWORD=""
DB_NAME=""
```

### Running the tests

Just do a `npm test` to run the full test suite
