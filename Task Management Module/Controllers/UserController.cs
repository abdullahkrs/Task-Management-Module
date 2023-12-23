using Microsoft.AspNetCore.Identity;

using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Threading.Tasks; // Make sure to include this namespace
using Task_Management_Module.Data;

namespace Task_Management_Module.Controllers
{
    public class UserController : Controller
    {
        private readonly UserManager<IdentityUser> _userManager;

        public UserController(UserManager<IdentityUser> userManager)
        {
            _userManager = userManager;
        }

        [HttpPost]
        public async Task<IActionResult> AssignUserToAdminRole(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);

            if (user == null)
            {
                return NotFound();
            }

            // Check if the role doesn't exist, then create it
            var roleManager = HttpContext.RequestServices.GetRequiredService<RoleManager<IdentityRole>>();
            var isAdminRoleExist = await roleManager.RoleExistsAsync("Admin");


            if (!isAdminRoleExist)
            {
                // Role doesn't exist, create it
                await roleManager.CreateAsync(new IdentityRole("Admin"));
            }
            var isInAdminRole = await _userManager.IsInRoleAsync(user, "Admin");

            if (!isInAdminRole)
            {
                await _userManager.AddToRoleAsync(user, "Admin");
            }

            return Ok();
        }


    }



}
