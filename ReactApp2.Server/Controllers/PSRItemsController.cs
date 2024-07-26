﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactApp2.Server.Models;
using System.Xml.Linq;
using LinqKit;

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
            // HardCodeInit();
        }

        private async void HardCodeInit() 
        {
            _context.PsrItems.Add(new PsrItem { Gen = "Forms", Release = "15.0.5", Patchset = "15.0.5-0100", UnixBuild = false });
            _context.PsrItems.Add(new PsrItem { Gen = "Forms", Release = "15.0.5", Patchset = "15.0.5-0120", UnixBuild = false });
            _context.PsrItems.Add(new PsrItem { Gen = "Desktop", Release = "20.0.0", Patchset = "20.0.0-0010", UnixBuild = false });
            _context.PsrItems.Add(new PsrItem { Gen = "Desktop", Release = "20.0.0", Patchset = "20.0.0-0020", UnixBuild = false });
            _context.PsrItems.Add(new PsrItem { Gen = "Desktop", Release = "20.0.0", Patchset = "20.0.0-0030", UnixBuild = false });
            _context.PsrItems.Add(new PsrItem { Gen = "Desktop", Release = "21.0.0", Patchset = "21.0.0-0010", UnixBuild = true });
            if (_context.PsrItems.FirstOrDefault() == null)
                await _context.SaveChangesAsync();

        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<PsrItem>>> Get()
        {
            var predicate = PredicateBuilder.New<PsrItem>(true);

            // to filter, call 'api/PsrItems?gen=Forms'
            string gen = HttpContext.Request.Query["gen"];
            if (!string.IsNullOrEmpty(gen))
            {
                //predicate = predicate.And(x => x.Gen == gen);
                return await _context.PsrItems.Where(t => t.Gen.Equals(gen)).ToListAsync();
            }

            // System.InvalidOperationException: The source 'IQueryable' doesn't implement 'IAsyncEnumerable<ReactApp2.Server.Models.PsrItem>'.
            // Only sources that implement 'IAsyncEnumerable' can be used for Entity Framework asynchronous operations.
            //var requestList =
            //    _context.PsrItems.AsExpandable()
            //    .Where(predicate)
            //    .OrderBy(x => x.Patchset)
            //    .ToListAsync();
            //return await requestList;
            return await _context.PsrItems.ToListAsync();
        }

        [HttpGet("releases")]
        public async Task<ActionResult<IEnumerable<string>>> GetReleases()
        {
            return new string[] { "21.0.5", "20.0.5", "21.0.1", "20.0.2" };
        }

        [HttpGet("releases/{gen}")]
        public async Task<ActionResult<IEnumerable<string>>> GetReleases(string gen)
        {
            if (gen == "Forms")
                return new string[] { "21.0.5", "20.0.5" };
            else if (gen == "Desktop")
                return new string[] { "21.0.1", "20.0.2" };
            else 
                return new string[] { };
        }

        [HttpGet("spacks/{rel}")]
        public async Task<ActionResult<IEnumerable<string>>> GetSpacks(string rel)
        {
            if (rel == "20.0.5")
                return new string[] { "20.0.5-0100", "20.0.5-0120" };
            else if (rel == "21.0.5")
                return new string[] { "21.0.5-1010", "21.0.5-1020" };
            else if (rel == "20.0.2")
                return new string[] { "20.0.2-0010", "20.0.2-0020" };
            else if (rel == "21.0.1")
                return new string[] { "21.0.1-0030", "21.0.1-0040" };
            else
                return new string[] { };
        }

        // GET api/PSRItems/21.0.5-1010
        [HttpGet("{id}")]
        public async Task<ActionResult<PsrItem>> Get(string id)
        {
            return await _context.PsrItems.Where(i => i.Patchset == id).FirstAsync();
        }

        // POST api/PSRItems
        [HttpPost]
        public async Task<ActionResult<PsrItem>> Post([FromBody] PsrItem psrItem)
        {
            _context.PsrItems.Add(psrItem);
            await _context.SaveChangesAsync();
            // ControllerBase.CreatedAtAction vraci CreatedAtActionResult coz je 201
            // (action name, route values, value)
            // nebo se muze vracet (z GET) OkObjectResult volanim Ok(Object); 
            // Inheritance: Object-ActionResult-ObjectResult-OkObjectResult coz je 200

            // v tomto pripade vracim presne to co jsem dostal
            // jinak muzu prijmout data z formulare v jedne tride (DTO, contract, ktery muze byt poskytovany nugetem)
            // a vratit jinou tridu (response), ktera obsahuje navic id, LastModifiedDate ...
            // pro ulozeni do db muzeme mit zase modelovou tridu, kterou naplnime ze vstupniho objektu a k ni pridame id, last modified date ...

            // ukladat se da do Dictionary<klic, objekt> pro vyvojove ucely
            // kdyz se nepouziva EF, tak se dela adresar Services a v nem se implementuje servisni trida pro danou tabulku (repositar)
            // service muze byt jako implemetace interface, lze ji pak nahradit skutecnou implementaci
            // builder.Services.AddSingleton<Iservice, service>();
            // AddScoped - pro vyrizeni jednoho requestu se pouzije jedna instance servicy
            // transient, pokazde, kdyz potrebujes service, udelej novy objekt
            // Buber udelal dictionary jako static a service jako scoped
            return CreatedAtAction("Post", new { patchset = psrItem.Patchset }, psrItem);
        }

        // PUT api/PSRItems/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(string id, [FromBody] PsrItem item)
        {
            if (id != item.Patchset)
            {
                return BadRequest();
            }

            _context.Entry(item).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return Ok();
        }

        // DELETE api/PSRItems/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var item = await _context.PsrItems.FindAsync(id);
            if (item == null)
            {
                return NotFound();
            }

            _context.PsrItems.Remove(item);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
