using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using CMS.Models;

namespace CMS.Controllers
{
    public class CategoryProductController : Controller
    {
        private ETEntities db = new ETEntities();

        // GET: CategoryProduct
        public ActionResult Index()
        {
            return View();
        }

        //GetCategoryTrongNuoc
        public JsonResult GetCategoryTrongNuoc()
        {
            //Cái này là để loại bỏ khóa ngoại và trả về dang Json của kiểu dữ liệu đó thôi
            db.Configuration.ProxyCreationEnabled = false;
            db.Configuration.LazyLoadingEnabled = false;

            var model = db.CategoryProduct.Where(p => p.idCategoryParent == 34);

            return Json(model, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetCategoryQuocTe()
        {
            //Cái này là để loại bỏ khóa ngoại và trả về dang Json của kiểu dữ liệu đó thôi
            db.Configuration.ProxyCreationEnabled = false;
            db.Configuration.LazyLoadingEnabled = false;

            var model = db.CategoryProduct.Where(p => p.idCategoryParent == 35);

            return Json(model, JsonRequestBehavior.AllowGet);
        }
    }
}