using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using CMS.Models;

namespace CMS.Areas.Admin.Controllers
{
    [Authorize]
    public class HotelsController : Controller
    {
        private ETEntities db = new ETEntities();

        // GET: Admin/Hotels
        public ActionResult Index()
        {
            return View(db.Hotel.ToList());
        }

        public ActionResult Checked()
        {
            return View(db.Hotel.ToList());
        }

        //GetAllHotelsNoChecked
        public JsonResult GetAllHotelsNoChecked()
        {
            var model = db.Hotel.Where(p => p.@checked == 0);

            return Json(model, JsonRequestBehavior.AllowGet);
        }

        //GetAllHotelsChecked
        public JsonResult GetAllHotelsChecked()
        {
            var model = db.Hotel.Where(p => p.@checked == 1);

            return Json(model, JsonRequestBehavior.AllowGet);
        }

        // GET: Admin/Hotels/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Hotel hotel = db.Hotel.Find(id);
            if (hotel == null)
            {
                return HttpNotFound();
            }
            return View(hotel);
        }

        // GET: Admin/Hotels/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Admin/Hotels/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "idHotel,hoTen,diaChi,SDT,email,hotel1,timeStart,timeEnd,guestNumber,checked")] Hotel hotel)
        {
            if (ModelState.IsValid)
            {
                db.Hotel.Add(hotel);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(hotel);
        }

        // GET: Admin/Hotels/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Hotel hotel = db.Hotel.Find(id);
            if (hotel == null)
            {
                return HttpNotFound();
            }
            return View(hotel);
        }

        // POST: Admin/Hotels/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "idHotel,hoTen,diaChi,SDT,email,hotel1,timeStart,timeEnd,guestNumber,checked")] Hotel hotel)
        {
            if (ModelState.IsValid)
            {
                db.Entry(hotel).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(hotel);
        }

        // GET: Admin/Hotels/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Hotel hotel = db.Hotel.Find(id);
            if (hotel == null)
            {
                return HttpNotFound();
            }
            return View(hotel);
        }

        // POST: Admin/Hotels/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            Hotel hotel = db.Hotel.Find(id);
            db.Hotel.Remove(hotel);
            db.SaveChanges();
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
