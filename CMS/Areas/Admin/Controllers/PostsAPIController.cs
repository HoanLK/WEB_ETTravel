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

namespace CMS.Areas.Admin.Controllers
{
    public class PostsAPIController : ApiController
    {
        private ETEntities db = new ETEntities();

        // GET: api/PostsAPI
        public IQueryable<Post> GetPost()
        {
            return db.Post.OrderByDescending(p => p.timeCreated);
        }

        // GET: api/PostsAPI/5
        [ResponseType(typeof(Post))]
        public async Task<IHttpActionResult> GetPost(int id)
        {
            Post post = await db.Post.FindAsync(id);
            if (post == null)
            {
                return NotFound();
            }

            return Ok(post);
        }

        // PUT: api/PostsAPI/5
        [Authorize]
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutPost(int id, Post post)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != post.idPost)
            {
                return BadRequest();
            }

            db.Entry(post).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PostExists(id))
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

        // POST: api/PostsAPI
        [Authorize]
        [ResponseType(typeof(Post))]
        public async Task<IHttpActionResult> PostPost(Post post)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Post.Add(post);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (PostExists(post.idPost))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = post.idPost }, post);
        }

        // DELETE: api/PostsAPI/5
        [Authorize]
        [ResponseType(typeof(Post))]
        public async Task<IHttpActionResult> DeletePost(int id)
        {
            Post post = await db.Post.FindAsync(id);
            if (post == null)
            {
                return NotFound();
            }

            db.Post.Remove(post);
            await db.SaveChangesAsync();

            return Ok(post);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool PostExists(int id)
        {
            return db.Post.Count(e => e.idPost == id) > 0;
        }
    }
}