# Task Management Module

This .NET Core project implements a Task Management Module designed to mirror corporate workflows, ensuring efficient planning, and tracking of tasks.

## Features

- **Task Creation:** Create tasks with unique QR Code / Barcode identifiers.
- **Task Status:** View the status of each task.


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

- **TaskManagementApp**: Main project directory.
  - **Controllers**: Contains controllers for handling HTTP requests.
  - **Models**: Defines data models.
  - **Services**: Implements business logic.
  - **Views**: Contains HTML templates (if applicable).
  - ...

- **TaskManagementApp.Tests**: Unit tests directory.
  - ...

## Contributing

Contributions are welcome! Follow the guidelines in [CONTRIBUTING.md](https://github.com/abdullahkrs/Task-Management-Module/blob/main/CONTRIBUTING.md) to contribute to this project.

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
