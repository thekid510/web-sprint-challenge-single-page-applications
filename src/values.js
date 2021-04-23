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
    export default function PizzaForm(props) {
        const {values, submit, change, disabled, errors} = props;
        
        const onSubmit = (evt) => {
        evt.preventDefault();
        submit();
        
        };
        
        const onChange = (evt) => {
            const {name, value, type, checked} = evt.target;
            const valueToUse = type === "checkbox" ? checked: value ;
            change(name, valueToUse);
        };
        return (
        <form className="form container" onSubmit={onSubmit}>
          <div className ="form-group submit">
            
            <button disabled ={disabled}>Order</button>
            <div className = "errors">
              <div>{errors.name}</div>
              <div>{errors.size}</div>
              <div>{errors.toppings}</div>
              <div>{errors.instructions}</div>
            </div>
         </div>
         <div className = "form-group inputs">
            <h4> General info </h4>
            <label>
                Name
                <input
                    value={values.name}
                    onChange={onChange}
                    name="name"
                    type="text"
                    />
            </label>
            
            <label>
                Size
                <select onChange={onChange}value={values.size} name="size">
                <option value="">- Select an Option -</option>
                <option value = "personal">Personal Pizza</option>
                <option value = "small">Small</option>
                <option value = "medium">medium</option>
                <option value = "large">large</option>
                </select>
              </label>
            </div>
            <div className="form-group checkboxes">
                <h4>toppings</h4>
                <label>
                      Pepperoni
                      <input
                        type="checkbox"
                        name="pepperoni"
                        checked={values.pepperoni}
                        onChange={onChange}
                      />
                    </label>
                    <label>
                      Mushroom
                      <input
                        type="checkbox"
                        name="mushroom"
                        checked={values.mushroom}
                        onChange={onChange}
                      />
                    </label>
                    <label>
                      Onions
                      <input
                        type="checkbox"
                        name="onions"
                        checked={values.onions}
                        onChange={onChange}
                      />
                    </label>
                    <label>
                      Sausage
                      <input
                        type="checkbox"
                        name="sausage"
                        checked={values.sausage}
                        onChange={onChange}
                      />
                    </label>
                    
                </div>
                <label>
                Special Instructions
                <input
                    value={values.instructions}
                    onChange={onChange}
                    name="instructions"
                    type="text"
                    />
         </label>
         </form>
        );
        }
        
        
};
