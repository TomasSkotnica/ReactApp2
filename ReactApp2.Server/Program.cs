using Microsoft.EntityFrameworkCore;
using ReactApp2.Server.Helpers;
using ReactApp2.Server.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddDbContext<TodoContext>(opt =>
    opt.UseInMemoryDatabase("TodoList"));
builder.Services.AddDbContext<ContactContext>(opt =>
    opt.UseInMemoryDatabase("ContactList"));
builder.Services.AddDbContext<PSRContext>(opt =>
    opt.UseInMemoryDatabase("PSRList"));
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<CsvSerializer>();

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
