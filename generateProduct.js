const { faker } = require("@faker-js/faker");
const fs = require("fs");
const path = require("path");

const categories = ["Chair", "Bag", "Lamp", "Table", "Sofa", "Decor"];

const colors = [
  "#FFFFFF",
  "#B4916C",
  "#E4CBAD",
  "#000000",
  "#FF0000",
  "#00FF00",
];

const generateProduct = (id) => ({
  id,
  name: `${faker.commerce.productName()} ${faker.number.int({
    min: 1,
    max: 100,
  })}`,
  image: `https://m.media-amazon.com/images/I/818vbkvpQ9L._AC_SL1500_.jpg`,
  price: faker.number.int({ min: 500, max: 5000 }),
  description: faker.lorem.paragraph(),
  category: faker.helpers.arrayElement(categories),
  rating: faker.number.float({ min: 1, max: 5, precision: 0.1 }),
  reviewCount: faker.number.int({ min: 0, max: 200 }),
  imageList: Array.from(
    { length: faker.number.int({ min: 3, max: 3 }) },
    () => ({
      color: faker.helpers.arrayElement(colors),
      image: `https://m.media-amazon.com/images/I/818vbkvpQ9L._AC_SL1500_.jpg`,
    })
  ),
});

let db = { users: [], products: [] };
try {
  const currentDb = fs.readFileSync(path.join(__dirname, "db.json"), "utf-8");
  db = JSON.parse(currentDb);
} catch (error) {
  console.log(
    "Không tìm thấy db.json hoặc lỗi đọc file, tạo mới với users rỗng."
  );
}

// Tạo 1000 sản phẩm mới
const products = Array.from({ length: 1000 }, (_, index) =>
  generateProduct(index + 1)
);

db.products = products;

fs.writeFileSync(
  path.join(__dirname, "db.json"),
  JSON.stringify(db, null, 2),
  "utf-8"
);

console.log("Đã tạo 1000 sản phẩm trong db.json, giữ nguyên mảng users.");
