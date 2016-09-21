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
    public class CustomerRegistersAPIController : ApiController
    {
        private ETEntities db = new ETEntities();

        // GET: api/CustomerRegistersAPI
        public IQueryable<CustomerRegister> GetCustomerRegister()
        {
            return db.CustomerRegister;
        }

        // GET: api/CustomerRegistersAPI/5
        [ResponseType(typeof(CustomerRegister))]
        public async Task<IHttpActionResult> GetCustomerRegister(int id)
        {
            CustomerRegister customerRegister = await db.CustomerRegister.FindAsync(id);
            if (customerRegister == null)
            {
                return NotFound();
            }

            return Ok(customerRegister);
        }

        // PUT: api/CustomerRegistersAPI/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutCustomerRegister(int id, CustomerRegister customerRegister)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != customerRegister.id)
            {
                return BadRequest();
            }

            db.Entry(customerRegister).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CustomerRegisterExists(id))
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

        // POST: api/CustomerRegistersAPI
        [ResponseType(typeof(CustomerRegister))]
        public async Task<IHttpActionResult> PostCustomerRegister(CustomerRegister customerRegister)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.CustomerRegister.Add(customerRegister);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = customerRegister.id }, customerRegister);
        }

        // DELETE: api/CustomerRegistersAPI/5
        [ResponseType(typeof(CustomerRegister))]
        public async Task<IHttpActionResult> DeleteCustomerRegister(int id)
        {
            CustomerRegister customerRegister = await db.CustomerRegister.FindAsync(id);
            if (customerRegister == null)
            {
                return NotFound();
            }

            db.CustomerRegister.Remove(customerRegister);
            await db.SaveChangesAsync();

            return Ok(customerRegister);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CustomerRegisterExists(int id)
        {
            return db.CustomerRegister.Count(e => e.id == id) > 0;
        }
    }
}