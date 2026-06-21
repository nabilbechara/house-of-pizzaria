namespace HouseOfPizza.API.Models;

public record MenuItem(
    int Id,
    string Name,
    string CategorySlug,
    List<MenuItemSize> Sizes,
    List<string> Ingredients,
    int? Calories = null,
    int? ProteinGrams = null
);
