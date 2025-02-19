export const getColorForGrid = (grid) => {
  const { type } = grid || {};

  switch (type) {
    case "grass":
      return "bg-green-300";
    case "mountain":
      return "bg-gray-500";
    case "tree":
      return "bg-green-800 rounded-sm";
    case "fountain":
      return "bg-blue-300 border-blue-300 border-2";
    case "wall":
      return "bg-gray-500 border-gray-600 border-2";
    case "sidewalk":
      return "bg-orange-300 border-orange-300";
    case "path":
      return "bg-yellow-300 border-yellow-500";
    case "road":
      return "bg-orange-400 border-orange-400";
    case "floor":
      return "bg-gray-300 border-gray-300";
    case "bench":
      return "bg-gray-300 border-gray-300";
    case "door":
      return "bg-yellow-600 border-orange-800 border";
    case "street_lamp":
      return "bg-yellow-300 border-yellow-300";
    default:
      return "bg-white";
  }
};

export function getCellSymbol(cell) {
  const symbols = {
    grass: " ",
    road: " ",
    sidewalk: " ",
    wall: " ",
    floor: " ",
    door: " ",
    tree: "🌳",
    bench: "🪑",
    street_lamp: "💡",
    fountain: "⛲",
    bed: "🛏️",
    table: "🍽️",
    couch: "🛋️",
    desk: "💼",
    printer: "🖨️",
    water_cooler: "🚰",
    counter: "🧾",
    coffee_machine: "☕",
    wardrobe: "🚪",
    sofa: "🛋️",
    toilet: "🚽",
    shower: "🚿",
    oven: "🍳",
    sign: "📌",
    designTable: "🏞️",
    bookshelf: "📚",
    cateringSupplies: "🧁",
    coffeeMachine: "☕",
    officeChair: "🪑",
    snackBar: "🍔",
    flowerDisplay: "🌸",
    gardeningTools: "🌱",
    orderForm: "📋",
    pharmacy: "🛒",
    shelf: "📚",


  };

  if (cell.object) return symbols[cell.object.type] || cell.object.type;
  return symbols[cell.type] || " ";
}


export const cn = (...classes) => {
  return classes.filter(Boolean).join(" ");
};