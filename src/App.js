import React, { useState, useEffect } from "react";
import { 
   Route,
   Switch,
   Link,
   Redirect
} from "react-router-dom";

//pages
import MainPage from "./pages/index"
import PizzaForm from "../src/pages/form"
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

  const [pizza, setPizza] = useState(initialPizzas); // array of Pizza objects
  const [formValues, setFormValues] = useState(initialFormValues); // object
  const [formErrors, setFormErrors] = useState(initialFormErrors); // object
  const [disabled, setDisabled] = useState(initialDisabled); // boolean
  const getPizzas = () => {
  
    axios
      .get("http://buddies.com/api/Pizzas")
      .then((res) => {
        setPizzas(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const postNewPizza = (newPizza) => {
    
    axios
      .post("http://buddies.com/api/Pizzas", newPizza)
      .then((res) => {
        setPizzas([res.data, ...Pizzas]);
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
      username: formValues.name.trim(),
      name: formValues.size.trim(),
      size: formValues.toppings.trim(),
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

  
)
</div>
)
}
