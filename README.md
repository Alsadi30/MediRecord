# MediRecord

**Project Description:**

This project is a comprehensive healthcare management system API designed to streamline medical records and facilitate patient care. It provides a robust set of endpoints for managing patient data, consultations, prescriptions, lab tests, and medications. The API allows patients and healthcare providers to efficiently track patient history, treatments, and appointments, enhancing the quality of care and patient outcomes.

## Key Features

- **Consultation Management:**
  - Create, retrieve, update, and delete patient consultation records.
  - Track consultation details such as consultant name, visit number, date, and related timestamps.

- **General Condition Tracking:**
  - Record and manage patient general condition data.
  - Capture vital signs like blood pressure, pulse, weight, and age.
  - Monitor general health status and body condition.

- **Lab Test Management:**
  - Easily manage patient lab test records.
  - Record test names, results, normal values, comments, and test types (routine or typical).
  - Organize and retrieve lab test data efficiently.

- **Prescription Handling:**
  - Create, retrieve, update, and delete patient prescriptions.
  - Include diagnosis, consultant visit ID, general condition, advice, and next appointment date.
  - Keep a record of prescription creation and modification timestamps.

- **Medication Management:**
  - Manage patient medication information.
  - Record dosage, duration, and link prescriptions for medication.
  - Efficiently organize and access medication data.

- **Pagination Support:**
  - Implement pagination for large datasets.
  - Control the number of items returned per page and navigate through result pages.

- **Error Handling:**
  - Handle various types of errors gracefully, including bad requests, unauthorized access, resource not found, and internal server errors.

## Installation Steps

1. Clone the repository and navigate to the project directory:

    ```bash
    git clone https://github.com/Alsadi30/MediRecord
    cd MediRecord
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Set up environment variables:

    - Create a `.env` file in the project root.

    - Add the following environment variables to the `.env` file:

        ```plaintext
        DB_CONNECTION_URL=mongodb+srv://<DB_USERNAME>:<DB_PASSWORD>@your.mongodb.net/
        DB_USERNAME=<username>
        DB_PASSWORD=<dbpassword>
        ACCESS_TOKEN_SECRET=<SECRET>
        ```

4. Start the application:

    ```bash
    npm run dev
    ```

## Usage

Access the API documentation using [Swagger UI](http://localhost:8000/docs) in your web browser while the application is running.

## API Documentation

You can find detailed documentation for the API endpoints below. This API follows the OpenAPI specification.

## API Endpoints

### Consultant Visit

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


## Technologies Used

- **Express.js:** A fast, unopinionated web framework for Node.js.
- **Mongoose:** An ODM (Object Data Modeling) library for MongoDB and Node.js.
- **JWT:** JSON Web Tokens for secure authentication.
- **bcryptjs:** Library for hashing passwords.
- **Express OpenAPI Validator:** Middleware for validating API requests against an OpenAPI specification.
- **Swagger UI Express:** Middleware for serving Swagger UI for API documentation.
- Other dependencies for routing, logging, and environment configuration.

## License

This project is licensed under the ISC License.

## Contact

- Author: Sadi
- Email: your.email@example.com

Feel free to reach out if you have any questions or feedback!

