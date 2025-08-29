# MonoCRM
Monolithic CRM built with React and .NET.
docker run --name db-crm -e POSTGRES_USER=superuser -e POSTGRES_PASSWORD=super@user -e POSTGRES_DB=microcrm -p 5432:5432 -v postgres-data:/var/lib/postgresql/data -d postgres

/var/lib/docker/volume

#Migration
dotnet ef database drop

dotnet ef migrations add InitialCreate --output-dir Data/Migrations
dotnet ef database update