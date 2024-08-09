# DevSpace

.NET, OData, Angular, TypeScript, and Tailwind web application that provides a platform for developers to interact with one another.

## Getting started

1. Clone the repository to your local machine: `git clone https://github.com/96JD/DevSpace.git`.
2. Run the MySQL database script: [development.sql](Databases/development.sql).
3. Add your own JWT token credentials to [appsettings.Development.json](Backend/appsettings.Development.json).
4. Navigate to the [Src](Backend/Src) folder inside the [Backend](Backend) folder.
5. Start the Backend: `dotnet watch`.
6. Navigate to the [Frontend](Frontend) folder.
7. Install the dependencies: `pnpm i`.
8. Start the Frontend: `pnpm dev`.
9. Log in to the system with the following user:

-   Email: `ds@ds.com`
-   Password: `DevSpace#96`

## Deployment

Frontend: [https://jacob-dolorzo-dev-space.vercel.app](https://jacob-dolorzo-dev-space.vercel.app)

Backend: [https://jacob-dolorzo-dev-space.onrender.com/swagger/index.html](https://jacob-dolorzo-dev-space.onrender.com/swagger/index.html)
