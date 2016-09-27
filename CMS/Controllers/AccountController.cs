using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using CMS.Models;
using CMS.Models.Account;
using WebMatrix.WebData;
using System.Web.Security;

namespace CMS.Controllers
{
    public class AccountController : Controller
    {
        ETEntities db = new ETEntities();

        [Authorize(Roles = "Admin")]
        // Get: Account
        public ActionResult Index()
        {
            //Get list account
            var User = db.User.ToList();

            return View(User);
        }

        [Authorize(Roles = "Admin")]
        public ActionResult Info()
        {
            //Get list account
            var User = db.User.ToList();

            return View(User);
        }

        //Register
        //Get
        [Authorize(Roles = "Admin")]
        [HttpGet]
        public ActionResult Register()
        {

            //Load Default Data
            ViewBag.role = new SelectList(db.webpages_Roles, "RoleId", "RoleName");

            return View();
        }

        //Post
        [Authorize(Roles = "Admin")]
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Register(Register register)
        {
            if (ModelState.IsValid)
            {
                //Them nguoi dung
                WebSecurity.CreateUserAndAccount(register.Username, register.Password);

                //Them nguoi dung vao nhom quyen
                string rolename = db.webpages_Roles.Where(p => p.RoleId == register.Role).First().RoleName;
                Roles.AddUserToRole(register.Username, rolename);

                db.SaveChanges();
                return RedirectToAction("Index", "Account");
            }

            //Load Default Data
            ViewBag.role = new SelectList(db.webpages_Roles, "RoleId", "RoleName", register.Role);

            return View(register);
        }

        //Delete
        [Authorize(Roles = "Admin")]
        public ActionResult Delete(int id)
        {
            var user = db.User.Where(p => p.UserId == id).FirstOrDefault();
            var userMem = db.webpages_Membership.Where(p => p.UserId == id).FirstOrDefault();
            if (user != null)
            {
                var role = Roles.GetRolesForUser(user.Username);
                Roles.RemoveUserFromRole(user.Username, role[0]);
                db.User.Remove(user);
                db.webpages_Membership.Remove(userMem);
                db.SaveChanges();
            }

            return RedirectToAction("Index");
        }

        //Login
        //Get
        [HttpGet]
        public ActionResult Login()
        {
            if (WebSecurity.IsAuthenticated == true)
            {
                return RedirectToAction("Index", "Dashboard", new { Area = "Admin" });
            }

            return View();
        }

        //Post
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Login(Login login, string ReturnUrl)
        {
            if (ModelState.IsValid)
            {
                if (WebSecurity.Login(login.Username, login.Password))
                {
                    if (ReturnUrl != null)
                    {
                        return Redirect(ReturnUrl);
                    }
                    else
                    {
                        return RedirectToAction("Index", "Dashboard", new { Area = "Admin" });
                    }
                }
                else
                {
                    ModelState.AddModelError("", "Tài khoản hoặc Mật khẩu không đúng!");
                }
            }

            return View(login);
        }

        //Logout
        [Authorize]
        public ActionResult Logout()
        {
            WebSecurity.Logout();

            return RedirectToAction("Login", "Account");
        }
    }
}