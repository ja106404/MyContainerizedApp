using System;
using System.Diagnostics.CodeAnalysis;
using System.Threading.Tasks;

using App.Metrics.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

using Mitchell.Corp.EnterprisePlatform.AspNetCore;
using Mitchell.Corp.EnterprisePlatform.Logging.Core;
using Mitchell.Corp.EnterprisePlatform.Logging.NLog;
using Mitchell.CSG.CommonCore.Web;
using NLog.Web;

namespace Mitchell.CSG.apptest
{
    [ExcludeFromCodeCoverage]
    public static class Program
    {
        private const string _configFileName = "nlog/nlog.config";

        public static async Task Main(string[] args)
        {
            var logger = NLogBuilder.ConfigureNLog(_configFileName).GetCurrentClassLogger();
            try
            {
                await CreateHostBuilder(args)
                    .Build()
                    .RunAsync()
                    .ConfigureAwait(continueOnCapturedContext: false);
            }
            catch (Exception ex)
            {
                logger.Error(ex, "Stopped program because of exception");
            }
            finally
            {
                NLog.LogManager.Shutdown();
            }
        }

        public static IHostBuilder CreateHostBuilder(string[] args)
        {
            var loggingAdapter = new NLogEnterpriseLoggingAdapter();

            return Host
                    .CreateDefaultBuilder(args)
                    .UseMiServiceProviderFactory(typeof(Program).Assembly)
                    .ConfigureAppConfiguration((context, builder) =>
                    {
                        builder.AddEnterprisePlatformContext();
                        if (!context.HostingEnvironment.IsEnvironment("unittesting"))
                        {
                            builder.AddEnterprisePlatformConfigServer(
                                new HostingEnvironment(context.HostingEnvironment),
                                loggingAdapter.GetLoggerFactory());
                        }
                    })
                    .ConfigureServices((context, services) =>
                    {
                        var config = context.Configuration;
                        var hostEnvironment = context.HostingEnvironment;

                        services
                            .AddSingleton<IEnterpriseLoggingAdapter>(loggingAdapter)
                            .RegisterEnteprisePlatformContextObjects(config)
                            .RegisterOptions<ApiDocumentationContact>(config.GetSection("SwaggerSettings"));
                    })
                    .ConfigureLogging((context, loggingBuilder) =>
                    {
                        loggingBuilder
                            .ClearProviders()
                            .SetMinimumLevel(LogLevel.Trace);
                    })
                    .UseNLog()
                    .ConfigureWebHostDefaults(webHostBuilder =>
                    {
                        loggingAdapter.RegisterServices(webHostBuilder);

                        webHostBuilder
                            .UseStartup<Startup>()
                            .ConfigureKestrel(options => options.AddServerHeader = false);
                    })
                    .UseMetrics();
        }
    }
}
