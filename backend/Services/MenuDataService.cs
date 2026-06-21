using HouseOfPizza.API.Models;

namespace HouseOfPizza.API.Services;

public class MenuDataService
{
    public IReadOnlyList<Category> GetCategories() => _categories;

    public IReadOnlyList<MenuItem> GetMenuItems() => _menuItems;

    public IReadOnlyList<MenuItem> GetMenuItemsByCategory(string slug) =>
        _menuItems.Where(i => i.CategorySlug == slug).ToList();

    public MenuItem? GetMenuItemById(int id) =>
        _menuItems.FirstOrDefault(i => i.Id == id);

    private static readonly List<Category> _categories =
    [
        new(1, "Original Pizza",        "original-pizza",         "Classic favorites, timeless flavor"),
        new(2, "Healthy Protein Pizza", "healthy-protein-pizza",  "Clean ingredients, real results"),
        new(3, "Dessert",               "dessert",                "Sweet ending, perfect finish"),
        new(4, "Drinks",                "drinks",                 string.Empty),
        new(5, "Dips",                  "dips",                   string.Empty),
    ];

    private static readonly List<MenuItem> _menuItems =
    [
        // ── Original Pizza ──────────────────────────────────────────────────────
        new(1, "Lebanese", "original-pizza",
            [new("30CM", 7), new("35CM", 8), new("40CM", 10)],
            ["Tomato sauce", "Ham", "Mozzarella", "Onions", "Olives", "Green pepper", "Mushrooms", "Corn", "Oregano"]),

        new(2, "Pepperoni", "original-pizza",
            [new("30CM", 8), new("35CM", 10), new("40CM", 12)],
            ["Tomato sauce", "Mozzarella", "Pepperoni"]),

        new(3, "Chicken Ranch", "original-pizza",
            [new("30CM", 9), new("35CM", 11), new("40CM", 13)],
            ["Ranch sauce", "Mozzarella", "Grilled chicken", "Red onions"]),

        new(4, "Cheese Burger Pizza", "original-pizza",
            [new("30CM", 10), new("35CM", 12), new("40CM", 14)],
            ["Special burger sauce", "Mix cheese", "Ground beef", "Onions", "Pickles"]),

        new(5, "BBQ Chicken", "original-pizza",
            [new("30CM", 9), new("35CM", 11), new("40CM", 13)],
            ["BBQ sauce", "Mix cheese", "Grilled chicken", "Red onions"]),

        new(6, "BBQ Meat", "original-pizza",
            [new("30CM", 10), new("35CM", 12), new("40CM", 15)],
            ["BBQ sauce", "Mix cheese", "Ground beef", "Onions", "Bell peppers"]),

        // ── Healthy Protein Pizza ────────────────────────────────────────────────
        new(7, "Active Oats Pizza", "healthy-protein-pizza",
            [new("25CM", 7)],
            ["Oat dough", "Grilled chicken breast", "Smoked turkey", "Tomato sauce", "Olives",
             "Red onions", "Fresh mushrooms", "Oregano", "Green pepper", "Light mozzarella"],
            Calories: 440, ProteinGrams: 42),

        new(8, "Pepperoni", "healthy-protein-pizza",
            [new("25CM", 10)],
            ["Chicken crust", "Tomato sauce", "Pepperoni", "Bell pepper", "Light mozzarella"],
            Calories: 610, ProteinGrams: 72),

        new(9, "Vegeterian", "healthy-protein-pizza",
            [new("25CM", 7)],
            ["Oat dough", "Tomato sauce", "Light mozzarella", "Olives",
             "Red onions", "Corn", "Colored pepper", "Fresh mushrooms", "Oregano"],
            Calories: 450),

        new(10, "Power Crust", "healthy-protein-pizza",
            [new("25CM", 9)],
            ["Chicken crust", "Tomato sauce", "Smoked turkey", "Fresh mushrooms", "Light mozzarella", "Green pepper"],
            Calories: 460, ProteinGrams: 65),

        // ── Dessert ──────────────────────────────────────────────────────────────
        new(11, "Chocolate Pizza", "dessert",
            [new("30CM", 7)],
            ["Sweet chocolate", "Hazelnut spread", "Melted chocolate", "Crushed biscuits", "Mini marshmallows"]),

        // ── Drinks ───────────────────────────────────────────────────────────────
        new(12, "Soft Drink", "drinks",  [new("Can",    70000, "LL")], []),
        new(13, "Ice Tea",    "drinks",  [new("Bottle", 80000, "LL")], []),
        new(14, "Water",      "drinks",  [new("Bottle", 25000, "LL")], []),

        // ── Dips ─────────────────────────────────────────────────────────────────
        new(15, "BBQ Cup",        "dips", [new("Cup", 36000, "LL")], []),
        new(16, "Cocktail Sauce", "dips", [new("Cup", 54000, "LL")], []),
        new(17, "Ranch Sauce",    "dips", [new("Cup", 54000, "LL")], []),
        new(18, "Honey Mustard",  "dips", [new("Cup", 54000, "LL")], []),
    ];
}
