using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using CMS.Models;

namespace CMS.Controllers
{
    public class ProductController : Controller
    {
        private ETEntities db = new ETEntities();

        // GET: Product
        public ActionResult Index()
        {
            return View();
        }

        //GetByCategory
        public JsonResult GetByCategory(int id)
        {
            //Cái này về kiến thức LinQ nhé, thỉnh thoảng tự đọc thêm nhé
            var model = db.Product.Where(p => p.idCategoryProduct == id && p.feature.Contains("1")).Take(6);

            return Json(model, JsonRequestBehavior.AllowGet);
        }
    }
}