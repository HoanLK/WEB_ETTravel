using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using CMS.Models;

namespace CMS.Controllers
{
    public class BannersAPIController : ApiController
    {
        private ETEntities db = new ETEntities();

        // GET: api/BannersAPI
        public IQueryable<Banner> GetBanner()
        {
            return db.Banner;
        }

        // GET: api/BannersAPI/5
        [ResponseType(typeof(Banner))]
        public async Task<IHttpActionResult> GetBanner(int id)
        {
            Banner banner = await db.Banner.FindAsync(id);
            if (banner == null)
            {
                return NotFound();
            }

            return Ok(banner);
        }

        // PUT: api/BannersAPI/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutBanner(int id, Banner banner)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != banner.id)
            {
                return BadRequest();
            }

            db.Entry(banner).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BannerExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/BannersAPI
        [ResponseType(typeof(Banner))]
        public async Task<IHttpActionResult> PostBanner(Banner banner)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Banner.Add(banner);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = banner.id }, banner);
        }

        // DELETE: api/BannersAPI/5
        [ResponseType(typeof(Banner))]
        public async Task<IHttpActionResult> DeleteBanner(int id)
        {
            Banner banner = await db.Banner.FindAsync(id);
            if (banner == null)
            {
                return NotFound();
            }

            db.Banner.Remove(banner);
            await db.SaveChangesAsync();

            return Ok(banner);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool BannerExists(int id)
        {
            return db.Banner.Count(e => e.id == id) > 0;
        }
    }
}