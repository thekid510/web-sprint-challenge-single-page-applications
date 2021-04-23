import React, {useState, useEffect } from 'react'
import PizzaForm from './pages/orderForm'
import axios from 'axios';
import * as yup from "yup";
import schema from "../src/validation/formSchema";



const initialFormValues= {
    name:"",
    size:"",
    
    pepperoni:false,
    mushroom:false,
    onions:false,
    sausage:false,

    instructions:""
};

const initialFormErrors = {
    name:"",
    size:"",
    instructions:""
};
const initialPizzas = [];
const initialDisabled = true;

export default function State() {

    const [pizzas, setPizzas] = useState(initialPizzas);
    const [formValues, setFormValues] = useState(initialFormValues);
    const [formErrors, setFormErrors] = useState(initialFormErrors);
    const [disabled, setDisabled] = useState(initialDisabled)

    const postNewPizza = (newPizza) => {
axios
    .post("https://reqres.in/api/pizzas",newPizza)
    .then(res => {
        setPizzas([res.data, ...pizzas]);
        setFormValues(initialFormValues);

    })
    .catch(err => {
        console.log(err);

    });
};
    const inputChange = (name, value) => {
        yup
            .reach(schema,name)
            .validate(value)
            .then(() => {
                setFormValues({
                    ...formErrors,
                    [name]:"",
                })
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
        postNewPizza(newPizza)

    };



useEffect(()=> {
    schema.isValid(formValues).then((valid) => {
        setDisabled(!valid);
      });
    }, [formValues]);

return (
<div className="container">
<PizzaForm
        values={formValues}
        change={inputChange}
        submit={formSubmit}
        disabled={disabled}
        errors={formErrors}
      />
</div>
    );
    
};
