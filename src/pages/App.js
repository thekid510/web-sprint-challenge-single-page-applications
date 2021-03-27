import React, { useState, useEffect } from "react";
import Pizza from "./pizza"
import PizzaForm from "./form"
import schema from "../validation/formSchema";
import axios from "axios";
import * as yup from "yup";

const initialFormValues ={

  name:"",
  size:"",
  instructions:"",

  pepperoni:false,
  mushroom:false,
  onions:false,
  sausage:false
};
const initialFormErrors = {
  name: "",
  size: "",
  instructions: "",
};
const initialPizzas = [];
const initialDisabled = true;

export default function App() {

  const [pizzas, setPizzas] = useState(initialPizzas); // array of Pizza objects
  const [formValues, setFormValues] = useState(initialFormValues); // object
  const [formErrors, setFormErrors] = useState(initialFormErrors); // object
  const [disabled, setDisabled] = useState(initialDisabled); // boolean

  const getPizzas = () => {
  
    axios
      .get("https://reqres.in/pizzas")
      .then((res) => {
        setPizzas(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const postNewPizza = (newPizza) => {
    
    axios
      .post("https://reqres.in/pizzas", newPizza)
      .then((res) => {
        setPizzas([res.data, ...pizzas]);
        setFormValues(initialFormValues);
      })
      .catch((err) => {
        console.log(err);
      });
  };

 
  const inputChange = (name, value) => {
    yup
      .reach(schema, name) 
    
      .validate(value) 
      .then(() => {
        setFormErrors({
          ...formErrors,
          [name]: "",
        });
      })
      .catch((err) => {
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0],
        });
      });
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const formSubmit = () => {
    const newPizza = {
      name: formValues.name.trim(),
      size: formValues.size.trim(),
      instructions: formValues.instructions.trim(),
      toppings: ["pepperoni","mushroom","onions","sausage"].filter(
        (hobby) => formValues[hobby]
      ),
    };
    postNewPizza(newPizza);
  };
  useEffect(() => {
    getPizzas();
  }, []);

  useEffect(() => {
 
    schema.isValid(formValues).then((valid) => {
      setDisabled(!valid);
    });
  }, [formValues]);

  return (
    <div className="container">
      <header>
        <h1>Pizza App</h1>
      </header>

      <PizzaForm
        values={formValues}
        change={inputChange}
        submit={formSubmit}
        disabled={disabled}
        errors={formErrors}
      />

   {pizzas.map((pizza) => {
        return <Pizza key={pizza.id} details={pizza} />;
      })}
</div>
 );
}
