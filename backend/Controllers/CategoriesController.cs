using HouseOfPizza.API.Services;
using Microsoft.AspNetCore.Mvc;

namespace HouseOfPizza.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoriesController(MenuDataService menu) : ControllerBase
{
    [HttpGet]
    public IActionResult GetAll() => Ok(menu.GetCategories());
}
