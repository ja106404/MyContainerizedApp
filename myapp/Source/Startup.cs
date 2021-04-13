using System;
using System.Net;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Mitchell.Corp.EnterprisePlatform.AspNetCore;
using Mitchell.Corp.EnterprisePlatform.Logging.Core;
using Mitchell.CSG.CommonCore.Web;

namespace Mitchell.CSG.myapp
{
    public class Startup
    {
        private readonly IConfiguration _configuration;

        public Startup(IConfiguration configuration)
        {
            _configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services
                .AddCors(options =>
                {
                    options.AddPolicy("CorsPolicy", builder => builder
                        .SetIsOriginAllowed(_ => true)
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .AllowCredentials());
                })
                .AddMiResponseCompressionServices()
                .AddMiApiVersioning()
                .AddMiApiDocumentation(typeof(Startup).Assembly);

            services.AddMiMvc()
                .AddMiViewApi();
        }

        public void Configure(IApplicationBuilder appBuilder,
            IWebHostEnvironment env,
            IEnterpriseLoggingAdapter loggingAdapter,
            IHostApplicationLifetime hostApplicationLifetime,
            ILogger<Startup> logger)
        {
            loggingAdapter.Configure(appBuilder);

            appBuilder
                .UseCors("CorsPolicy")
                .UseMiddleware<ExceptionMiddleware>()
                .UseApiVersioning()
                .UseFileServer()
                .UseRouting()
                .UseMiSecurity()
                .UseDefaultEnterprisePlatformComponents()
                .UseEndpoints(endpoint => endpoint.MapControllers())
                .UseMiApiDocumentation();


            if (env.IsLocal())
            {
                appBuilder.UseSpa(spa =>
                {
                    spa.Options.SourcePath = _configuration["spaPath"] ?? "UI";

                    if (_configuration["spa"]?.ToLower() == "react")
                        spa.UseReactDevelopmentServer(npmScript: "start");
                    else
                        spa.UseAngularCliServer(npmScript: "start");
                });
            }

            appBuilder.Run(async (context) =>
            {
                if (context.Request.Path.Value == "/")
                {
                    await context.Response.WriteAsync($"{nameof(myapp)} App Server");
                }
                else
                {
                    context.Response.StatusCode = (int)HttpStatusCode.NotFound;
                }
            });

            hostApplicationLifetime
                .ApplicationStopping
                .Register(() => logger.LogInformation("Shutting down"));
        }
    }
}
