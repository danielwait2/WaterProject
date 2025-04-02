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
     public IActionResult GetProjects(int pageSize = 5, int pageNumber = 1, [FromQuery] List<string>? projectTypes=null)
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
         
         var query = _waterContext.Projects.AsQueryable();
         if (projectTypes != null && projectTypes.Any())
         {
             query = query.Where(p => projectTypes.Contains(p.ProjectType));
         }
         
         var something = query.Skip((pageNumber-1)*pageSize).Take(pageSize).ToList();

         var totalNumProjects = query.Count();
         
         return Ok(new
         {
             Projects = something,
             TotalNumProjects = totalNumProjects
         }); 
     }

     [HttpGet("GetProjectTypes")]
     public IActionResult GetProjectTypes()
     {
         var projectTypes = _waterContext.Projects
             .Select(p => p.ProjectType).Distinct().ToList();
         
         return Ok(projectTypes);
     }

    [HttpPost("AddProject")]
     public IActionResult AddProject([FromBody]Project newProject)
     {
        _waterContext.Projects.Add(newProject);
        _waterContext.SaveChanges();
        return Ok(newProject);
     }

    [HttpPut("UpdateProject/{projectId}")]
     public IActionResult UpdateProject(int projectId, [FromBody] Project updatedProject)
     {
        var existingProject = _waterContext.Projects.Find(projectId);
        existingProject.ProjectName = updatedProject.ProjectName;
        existingProject.ProjectType = updatedProject.ProjectType;
        existingProject.ProjectRegionalProgram = updatedProject.ProjectRegionalProgram;
        existingProject.ProjectImpact = updatedProject.ProjectImpact;
        existingProject.ProjectPhase = updatedProject.ProjectPhase;
        existingProject.ProjectFunctionalityStatus = updatedProject.ProjectFunctionalityStatus;

        _waterContext.Projects.Update(existingProject);
        _waterContext.SaveChanges();

        return Ok(existingProject);
     }

     [HttpDelete("DeleteProject/{projectId}")]
        public IActionResult DeleteProject(int projectId)
        {
            var project = _waterContext.Projects.Find(projectId);
            if (project == null)
            {
                return NotFound(new {message = "project not found"});
            }
    
            _waterContext.Projects.Remove(project);
            _waterContext.SaveChanges();

            // shows that the delete was successful
            return NoContent();
        }
 }
}

