# Task Manager

This is the client-side application for the **Task Manager API**. It provides a user-friendly interface to interact with the backend API, allowing users to manage their tasks efficiently.

## Features

- Create, update, and delete tasks.
- Mark tasks as completed or pending.
- Filter tasks by status or due date.
- Responsive design for desktop and mobile devices.

## Prerequisites

Before running this project, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/Pappyjay157/TaskManagerAPI
    cd task-manager-client
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Configure environment variables:

    Create a `.env` file in the root directory and add the following:

    ```env
    REACT_APP_API_URL=http://localhost:5000/api
    ```

    Replace `http://localhost:5000/api` with the URL of your Task Manager API.

## Running the Application

To start the development server:

```bash
npm start
```

The application will be available at `http://localhost:3000`.

## Build for Production

To create a production build:

```bash
npm run build
```

The optimized files will be in the `build` directory.

## Folder Structure

```
task-manager-client/
├── public/         # Static files
├── src/
│   ├── components/ # Reusable components
│   ├── pages/      # Application pages
│   ├── services/   # API service functions
│   ├── styles/     # Global and component-specific styles
│   └── App.js      # Main application component
├── .env            # Environment variables
├── package.json    # Project metadata and dependencies
└── README.md       # Project documentation
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-name`.
3. Commit your changes: `git commit -m "Add feature-name"`.
4. Push to the branch: `git push origin feature-name`.
5. Open a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

- Thanks to the contributors of the Task Manager API.
- Built with [React](https://reactjs.org/).
