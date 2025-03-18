using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using WaterProject.API.Data;

namespace WaterProject.API.Controllers
{
 [Route("api/[controller]")]
 [ApiController]
 public class WaterController : ControllerBase
 {
     private  WaterDbContext _waterContext;
     
     public WaterController(WaterDbContext temp) => _waterContext = temp;

     [HttpGet("AllProjects")]
     public IActionResult GetProjects(int pageSize = 5, int pageNumber = 1)
     {

         string? favProjType = Request.Cookies["FavoriteProjectType"];
         Console.WriteLine("~~~~~~~~~COOKIE~~~~~~~~\n" + favProjType);
         
         HttpContext.Response.Cookies.Append("FavoriteProjectType", "Protected Spring", new CookieOptions
         {
             HttpOnly = true, //cookie can only be seen by the server, generally yes
             Secure = true, //https only
             SameSite = SameSiteMode.None, //Limit cookies from other sites strict = never
             Expires = DateTime.Now.AddMinutes(1), // makes life of a cookie
             
             
         });
         
         var something = _waterContext.Projects.Skip((pageNumber-1)*pageSize).Take(pageSize).ToList();

         var totalNumProjects = _waterContext.Projects.Count();
         
         return Ok(new
         {
             Projects = something,
             TotalNumProjects = totalNumProjects
         }); 
     }

     [HttpGet("FunctionalProjects")]
     public IEnumerable<Project> GetFunctionalProjects()
     {
         var something = _waterContext.Projects.Where(p => p.ProjectFunctionalityStatus == "Functional").ToList();
         
         return something;
     }
 }
}

