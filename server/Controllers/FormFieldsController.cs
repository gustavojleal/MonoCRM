using Microsoft.AspNetCore.Mvc;

namespace Server.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class FormFieldsController : ControllerBase
  {
    [HttpGet("CreateContact")]
    public IActionResult GetCreateContact()
    {
      var fields = new[]
      {
        new { name = "firstName", label = "First Name", type = "text", placeholder = "Enter first name" },
        new { name = "lastName", label = "Last Name", type = "text", placeholder = "Enter last name" },
        new { name = "email", label = "Email", type = "email", placeholder = "Enter email" },
        new { name = "phone", label = "Phone", type = "tel", placeholder = "Enter phone number" },
        new { name = "company", label = "Company", type = "text", placeholder = "Enter company" },
        new { name = "jobTitle", label = "Job Title", type = "text", placeholder = "Enter job title" },
        new { name = "notes", label = "Notes", type = "textarea", placeholder = "Enter notes" },
        new { name = "checked", label = "Checked", type = "checkbox", placeholder = "Adress Validate" },
      };

      return Ok(fields);
    }
  }
}
