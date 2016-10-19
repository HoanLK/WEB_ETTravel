using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CMS.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Title = "ET TRAVEL";

            return View();
        }

        [Route("lien-he")]
        public ActionResult LienHe()
        {
            return View();
        }
    }
}
