const { random, commerce } = require('faker')
const fs = require('fs')

const generateProducts = () =>
  [...Array(30)].map(() => ({
    id: random.uuid(),
    name: commerce.productName(),
    image: `https://picsum.photos/id/${random.number(200)}/600`,
    price: commerce.price(30, 100, 2),
    quantity: random.number(20),
    description: random.words(250),
    category: commerce.department(),
    brand: random.word()
  }))

const init = () => {
  const products = { products: generateProducts(), customers: [], orders: [] }
  fs.writeFileSync('./db.json', JSON.stringify(products, null, 2))
}

init()
