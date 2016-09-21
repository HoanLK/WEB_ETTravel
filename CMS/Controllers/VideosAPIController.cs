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
    public class VideosAPIController : ApiController
    {
        private ETEntities db = new ETEntities();

        // GET: api/VideosAPI
        public IQueryable<Video> GetVideo()
        {
            return db.Video;
        }

        // GET: api/VideosAPI/5
        [ResponseType(typeof(Video))]
        public async Task<IHttpActionResult> GetVideo(int id)
        {
            Video video = await db.Video.FindAsync(id);
            if (video == null)
            {
                return NotFound();
            }

            return Ok(video);
        }

        // PUT: api/VideosAPI/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutVideo(int id, Video video)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != video.id)
            {
                return BadRequest();
            }

            db.Entry(video).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!VideoExists(id))
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

        // POST: api/VideosAPI
        [ResponseType(typeof(Video))]
        public async Task<IHttpActionResult> PostVideo(Video video)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Video.Add(video);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = video.id }, video);
        }

        // DELETE: api/VideosAPI/5
        [ResponseType(typeof(Video))]
        public async Task<IHttpActionResult> DeleteVideo(int id)
        {
            Video video = await db.Video.FindAsync(id);
            if (video == null)
            {
                return NotFound();
            }

            db.Video.Remove(video);
            await db.SaveChangesAsync();

            return Ok(video);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool VideoExists(int id)
        {
            return db.Video.Count(e => e.id == id) > 0;
        }
    }
}