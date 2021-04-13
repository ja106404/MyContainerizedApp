## Project Configuration
#### 1. Configuring to use Angular UI
Configure project file (`.csproj`) to use UI folder in build time
```
<PropertyGroup>
   <UIPath Condition="'$(UIPath)' == ''">./UI</UIPath>
</PropertyGroup>
```
Configure `appsettings.json` to use UI folder in run time:
```
{
  ...
  "spa" : "angular",
  "spaPath": "UI"
}
```
#### 2. Configuring to use React UI
Configure project file (`.csproj`) to use UI.React folder in build time
```
<PropertyGroup>
   <UIPath Condition="'$(UIPath)' == ''">./UI.React</UIPath>
</PropertyGroup>
```
Configure `appsettings.json` to use UI.React folder in run time:
```
{
  ...
  "spa" : "react",
  "spaPath": "UI.React"
}
```
## Development Run

Run both the UI and the .NET Core BFF (backend-for-frontend) API:
```
dotnet run -v m
```
Command: `dotnet run`
Optional Arguments: `-v|--verbosity <LEVEL>`, allowed values are q[uiet], m[inimal], n[ormal], d[etailed], and diag[nostic]

The default URL is: http://localhost:8090.  This can be changed in Properties/launchSettings.json.

To update npm packages:
```
dotnet build -c Release
```

To run inside JIT-UX:
```
dotnet run -c Release -v m
```

## Deployment

```
dotnet publish -c Release -o ./dist/publish
```