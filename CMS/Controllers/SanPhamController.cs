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

namespace CMS.Controllers
{
    [RoutePrefix("tour")]
    public class SanPhamController : Controller
    {
        private ETEntities db = new ETEntities();

        // GET: SanPham
        [Route]
        public ActionResult EnterNone()
        {
            return Redirect("/danh-muc-san-pham");
        }



        [Route("{alias}-{id:int}")]
        public ActionResult Index(string alias, int id)
        {

            var model = db.Product.Where(p => p.idProduct == id && p.alias == alias).FirstOrDefault();

            //SEO
            ViewBag.Title = model.title;
            ViewBag.Description = model.metadescription;
            ViewBag.Keywords = model.metakewords;
            ViewBag.Robots = model.robots;
            ViewBag.Image = model.image;

            if (model == null)
            {
                return HttpNotFound();
            }

            return View(model);
        }

        //Search
        public JsonResult Search(string search)
        {
            var model = db.Product.Where(p => p.title.Contains(search) ||
                                                p.description.Contains(search) ||
                                                p.content.Contains(search) ||
                                                p.feature.Contains(search) ||
                                                p.feature.Contains(search));

            return Json(model, JsonRequestBehavior.AllowGet);
        }

        

        
    }
}
