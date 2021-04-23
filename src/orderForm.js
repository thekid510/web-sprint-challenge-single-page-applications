import React from "react";


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

