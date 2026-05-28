export interface MenuItem {
  name: string;
  price: number;
  isVeg: boolean;
  isSpicy: boolean;
  description?: string;
}

export interface MenuCategory {
  name: string;
  timeNote?: string;
  items: MenuItem[];
}

export interface MenuData {
  categories: MenuCategory[];
}

export const MENU_DATA: MenuData = {
  "categories": [
    {
      "name": "TANDOORI PRAWNS",
      "items": [
        { "name": "Angara Jhinga", "price": 395, "isVeg": false, "isSpicy": false },
        { "name": "Lasooni Jhinga", "price": 395, "isVeg": false, "isSpicy": false },
        { "name": "Kashmiri Jhinga", "price": 395, "isVeg": false, "isSpicy": false },
        { "name": "Tandoori Jhinga", "price": 395, "isVeg": false, "isSpicy": false },
        { "name": "Pahadi Jhinga", "price": 395, "isVeg": false, "isSpicy": false }
      ]
    },
    {
      "name": "TANDOORI FISH",
      "items": [
        { "name": "Lasooni Mahi", "price": 395, "isVeg": false, "isSpicy": false },
        { "name": "Sarson Ki Mahi", "price": 395, "isVeg": false, "isSpicy": false },
        { "name": "Angara Mahi", "price": 395, "isVeg": false, "isSpicy": false },
        { "name": "Achari Mahi", "price": 395, "isVeg": false, "isSpicy": false },
        { "name": "Ajwaini Mahi", "price": 395, "isVeg": false, "isSpicy": false }
      ]
    },
    {
      "name": "COMBO PLATTERS",
      "items": [
        { "name": "Tandoori Veg Platter", "description": "Hara Bhara Kebab, Paneer Tikka, Gobi & Subz Seekh", "price": 455, "isVeg": true, "isSpicy": false },
        { "name": "Chinese Veg Platter", "description": "Corn Cube, Crispy Potato, Cauliflower Taipei, Chilly Paneer & Baby Corn -65", "price": 455, "isVeg": true, "isSpicy": false },
        { "name": "Tandoori Non-Veg Platter", "description": "Chicken, Fish, Prawns & Mutton", "price": 605, "isVeg": false, "isSpicy": false },
        { "name": "Chinese Non-Veg Platter", "description": "Chicken, Fish, Prawns & Mutton", "price": 605, "isVeg": false, "isSpicy": false }
      ]
    },
    {
      "name": "STARTERS VEGETARIAN",
      "items": [
        { "name": "Paneer Chilli", "description": "Choice of: Chilli / Ginger / Singapore / Manchurian / 65 / Majestic / Schezwan", "price": 255, "isVeg": true, "isSpicy": false },
        { "name": "Baby Corn", "description": "Choice of: Chilli / Golden Fried / Manchurian / Salt & Pepper / Schezwan / Hot Garlic / Butter Chilly Garlic", "price": 255, "isVeg": true, "isSpicy": false },
        { "name": "Veg Spring Rolls", "description": "Shredded Cabbage, Carrot, Capsicum tossed with Chinese Spices, stuffed in wonton sheet and deep fried", "price": 245, "isVeg": true, "isSpicy": false },
        { "name": "Veg Manchurian", "description": "Deep fried mince veg dumplings tossed in Chilly Soya sauce", "price": 245, "isVeg": true, "isSpicy": false },
        { "name": "Corn Cheese Balls", "description": "Chopped Corn with grated Cheese marinated with Chilly, Coriander and deep fried", "price": 265, "isVeg": true, "isSpicy": false },
        { "name": "Golden Fried Vegetables", "description": "Batter fried seasonal vegetable tossed in Salt & Pepper & Choice of Shanghai / Szechwan / Devil / Hot Garlic Sauce", "price": 245, "isVeg": true, "isSpicy": false },
        { "name": "Vegetable Bullets", "description": "Marinated chopped vegetables, rolled like bullets and crispy fried", "price": 245, "isVeg": true, "isSpicy": false },
        { "name": "Crispy Corn", "description": "Fresh Corn tossed in Herbs and Spices", "price": 245, "isVeg": true, "isSpicy": false },
        { "name": "Corn Cube", "price": 245, "isVeg": true, "isSpicy": false },
        { "name": "Crispy Potato", "description": "Choice of: Honey Pepper / Shanghai / Szechwan / Devil / Hot Garlic", "price": 245, "isVeg": true, "isSpicy": false },
        { "name": "Shanghai Roll", "price": 245, "isVeg": true, "isSpicy": false },
        { "name": "Cauliflower Taipei", "price": 255, "isVeg": true, "isSpicy": false },
        { "name": "Baby Corn & Cauliflower Hongkong Style", "price": 255, "isVeg": true, "isSpicy": false },
        { "name": "Satay Mushroom Ginger & Chilly", "price": 275, "isVeg": true, "isSpicy": true },
        { "name": "Chilli Mushroom", "price": 275, "isVeg": true, "isSpicy": true }
      ]
    },
    {
      "name": "INDIAN NON VEGETARIAN",
      "items": [
        { "name": "Kadai Murgh", "price": 355, "isVeg": false, "isSpicy": false },
        { "name": "Murgh Tikka Masala", "description": "Tender boneless pieces of marinated Chicken cooked in the Tandoori and finished in a savory Tomato based masala", "price": 355, "isVeg": false, "isSpicy": false },
        { "name": "Murgh Lababdar", "description": "Boneless pieces of Chicken char grilled in Tandoori and prepared in a Onion, Tomato and Cashew Nut gravy", "price": 355, "isVeg": false, "isSpicy": false },
        { "name": "Butter Chicken Masala", "price": 355, "isVeg": false, "isSpicy": false },
        { "name": "Murgh Kali Mirchi", "price": 355, "isVeg": false, "isSpicy": true },
        { "name": "Punjabi Murgh Masala", "price": 355, "isVeg": false, "isSpicy": true },
        { "name": "Afghani Murgh", "price": 355, "isVeg": false, "isSpicy": false },
        { "name": "Andhra Chicken Curry", "price": 355, "isVeg": false, "isSpicy": true },
        { "name": "Murgh Methi", "price": 355, "isVeg": false, "isSpicy": false },
        { "name": "Tangdi Masala", "price": 365, "isVeg": false, "isSpicy": false },
        { "name": "Incredible Special Chicken", "price": 495, "isVeg": false, "isSpicy": false },
        { "name": "Rara Mutton", "description": "Chunks of tender Lamb cooked in a creamy sauce", "price": 395, "isVeg": false, "isSpicy": false },
        { "name": "Mutton Do Pyaza", "price": 395, "isVeg": false, "isSpicy": false },
        { "name": "Mutton Roganjosh", "description": "An all time favorite — chunks of lamb slow cooked with whole spices", "price": 395, "isVeg": false, "isSpicy": false },
        { "name": "Methi Mutton", "description": "Mutton cooked in fenugreek and aromatic spices", "price": 395, "isVeg": false, "isSpicy": false },
        { "name": "Mutton Masala", "price": 395, "isVeg": false, "isSpicy": true },
        { "name": "Nalli Ki Nihari", "price": 395, "isVeg": false, "isSpicy": false },
        { "name": "Hyderabad Mutton Curry", "price": 395, "isVeg": false, "isSpicy": true },
        { "name": "Fish Tikka Masala", "price": 395, "isVeg": false, "isSpicy": false },
        { "name": "Andhra Fish Curry", "price": 395, "isVeg": false, "isSpicy": true },
        { "name": "Achari Fish Curry", "price": 395, "isVeg": false, "isSpicy": false },
        { "name": "Jhinga Masala", "price": 395, "isVeg": false, "isSpicy": false },
        { "name": "Jhinga Adraki", "price": 395, "isVeg": false, "isSpicy": false },
        { "name": "Kadai Jhinga", "price": 395, "isVeg": false, "isSpicy": false }
      ]
    },
    {
      "name": "RICE & NOODLES",
      "items": [
        { "name": "Fried Rice / Noodles Egg", "price": 255, "isVeg": false, "isSpicy": false },
        { "name": "Fried Rice / Noodles Chicken", "price": 255, "isVeg": false, "isSpicy": false },
        { "name": "Fried Rice / Noodles Prawns", "price": 275, "isVeg": false, "isSpicy": false },
        { "name": "Fried Rice / Noodles Mixed Meat", "price": 275, "isVeg": false, "isSpicy": false },
        { "name": "Szechwan Fried Rice / Noodles Egg", "price": 275, "isVeg": false, "isSpicy": true },
        { "name": "Szechwan Fried Rice / Noodles Chicken", "price": 275, "isVeg": false, "isSpicy": true },
        { "name": "Szechwan Fried Rice / Noodles Prawns", "price": 295, "isVeg": false, "isSpicy": true },
        { "name": "Szechwan Fried Rice / Noodles Mixed Meat", "price": 295, "isVeg": false, "isSpicy": true },
        { "name": "Chinese Chopsuey", "price": 295, "isVeg": false, "isSpicy": false },
        { "name": "American Chopsuey", "price": 295, "isVeg": false, "isSpicy": false },
        { "name": "Chicken Dum Biryani", "price": 325, "isVeg": false, "isSpicy": false },
        { "name": "Mutton Dum Biryani", "price": 355, "isVeg": false, "isSpicy": false }
      ]
    },
    {
      "name": "CURD / RAITHA",
      "items": [
        { "name": "Onion / Cucumber / Mixed / Pineapple / Boondi Raitha", "price": 95, "isVeg": true, "isSpicy": false },
        { "name": "Set Curd", "price": 85, "isVeg": true, "isSpicy": false }
      ]
    },
    {
      "name": "DESSERTS",
      "items": [
        { "name": "Gulab Jamun", "price": 155, "isVeg": true, "isSpicy": false },
        { "name": "Kala Jamun", "price": 155, "isVeg": true, "isSpicy": false },
        { "name": "Gajar Ka Halwa", "price": 165, "isVeg": true, "isSpicy": false },
        { "name": "Shahi Tukda", "price": 165, "isVeg": true, "isSpicy": false },
        { "name": "Double Ka Meetha", "price": 165, "isVeg": true, "isSpicy": false },
        { "name": "Fruit Salad", "price": 165, "isVeg": true, "isSpicy": false },
        { "name": "Fruit Salad with Ice Cream", "price": 195, "isVeg": true, "isSpicy": false },
        { "name": "Cold Coffee", "price": 165, "isVeg": true, "isSpicy": false },
        { "name": "Cold Coffee with Ice Cream", "price": 195, "isVeg": true, "isSpicy": false },
        { "name": "Ice Creams (Vanilla / Pista / Strawberry / Chocolate / Butter Scotch)", "price": 165, "isVeg": true, "isSpicy": false },
        { "name": "Ice Cream Sundae", "price": 205, "isVeg": true, "isSpicy": false },
        { "name": "Banana Float", "price": 205, "isVeg": true, "isSpicy": false },
        { "name": "Tutti Fruti", "price": 205, "isVeg": true, "isSpicy": false }
      ]
    },
    {
      "name": "MOMOS",
      "items": [
        { "name": "Veg Momos", "price": 215, "isVeg": true, "isSpicy": false },
        { "name": "Veg Dumplings", "price": 215, "isVeg": true, "isSpicy": false },
        { "name": "Chicken Momos", "price": 275, "isVeg": false, "isSpicy": false },
        { "name": "Chicken Dumplings", "price": 275, "isVeg": false, "isSpicy": false },
        { "name": "Prawns Momos", "price": 315, "isVeg": false, "isSpicy": false },
        { "name": "Prawns Dumplings", "price": 315, "isVeg": false, "isSpicy": false }
      ]
    },
    {
      "name": "MAIN COURSE INDIAN VEGETARIAN",
      "items": [
        { "name": "Kadai Sabzi", "price": 255, "isVeg": true, "isSpicy": false },
        { "name": "Nizami Handi", "price": 255, "isVeg": true, "isSpicy": false },
        { "name": "Tarkari Zalfrezi", "price": 255, "isVeg": true, "isSpicy": false },
        { "name": "Bhindi Do Pyaza", "price": 255, "isVeg": true, "isSpicy": false },
        { "name": "Dum Aloo Kashmiri", "price": 255, "isVeg": true, "isSpicy": false },
        { "name": "Channa Masala", "price": 255, "isVeg": true, "isSpicy": false },
        { "name": "Aloo Gobi Adraki", "price": 255, "isVeg": true, "isSpicy": false },
        { "name": "Paneer Butter Masala", "price": 275, "isVeg": true, "isSpicy": false },
        { "name": "Methi Chaman", "price": 275, "isVeg": true, "isSpicy": false },
        { "name": "Paneer Lababdar", "price": 275, "isVeg": true, "isSpicy": false },
        { "name": "Kadai Paneer", "price": 275, "isVeg": true, "isSpicy": false },
        { "name": "Malai Kofta Curry", "price": 275, "isVeg": true, "isSpicy": false },
        { "name": "Palak Paneer", "price": 275, "isVeg": true, "isSpicy": false },
        { "name": "Paneer Tikka Masala", "price": 275, "isVeg": true, "isSpicy": false },
        { "name": "Badshahi Paneer", "price": 275, "isVeg": true, "isSpicy": false },
        { "name": "Tawa Paneer", "price": 275, "isVeg": true, "isSpicy": false }
      ]
    },
    {
      "name": "DAL",
      "items": [
        { "name": "Dal Makhni", "price": 225, "isVeg": true, "isSpicy": false },
        { "name": "Dal Tadka / Fry", "price": 225, "isVeg": true, "isSpicy": false },
        { "name": "Dal Pancharang", "price": 225, "isVeg": true, "isSpicy": false },
        { "name": "Methi Dal", "price": 225, "isVeg": true, "isSpicy": false }
      ]
    },
    {
      "name": "SOUTH INDIAN BREAKFAST",
      "timeNote": "07:30 AM to 10:30 AM",
      "items": [
        { "name": "Idly (2 pieces)", "price": 55, "isVeg": true, "isSpicy": false },
        { "name": "Wada (2 pieces)", "price": 55, "isVeg": true, "isSpicy": false },
        { "name": "Idly Wada", "description": "Idly 2 pieces & Wada 1 piece", "price": 75, "isVeg": true, "isSpicy": false },
        { "name": "Dahi Wada", "price": 95, "isVeg": true, "isSpicy": false },
        { "name": "Plain Dosa", "price": 75, "isVeg": true, "isSpicy": false },
        { "name": "Masala / Onion / Rava / Butter Dosa", "description": "Choice of: Masala / Onion / Rava / Butter / Upma / Veg / Paneer Butter / Cheese", "price": 95, "isVeg": true, "isSpicy": false },
        { "name": "Uttapam Plain", "price": 85, "isVeg": true, "isSpicy": false },
        { "name": "Uttapam Masala", "price": 95, "isVeg": true, "isSpicy": false },
        { "name": "Pesarattu Plain", "price": 85, "isVeg": true, "isSpicy": false },
        { "name": "Pesarattu Masala", "description": "Choice of: Masala / Onion / Rava / Upma", "price": 95, "isVeg": true, "isSpicy": false },
        { "name": "Poori Bhajji", "price": 95, "isVeg": true, "isSpicy": false },
        { "name": "Veg Upma", "price": 65, "isVeg": true, "isSpicy": false },
        { "name": "Semiya Upma", "price": 65, "isVeg": true, "isSpicy": false },
        { "name": "Tomato Bhath", "price": 65, "isVeg": true, "isSpicy": false }
      ]
    },
    {
      "name": "ALL DAY DINING",
      "timeNote": "07:00 AM to 11:00 PM",
      "items": [
        { "name": "Veg Sandwich", "description": "Plain / Toast / Grilled", "price": 105, "isVeg": true, "isSpicy": false },
        { "name": "Veg Cheese Sandwich", "price": 125, "isVeg": true, "isSpicy": false },
        { "name": "Chicken Sandwich", "description": "Plain / Toast", "price": 155, "isVeg": false, "isSpicy": false },
        { "name": "Club Sandwich Veg", "price": 145, "isVeg": true, "isSpicy": false },
        { "name": "Club Sandwich Non Veg", "price": 175, "isVeg": false, "isSpicy": false },
        { "name": "Bread Toast", "price": 95, "isVeg": true, "isSpicy": false },
        { "name": "French Fries", "price": 125, "isVeg": true, "isSpicy": false },
        { "name": "Cheese Cherry Pineapple", "price": 205, "isVeg": true, "isSpicy": false },
        { "name": "Egg (Boiled / Poached / Sunnyside)", "price": 95, "isVeg": false, "isSpicy": false },
        { "name": "Omelet Plain", "price": 105, "isVeg": false, "isSpicy": false },
        { "name": "Omelet Masala / Cheese", "price": 115, "isVeg": false, "isSpicy": false },
        { "name": "Omelet Chicken", "price": 125, "isVeg": false, "isSpicy": false },
        { "name": "Papad (Fried / Roasted / Masala)", "price": 125, "isVeg": true, "isSpicy": false },
        { "name": "Peanuts (Boiled / Fried / Masala)", "price": 125, "isVeg": true, "isSpicy": false },
        { "name": "Cashew Nuts (Fried / Masala)", "price": 225, "isVeg": true, "isSpicy": false }
      ]
    },
    {
      "name": "SALADS NON-VEGETARIAN",
      "items": [
        { "name": "Eggs Argenteuil Salad", "description": "Eggs tossed in mayo & cream", "price": 135, "isVeg": false, "isSpicy": false },
        { "name": "Grilled Chicken Salad", "price": 165, "isVeg": false, "isSpicy": false },
        { "name": "Chicken Caesar Salad", "price": 165, "isVeg": false, "isSpicy": false },
        { "name": "Roasted Fish Salad", "description": "Barbequed Fish with boiled Potatoes & Mustard Vinaigrette", "price": 165, "isVeg": false, "isSpicy": false },
        { "name": "Prawn Cocktail", "price": 185, "isVeg": false, "isSpicy": false }
      ]
    },
    {
      "name": "SOUPS VEGETARIAN",
      "items": [
        { "name": "Sweet Corn Soup", "price": 125, "isVeg": true, "isSpicy": false },
        { "name": "Cream of Tomato", "price": 125, "isVeg": true, "isSpicy": false },
        { "name": "Clear Soup", "price": 125, "isVeg": true, "isSpicy": false },
        { "name": "Manchow Soup", "price": 125, "isVeg": true, "isSpicy": false },
        { "name": "Hot & Sour Soup", "price": 125, "isVeg": true, "isSpicy": true },
        { "name": "Cantonese Soup", "price": 125, "isVeg": true, "isSpicy": false },
        { "name": "Lemon Coriander Soup", "price": 125, "isVeg": true, "isSpicy": false },
        { "name": "Cream of Veg", "price": 125, "isVeg": true, "isSpicy": false },
        { "name": "Tomato Dhania Shorba", "price": 125, "isVeg": true, "isSpicy": false },
        { "name": "Veg Minestrone Soup", "price": 125, "isVeg": true, "isSpicy": false }
      ]
    },
    {
      "name": "SOUPS NON-VEGETARIAN",
      "items": [
        { "name": "Sweet Corn Chicken Soup", "price": 155, "isVeg": false, "isSpicy": false },
        { "name": "Sweet Corn Prawns Soup", "price": 175, "isVeg": false, "isSpicy": false },
        { "name": "Clear Soup Chicken", "price": 155, "isVeg": false, "isSpicy": false },
        { "name": "Clear Soup Prawns", "price": 175, "isVeg": false, "isSpicy": false },
        { "name": "Manchow Soup Chicken", "price": 155, "isVeg": false, "isSpicy": false },
        { "name": "Manchow Soup Prawns", "price": 175, "isVeg": false, "isSpicy": false },
        { "name": "Hot & Sour Soup Chicken", "price": 155, "isVeg": false, "isSpicy": true },
        { "name": "Hot & Sour Soup Prawns", "price": 175, "isVeg": false, "isSpicy": true },
        { "name": "Lemon Coriander Chicken Soup", "price": 155, "isVeg": false, "isSpicy": false },
        { "name": "Lemon Coriander Prawns Soup", "price": 175, "isVeg": false, "isSpicy": false },
        { "name": "Chicken Minestrone Soup", "price": 155, "isVeg": false, "isSpicy": false },
        { "name": "Chicken Shorba", "price": 175, "isVeg": false, "isSpicy": false },
        { "name": "Paya Shorba", "price": 195, "isVeg": false, "isSpicy": false }
      ]
    },
    {
      "name": "INDIAN BREADS",
      "items": [
        { "name": "Tandoori Roti", "price": 65, "isVeg": true, "isSpicy": false },
        { "name": "Rumali Roti", "price": 65, "isVeg": true, "isSpicy": false },
        { "name": "Phulka (2 pcs)", "price": 65, "isVeg": true, "isSpicy": false },
        { "name": "Plain Naan", "price": 65, "isVeg": true, "isSpicy": false },
        { "name": "Butter Naan", "price": 75, "isVeg": true, "isSpicy": false },
        { "name": "Paratha (Aloo / Gobi / Paneer / Lachha)", "price": 75, "isVeg": true, "isSpicy": false },
        { "name": "Garlic Naan", "price": 75, "isVeg": true, "isSpicy": false },
        { "name": "Masala Kulcha", "price": 75, "isVeg": true, "isSpicy": false },
        { "name": "Mirchi Parantha", "price": 75, "isVeg": true, "isSpicy": true }
      ]
    },
    {
      "name": "ORIENTAL VEGETARIAN",
      "items": [
        { "name": "Mixed Veg in Choice of Sauces", "description": "Szechwan / Parsley / Hot Garlic / Oriental / Manchurian", "price": 255, "isVeg": true, "isSpicy": false },
        { "name": "Thai Green Curry (Veg)", "price": 275, "isVeg": true, "isSpicy": false },
        { "name": "Thai Red Curry (Veg)", "price": 275, "isVeg": true, "isSpicy": true }
      ]
    },
    {
      "name": "ORIENTAL NON VEGETARIAN",
      "items": [
        { "name": "Chicken in Choice of Sauces", "description": "Szechwan / Parsley / Hot Garlic / Oriental / Manchurian / Kungpow / Black Pepper", "price": 355, "isVeg": false, "isSpicy": false },
        { "name": "Fish in Choice of Sauces", "description": "Szechwan / Parsley / Hot Garlic / Oriental / Manchurian / Kungpow / Black Pepper", "price": 375, "isVeg": false, "isSpicy": false },
        { "name": "Prawns in Choice of Sauces", "description": "Szechwan / Parsley / Hot Garlic / Oriental / Manchurian / Kungpow / Black Pepper", "price": 375, "isVeg": false, "isSpicy": false },
        { "name": "Thai Green Chicken Curry", "price": 375, "isVeg": false, "isSpicy": false },
        { "name": "Thai Red Chicken Curry", "price": 375, "isVeg": false, "isSpicy": true }
      ]
    }
  ]
};

export const CATEGORY_TO_CUISINE: Record<string, string> = {
  "TANDOORI PRAWNS": "Indian",
  "TANDOORI FISH": "Indian",
  "COMBO PLATTERS": "Indian",
  "STARTERS VEGETARIAN": "Chinese",
  "INDIAN NON VEGETARIAN": "Indian",
  "RICE & NOODLES": "Chinese",
  "CURD / RAITHA": "South Indian",
  "DESSERTS": "Continental",
  "MOMOS": "Chinese",
  "MAIN COURSE INDIAN VEGETARIAN": "Indian",
  "DAL": "Indian",
  "SOUTH INDIAN BREAKFAST": "South Indian",
  "ALL DAY DINING": "Continental",
  "SALADS NON-VEGETARIAN": "Continental",
  "SOUPS VEGETARIAN": "Chinese",
  "SOUPS NON-VEGETARIAN": "Chinese",
  "INDIAN BREADS": "Indian",
  "ORIENTAL VEGETARIAN": "Oriental",
  "ORIENTAL NON VEGETARIAN": "Oriental"
};
