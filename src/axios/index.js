import { v4 as uuid } from 'uuid'
import { rest } from 'msw'

// 👉 the shape of the list of Pizzas from API
const pizzas = [
  {
    id: uuid(), // uuid is a lib to generate random, unique ids
    name: 'Michael',
    instructions: 'michael@michael.com',
    size: 'Medium',
    toppings: [
        "pepperoni",
        "mushroom",
        "onion",
        "sausage",
    ]
  },
]
function getAllPizzas(req, res, ctx) {
    return res(
      ctx.status(200),
      ctx.json(pizzas),
    )
  }
  
  function createNewPizza(req, res, ctx) {
    const { name, size, instructions } = req.body
    const requiredFields = { name, size, instructions}
  
    if (Object.values(requiredFields).some(field => (!field || !field.trim()))) {
      return res(
        ctx.status(400),
        ctx.json({ message: 'Some required fields are missing or invalid.' }),
      )
    }
  
    if (req.body.toppings && !Array.isArray(req.body.toppings)) {
      return res(
        ctx.status(400),
        ctx.json({ message: 'The optional `toppings` field must be an array.' }),
      )
    }
  
    const newPizza = { id: uuid(), ...req.body }
    pizzas.unshift(newPizza)
  
    return res(
      ctx.status(201),
      ctx.json(newPizza),
    )
  }
  
  export const handlers = [
    rest.get('https://reqres.in/pizzas', getAllPizzas),
    rest.post('https://reqres.in/pizzas', createNewPizza),
  ]
  

