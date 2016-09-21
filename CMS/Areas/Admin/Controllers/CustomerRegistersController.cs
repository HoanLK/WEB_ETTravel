using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Net;
using System.Web;
using System.Web.Mvc;
using CMS.Models;

namespace CMS.Areas.Admin.Controllers
{
    public class CustomerRegistersController : Controller
    {
        private ETEntities db = new ETEntities();

        // GET: Admin/CustomerRegisters
        public async Task<ActionResult> Index()
        {
            return View(await db.CustomerRegister.ToListAsync());
        }

        // GET: Admin/CustomerRegisters/Details/5
        public async Task<ActionResult> Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            CustomerRegister customerRegister = await db.CustomerRegister.FindAsync(id);
            if (customerRegister == null)
            {
                return HttpNotFound();
            }
            return View(customerRegister);
        }

        // GET: Admin/CustomerRegisters/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Admin/CustomerRegisters/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Create([Bind(Include = "id,name,email,phone")] CustomerRegister customerRegister)
        {
            if (ModelState.IsValid)
            {
                db.CustomerRegister.Add(customerRegister);
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }

            return View(customerRegister);
        }

        // GET: Admin/CustomerRegisters/Edit/5
        public async Task<ActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            CustomerRegister customerRegister = await db.CustomerRegister.FindAsync(id);
            if (customerRegister == null)
            {
                return HttpNotFound();
            }
            return View(customerRegister);
        }

        // POST: Admin/CustomerRegisters/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Edit([Bind(Include = "id,name,email,phone")] CustomerRegister customerRegister)
        {
            if (ModelState.IsValid)
            {
                db.Entry(customerRegister).State = EntityState.Modified;
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }
            return View(customerRegister);
        }

        // GET: Admin/CustomerRegisters/Delete/5
        public async Task<ActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            CustomerRegister customerRegister = await db.CustomerRegister.FindAsync(id);
            if (customerRegister == null)
            {
                return HttpNotFound();
            }
            return View(customerRegister);
        }

        // POST: Admin/CustomerRegisters/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> DeleteConfirmed(int id)
        {
            CustomerRegister customerRegister = await db.CustomerRegister.FindAsync(id);
            db.CustomerRegister.Remove(customerRegister);
            await db.SaveChangesAsync();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
