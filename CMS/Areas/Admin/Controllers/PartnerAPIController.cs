using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using CMS.Models;

namespace CMS.Areas.Admin.Controllers
{
    public class PartnerAPIController : ApiController
    {
        private ETEntities db = new ETEntities();

        // GET: api/PartnerAPI
        public IQueryable<Partner> GetPartner()
        {
            return db.Partner;
        }

        // GET: api/PartnerAPI/5
        [ResponseType(typeof(Partner))]
        public IHttpActionResult GetPartner(int id)
        {
            Partner partner = db.Partner.Find(id);
            if (partner == null)
            {
                return NotFound();
            }

            return Ok(partner);
        }

        // PUT: api/PartnerAPI/5
        [Authorize]
        [ResponseType(typeof(void))]
        public IHttpActionResult PutPartner(int id, Partner partner)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != partner.idPartner)
            {
                return BadRequest();
            }

            db.Entry(partner).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PartnerExists(id))
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

        // POST: api/PartnerAPI
        [Authorize]
        [ResponseType(typeof(Partner))]
        public IHttpActionResult PostPartner(Partner partner)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Partner.Add(partner);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = partner.idPartner }, partner);
        }

        // DELETE: api/PartnerAPI/5
        [Authorize]
        [ResponseType(typeof(Partner))]
        public IHttpActionResult DeletePartner(int id)
        {
            Partner partner = db.Partner.Find(id);
            if (partner == null)
            {
                return NotFound();
            }

            db.Partner.Remove(partner);
            db.SaveChanges();

            return Ok(partner);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool PartnerExists(int id)
        {
            return db.Partner.Count(e => e.idPartner == id) > 0;
        }
    }
}