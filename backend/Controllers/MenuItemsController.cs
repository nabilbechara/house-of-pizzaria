using HouseOfPizza.API.Services;
using Microsoft.AspNetCore.Mvc;

namespace HouseOfPizza.API.Controllers;

[ApiController]
[Route("api/menu-items")]
public class MenuItemsController(MenuDataService menu) : ControllerBase
{
    [HttpGet]
    public IActionResult GetAll([FromQuery] string? category) =>
        Ok(category is null ? menu.GetMenuItems() : menu.GetMenuItemsByCategory(category));

    [HttpGet("{id:int}")]
    public IActionResult GetById(int id)
    {
        var item = menu.GetMenuItemById(id);
        return item is null ? NotFound() : Ok(item);
    }
}
