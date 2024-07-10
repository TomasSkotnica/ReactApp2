﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactApp2.Server.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

// skotntom: this cs is generated by VS - controller with read/write actions

namespace ReactApp2.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PSRItemsController : ControllerBase
    {
        private readonly PSRContext _context;
        private readonly ILogger<PSRItemsController> _logger;

        public PSRItemsController(PSRContext context, ILogger<PSRItemsController> logger)
        {
            _logger = logger;
            _logger.LogInformation(1234, $"Tomas message to Debug console: PSRsimplesController constructor is starting ...");
            _context = context;
        }

        // GET: api/<PsrrwactionsController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        [HttpGet("releases")]
        public async Task<ActionResult<IEnumerable<string>>> GetReleases()
        {
            return new string[] { "21.0.1", "20.0.2" };
        }

        [HttpGet("filter")]
        public IEnumerable<string> Get2()
        {
            string gen = HttpContext.Request.Query["gen"];
            if (string.IsNullOrEmpty(gen)) { gen = string.Empty; }
            return new string[] { "20.0.1", "20.0.2" };
            // return await _context.PSRitems.Where(t => t.Gen != null && t.Gen.Equals(gen)).ToListAsync();
        }

        // GET api/<PsrrwactionsController>/5
        // now used to get releases by given id of generation
        [HttpGet("{id}")]
        public IEnumerable<string> Get(int id)
        {
            _logger.LogInformation($"Get got generation {id}");
            return new string[] { "20.0.1", "20.0.2" };
        }

        // POST api/<PsrrwactionsController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<PsrrwactionsController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<PsrrwactionsController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
