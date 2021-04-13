FROM repo.mitchell.com/cor-ites-netcore-nodejs:latest AS build
LABEL stage=build
WORKDIR /src
COPY ./__tmp__ .

RUN cd Source && dotnet publish apptest.csproj -c Release -o /home/app

FROM repo.mitchell.com/dotnet/core/aspnet:3.1.6-alpine3.12
STOPSIGNAL SIGINT


WORKDIR /home/app
COPY --from=build /home/app .
ARG aspnetenv=local

ENV ASPNETCORE_ENVIRONMENT ${aspnetenv}


EXPOSE 80

ENTRYPOINT ["dotnet", "Mitchell.CSG.apptest.dll"]

