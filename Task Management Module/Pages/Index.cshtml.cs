using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Task_Management_Module.Pages
{
    public class IndexModel : PageModel
    {
        private readonly UserManager<IdentityUser> _userManager;

        //private readonly ILogger<IndexModel> _logger;

        //public IndexModel(ILogger<IndexModel> logger)
        //{
        //    _logger = logger;
        //}

        public IndexModel(UserManager<IdentityUser> userManager)
        {
            _userManager = userManager;
        }

        public async Task<List<IdentityUser>> GetAllUsersAsync()
        {
            List<IdentityUser> users = await _userManager.Users.ToListAsync();

            // Do something with the users...

            return users;
        }

        //public void OnGet()
        //{
        //    List<IdentityUser> users = GetAllUsersAsync().Result;
        //}

        public async Task<IActionResult> OnGetUsersAsync()
        {
            List<IdentityUser> users = await _userManager.Users.ToListAsync();
            return new JsonResult(users);
        }
    }
}
