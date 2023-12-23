# Task Management Module

This .NET Core project introduces a Task Management Module meticulously crafted to emulate corporate workflows, with a focus on facilitating efficient task planning and tracking. The underlying design philosophy of this module is rooted in the principles of the Kanban methodology.

## Features

- **Task Creation:** Generate tasks with distinctive QR Code / Barcode identifiers.
- **Task Status:** Monitor the status of each task.
- **Task Assignment:** Assign tasks to specific users.
- **Task Approval:** Admin users possess the capability to approve or return tasks.



## Getting Started

### Prerequisites

Make sure you have the following installed:

- [.NET Core SDK](https://dotnet.microsoft.com/download)
- [Microsoft SQL Server LocalDB](https://docs.microsoft.com/en-us/sql/database-engine/configure-windows/sql-server-express-localdb?view=sql-server-ver15)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/abdullahkrs/Task-Management-Module.git
    ```

2. Navigate to the project directory:

    ```bash
    cd Task-Management-Module
    ```

3. Update the database connection string in `appsettings.json`:

    ```json
    "ConnectionStrings": {
        "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=aspnet-Task_Management_Module-53bc9b9d-9d6a-45d4-8429-2a2761773502;Trusted_Connection=True;MultipleActiveResultSets=true"
    },
    ```

4. Apply database migrations:

    ```bash
    dotnet ef database update
    ```

5. Build the project:

    ```bash
    dotnet build
    ```

6. Run the application:

    ```bash
    dotnet run
    ```

    
### Usage

1. Open your browser and go to [http://localhost:44316](http://localhost:44316).
2. Use the application to create tasks, view task status, and analyze task data.

## Project Structure

- **Task Management Module**: Main project directory.
  - **Areas**: Directory for organizing different functional areas of the application.
  - **Controllers**: Contains controllers responsible for handling HTTP requests.
  - **Data**: Holds components related to data handling.
  - **Models**: Defines data models for the application.
  - **Pages**: Directory for page-related components.


### Reporting Issues

If you encounter any issues or have suggestions, please [open an issue](https://github.com/abdullahkrs/Task-Management-Module/issues).

### Contributing Code

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature`.
3. Commit your changes: `git commit -m 'Add new feature'`.
4. Push to the branch: `git push origin feature/your-feature`.
5. Submit a pull request.

## License

This project is licensed under the [MIT License](https://github.com/abdullahkrs/Task-Management-Module/blob/main/LICENSE).
