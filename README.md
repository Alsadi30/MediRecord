# MediRecord

MediRecord is a personal medical application designed to track and maintain a person's medical and health-related data. This application aims to cater to the needs of individuals, whether they are managing existing health conditions or simply maintaining their health records. With MediRecord, users can store and organize their general information, physical health status, consultation history, medical test results, medications, routine tests, and expert advice.

## Features

- **User Authentication**: Secure user registration and authentication using JWT (JSON Web Tokens).
- **Consultation History**: Record and track visits to medical consultants, including consultant information.
- **Medical Test Records**: Store and manage results from medical tests, linking them to the relevant consultations.
- **Medication Tracking**: Keep records of prescribed medications, dosages, and schedules.
- **Health Status Monitoring**: Record and update physical health status over time.
- **Expert Advice**: Store and access advice provided by medical consultants.
- **Data Organization**: All information is logically organized, making it easy to access and understand.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Alsadi30/medirecord.git


Certainly, here's the complete README file in one markdown block for your GitHub repository:

markdown
Copy code
# MediRecord

MediRecord is a personal medical application designed to track and maintain a person's medical and health-related data. This application aims to cater to the needs of individuals, whether they are managing existing health conditions or simply maintaining their health records. With MediRecord, users can store and organize their general information, physical health status, consultation history, medical test results, medications, routine tests, and expert advice.

## Features

- **User Authentication**: Secure user registration and authentication using JWT (JSON Web Tokens).
- **Consultation History**: Record and track visits to medical consultants, including consultant information.
- **Medical Test Records**: Store and manage results from medical tests, linking them to the relevant consultations.
- **Medication Tracking**: Keep records of prescribed medications, dosages, and schedules.
- **Health Status Monitoring**: Record and update physical health status over time.
- **Expert Advice**: Store and access advice provided by medical consultants.
- **Data Organization**: All information is logically organized, making it easy to access and understand.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/medirecord.git
   
Install dependencies:   
cd medirecord
npm install

Set up environment variables:

Create a .env file in the project root and add the following environment variables:
DB_CONNECTION_URL=mongodb+srv://<username>:<password>@*********r.mongodb.net/
DB_USERNAME= username
DB_PASSWORD= dbpassword
ACCESS_TOKEN_SECRET=  SECRET

Start the application:
npm run dev

Usage
Access the API documentation using Swagger UI by visiting Swagger UI in your web browser while the application is running.
API Documentation
You can find detailed documentation for the API endpoints below. This API follows the OpenAPI specification.

API Endpoints

## Consultant Visit

### Get all Consultant Visits

- **URL**: `/consultant-visit`
- **Method**: `GET`
- **Description**: Get all consultant visits of a patient.
- **Parameters**:
  - `page` (query, integer, optional): Current page number.
  - `limit` (query, integer, optional): Maximum items to be returned.
  - `searchBy` (query, string, optional): Search item.
  - `search` (query, string, optional): Search term.
- **Responses**:
  - `200`: Return a list of consultant visits.
  - `400`: Bad Request.
  - `500`: Internal Server Error.

### Create a Consultant Visit

- **URL**: `/consultant-visit`
- **Method**: `POST`
- **Description**: Create a new consultant visit.
- **Request Body**:
  - `consultant_name` (string, required): Name of the consultant.
  - `consultant_id` (string, required): ID of the consultant.
  - `visit_no` (string, required): Visit number.
  - `date` (string, date format, required): Date of the visit.
- **Responses**:
  - `201`: Consultant visit created successfully.
  - `400`: Bad Request.
  - `401`: Unauthorized.
  - `500`: Internal Server Error.

### Get a Consultant Visit by ID

- **URL**: `/consultant-visit/{id}`
- **Method**: `GET`
- **Description**: Get a consultant visit by ID.
- **Parameters**:
  - `id` (path, string, required): Consultant visit ID.
- **Responses**:
  - `200`: Return a consultant visit.
  - `400`: Bad Request.
  - `500`: Internal Server Error.

### Partially Update a Consultant Visit

- **URL**: `/consultant-visit/{id}`
- **Method**: `PATCH`
- **Description**: Partially update a consultant visit.
- **Parameters**:
  - `id` (path, string, required): Consultant visit ID.
- **Request Body**:
  - `consultant_name` (string, optional): Name of the consultant.
  - `consultant_id` (string, optional): ID of the consultant.
  - `visit_no` (string, optional): Visit number.
  - `date` (string, date format, optional): Date of the visit.
- **Responses**:
  - `200`: Successfully updated.
  - `400`: Bad Request.
  - `401`: Unauthorized.
  - `404`: Not Found.
  - `500`: Internal Server Error.

### Delete a Consultant Visit by ID

- **URL**: `/consultant-visit/{id}`
- **Method**: `DELETE`
- **Description**: Delete a consultant visit by ID.
- **Parameters**:
  - `id` (path, string, required): Consultant visit ID.
- **Responses**:
  - `204`: Consultant visit deleted successfully.
  - `401`: Unauthorized.
  - `404`: Not Found.
  - `500`: Internal Server Error.

## General Condition

### Get all General Conditions

- **URL**: `/general-condition`
- **Method**: `GET`
- **Description**: Get all general conditions of a patient.
- **Parameters**:
  - `page` (query, integer, optional): Current page number.
  - `limit` (query, integer, optional): Maximum items to be returned.
- **Responses**:
  - `200`: Return a list of general conditions.
  - `400`: Bad Request.
  - `500`: Internal Server Error.

### Create a General Condition

- **URL**: `/general-condition`
- **Method**: `POST`
- **Description**: Create a new general condition.
- **Request Body**:
  - `sign_symptom` (string, required): Sign or symptom.
  - `BP` (string, required): Blood pressure.
  - `pulse` (integer, required): Pulse rate.
  - `weight` (integer, required): Weight.
  - `age` (integer, required): Age.
  - `body_condition` (string, required): Body condition.
  - `consultant_visit_id` (string, required): ID of the related consultant visit.
- **Responses**:
  - `201`: General condition created successfully.
  - `400`: Bad Request.
  - `401`: Unauthorized.
  - `500`: Internal Server Error.

### Get a General Condition by ID

- **URL**: `/general-condition/{id}`
- **Method**: `GET`
- **Description**: Get a general condition by ID.
- **Parameters**:
  - `id` (path, string, required): General condition ID.
- **Responses**:
  - `200`: Return a general condition.
  - `400`: Bad Request.
  - `500`: Internal Server Error.

### Partially Update a General Condition

- **URL**: `/general-condition/{id}`
- **Method**: `PATCH`
- **Description**: Partially update a general condition.
- **Parameters**:
  - `id` (path, string, required): General condition ID.
- **Request Body**:
  - `sign_symptom` (string, optional): Sign or symptom.
  - `BP` (string, optional): Blood pressure.
  - `pulse` (integer, optional): Pulse rate.
  - `weight` (integer, optional): Weight.
  - `age` (integer, optional): Age.
  - `body_condition` (string, optional): Body condition.
  - `consultant_visit_id` (string, optional): ID of the related consultant visit.
- **Responses**:
  - `200`: Successfully updated.
  - `400`: Bad Request.
  - `401`: Unauthorized.
  - `404`: Not Found.
  - `500`: Internal Server Error.

### Delete a General Condition by ID

- **URL**: `/general-condition/{id}`
- **Method**: `DELETE`
- **Description**: Delete a general condition by ID.
- **Parameters**:
  - `id` (path, string, required): General condition ID.
- **Responses**:
  - `204`: General condition deleted successfully.
  - `401`: Unauthorized.
  - `404`: Not Found.
  - `500`: Internal Server Error.

## Lab Test

### Get all Lab Tests

- **URL**: `/lab-test`
- **Method**: `GET`
- **Description**: Get all lab tests of a patient.
- **Parameters**:
  - `page` (query, integer, optional): Current page number.
  - `limit` (query, integer, optional): Maximum items to be returned.
- **Responses**:
  - `200`: Return a list of lab tests.
  - `400`: Bad Request.
  - `500`: Internal Server Error.

### Create a Lab Test

- **URL**: `/lab-test`
- **Method**: `POST`
- **Description**: Create a new lab test.
- **Request Body**:
  - `test_name` (string, required): Name of the lab test.
  - `test_result` (string, required): Test result.
  - `normal_result` (string, required): Normal result.
  - `comment` (string, required): Comment.
  - `date` (string, date format, required): Date of the test.
  - `test_type` (string, enum, required): Type of test (routine or typical).
  - `consultant_visit_id` (string, required): ID of the related consultant visit.
- **Responses**:
  - `201`: Lab test created successfully.
  - `400`: Bad Request.
  - `401`: Unauthorized.
  - `500`: Internal Server Error.

### Get a Lab Test by ID

- **URL**: `/lab-test/{id}`
- **Method**: `GET`
- **Description**: Get a lab test by ID.
- **Parameters**:
  - `id` (path, string, required): Lab test ID.
- **Responses**:
  - `200`: Return a lab test.
  - `400`: Bad Request.
  - `500`: Internal Server Error.

### Partially Update a Lab Test

- **URL**: `/lab-test/{id}`
- **Method**: `PATCH`
- **Description**: Partially update a lab test.
- **Parameters**:
  - `id` (path, string, required): Lab test ID.
- **Request Body**:
  - `test_name` (string, optional): Name of the lab test.
  - `test_result` (string, optional): Test result.
  - `normal_result` (string, optional): Normal result.
  - `comment` (string, optional): Comment.
  - `date` (string, date format, optional): Date of the test.
  - `test_type` (string, enum, optional): Type of test (routine or typical).
  - `consultant_visit_id` (string, optional): ID of the related consultant visit.
- **Responses**:
  - `200`: Successfully updated.
  - `400`: Bad Request.
  - `401`: Unauthorized.
  - `404`: Not Found.
  - `500`: Internal Server Error.

### Delete a Lab Test by ID

- **URL**: `/lab-test/{id}`
- **Method**: `DELETE`
- **Description**: Delete a lab test by ID.
- **Parameters**:
  - `id` (path, string, required): Lab test ID.
- **Responses**:
  - `204`: Lab test deleted successfully.
  - `401`: Unauthorized.
  - `404`: Not Found.
  - `500`: Internal Server Error.

## Prescription

### Get all Prescriptions

- **URL**: `/prescription`
- **Method**: `GET`
- **Description**: Get all prescriptions of a patient.
- **Parameters**:
  - `page` (query, integer, optional): Current page number.
  - `limit` (query, integer, optional): Maximum items to be returned.
  - `searchBy` (query, string, optional): Search item.
  - `search` (query, string, optional): Search term.
- **Responses**:
  - `200`: Return a list of prescriptions.
  - `400`: Bad Request.
  - `500`: Internal Server Error.

### Create a Prescription

- **URL**: `/prescription`
- **Method**: `POST`
- **Description**: Create a new prescription.
- **Request Body**:
  - `diagnosis` (string, required): Diagnosis.
  - `consultant_visit_id` (string, required): ID of the related consultant visit.
  - `general_condition` (string, required): General condition.
  - `advice` (string, required): Advice.
  - `next_date` (string, date format, required): Next appointment date.
- **Responses**:
  - `201`: Prescription created successfully.
  - `400`: Bad Request.
  - `401`: Unauthorized.
  - `500`: Internal Server Error.

### Get a Prescription by ID

- **URL**: `/prescription/{id}`
- **Method**: `GET`
- **Description**: Get a prescription by ID.
- **Parameters**:
  - `id` (path, string, required): Prescription ID.
- **Responses**:
  - `200`: Return a prescription.
  - `400`: Bad Request.
  - `500`: Internal Server Error.

### Partially Update a Prescription

- **URL**: `/prescription/{id}`
- **Method**: `PATCH`
- **Description**: Partially update a prescription.
- **Parameters**:
  - `id` (path, string, required): Prescription ID.
- **Request Body**:
  - `diagnosis` (string, optional): Diagnosis.
  - `consultant_visit_id` (string, optional): ID of the related consultant visit.
  - `general_condition` (string, optional): General condition.
  - `advice` (string, optional): Advice.
  - `next_date` (string, date format, optional): Next appointment date.
- **Responses**:
  - `200`: Successfully updated.
  - `400`: Bad Request.
  - `401`: Unauthorized.
  - `404`: Not Found.
  - `500`: Internal Server Error.

### Delete a Prescription by ID

- **URL**: `/prescription/{id}`
- **Method**: `DELETE`
- **Description**: Delete a prescription by ID.
- **Parameters**:
  - `id` (path, string, required): Prescription ID.
- **Responses**:
  - `204`: Prescription deleted successfully.
  - `401`: Unauthorized.
  - `404`: Not Found.
  - `500`: Internal Server Error.

## Medicine

### Get all Medicines

- **URL**: `/medicine`
- **Method**: `GET`
- **Description**: Get all medicines of a patient.
- **Parameters**:
  - `page` (query, integer, optional): Current page number.
  - `limit` (query, integer, optional): Maximum items to be returned.
- **Responses**:
  - `200`: Return a list of medicines.
  - `400`: Bad Request.
  - `500`: Internal Server Error.

### Create a Medicine

- **URL**: `/medicine`
- **Method**: `POST`
- **Description**: Create a new medicine.
- **Request Body**:
  - `dose` (string, required): Dose information.
  - `duration` (string, required): Duration of the medicine.
  - `prescription_id` (string, required): ID of the related prescription.
- **Responses**:
  - `201`: Medicine created successfully.
  - `400`: Bad Request.
  - `401`: Unauthorized.
  - `500`: Internal Server Error.

### Get a Medicine by ID

- **URL**: `/medicine/{id}`
- **Method**: `GET`
- **Description**: Get a medicine by ID.
- **Parameters**:
  - `id` (path, string, required): Medicine ID.
- **Responses**:
  - `200`: Return a medicine.
  - `400`: Bad Request.
  - `500`: Internal Server Error.

### Partially Update a Medicine

- **URL**: `/medicine/{id}`
- **Method**: `PATCH`
- **Description**: Partially update a medicine.
- **Parameters**:
  - `id` (path, string, required): Medicine ID.
- **Request Body**:
  - `dose` (string, optional): Dose information.
  - `duration` (string, optional): Duration of the medicine.
  - `prescription_id` (string, optional): ID of the related prescription.
- **Responses**:
  - `200`: Successfully updated.
  - `400`: Bad Request.
  - `401`: Unauthorized.
  - `404`: Not Found.
  - `500`: Internal Server Error.

### Delete a Medicine by ID

- **URL**: `/medicine/{id}`
- **Method**: `DELETE`
- **Description**: Delete a medicine by ID.
- **Parameters**:
  - `id` (path, string, required): Medicine ID.
- **Responses**:
  - `204`: Medicine deleted successfully.
  - `401`: Unauthorized.
  - `404`: Not Found.
  - `500`: Internal Server Error.


Accessing API Documentation
To access the API documentation, visit Swagger UI in your web browser while the application is running.

Technologies Used
Express.js: A fast, unopinionated web framework for Node.js.
Mongoose: An ODM (Object Data Modeling) library for MongoDB and Node.js.
JWT: JSON Web Tokens for secure authentication.
bcryptjs: Library for hashing passwords.
Express OpenAPI Validator: Middleware for validating API requests against an OpenAPI specification.
Swagger UI Express: Middleware for serving Swagger UI for API documentation.
Other dependencies for routing, logging, and environment configuration.
Contributing
Contributions to this project are welcome! Please follow the contribution guidelines for more information on how to contribute.

License
This project is licensed under the ISC License.

Contact
Author: Sadi
Email: your.email@example.com
Feel free to reach out if you have any questions or feedback!
