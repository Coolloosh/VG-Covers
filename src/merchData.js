export const merchItems = [
  {
    id: "SkullShirt",
    name: "VG Skull Tee",
    price: 2500,
    image: "/SkullShirt.webp",
    badge: "New",
    description: "Black tee with skull design and VG text.",
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: "OGShirt",
    name: "OG Tee",
    price: 2500,
    image: "/OGShirt.png",
    badge: "Hot",
    description: "Cream colored tee containing the original print.",
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: "IceCreamShirt",
    name: "Ice Cream Tee",
    price: 2500,
    image: "/IceCreamShirt-blue.png",
    badge: "New",
    description: "Gildan tee featuring the full-color Vanylla Godzylla ice cream monster design.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Blue", value: "Blue", image: "/IceCreamShirt-blue.png", swatch: "#79d8f7" },
      { name: "Pink", value: "Pink", image: "/IceCreamShirt-pink.png", swatch: "#f7bfd0" },
      { name: "Gray", value: "Gray", image: "/IceCreamShirt-gray.png", swatch: "#4c4c4c" },
    ],
  },
  {
    id: "stickerpack",
    name: "Sticker Pack",
    price: 1000,
    image: "/stickerpack.webp",
    description: "6 machine-cut vinyl stickers containing the Vanylla Godzylla Logo.",
  },
  {
    id: "poster",
    name: "Show Poster Medley",
    price: 500,
    image: "/posters.webp",
    badge: "Limited",
    description: "A limited edition poster from one of the previous shows.",
  },
];

export function getMerchImage(item, colorValue) {
  return item.colors?.find((color) => color.value === colorValue)?.image || item.image;
}
