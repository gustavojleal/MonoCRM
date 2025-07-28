using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class FormController : ControllerBase
{
  [HttpGet("CreateContact")]
  public IActionResult GetCreateContact()
  {
    var fields = new[]
    {
            new { name = "firstName", label = "First yyyName", type = "text", placeholder = "Enter first name" },
            new { name = "lastName", label = "Last Name", type = "text", placeholder = "Enter last name" },
            new { name = "email", label = "Email", type = "email", placeholder = "Enter email" },
            new { name = "phone", label = "Phone", type = "tel", placeholder = "Enter phone number" },
            new { name = "address", label = "Address", type = "text", placeholder = "Enter address" },
            new { name = "checked", label = "Checked", type = "checkbox", placeholder = "Adress Validate" },
        };

    return Ok(fields);
  }
}