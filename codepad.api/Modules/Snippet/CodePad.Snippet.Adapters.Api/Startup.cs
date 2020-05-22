using CodePad.Snippet.Adapters.Api.Services;
using CodePad.Snippet.Adapters.Mongo;
using CodePad.Snippet.Adapters.Mongo.Snippets;
using CodePad.Snippet.Domain.Repositories;
using CodePad.Snippet.Domain.Services;
using CodePad.Snippet.Domain.Services.Abstract;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;

namespace CodePad.Snippet.Adapters.Api
{
    public class Startup
    {
        public Startup(IWebHostEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true, reloadOnChange: true)
                .AddEnvironmentVariables();

            Configuration = builder.Build();
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();

            // IoC
            // Services
            services.AddScoped<ISnippetsService, SnippetsService>();
            services.AddScoped<ISnippetsUrlService, SnippetsUrlService>();

            // Repositories
            services.AddScoped<ISnippetsRepository, SnippetsRepository>(); // PROBABLY MOVE TO ADAPTER


            // CORS
            services.AddCors(options =>
            {
                options.AddPolicy("AllowAllOrigins",
                    builder =>
                    {
                        builder
                            .AllowAnyOrigin()
                            .AllowAnyHeader()
                            .AllowAnyMethod();
                    });

                options.DefaultPolicyName = "AllowAllOrigins";
            });

            // appsettings.json

            services.AddOptions();
            services.Configure<MongoConfig>(Configuration.GetSection("MongoConfig"));

            services.AddSwaggerGen(c => { c.SwaggerDoc("v1", new OpenApiInfo {Title = "CodePad", Version = "v1"}); });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "CodePad API v1");
                c.RoutePrefix = string.Empty;
            });

            app.UseCors("AllowAllOrigins");

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints => { endpoints.MapControllers(); });
        }
    }
}