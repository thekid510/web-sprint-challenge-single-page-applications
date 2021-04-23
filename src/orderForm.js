import React from 'react'

export default function PizzaForm(props) {
const { values, submit, change, disabled, errors} =props;

const onSubmit = (evt) => {

    evt.preventDefault();
    submit();
};
const onChange = (evt) => {
    const  {name,value, type, checked} = evt.target;
    const valueToUse = type === 'checkbox' ? checked : value ;
    change(name, valueToUse);

};

return (
<form className='form container' onSubmit={onSubmit}>
    <div className="form-group submit">
    <button disabled={disabled}>Order</button>
    <div className = "errors">
        <div>{errors.name}</div>
        <div>{errors.size}</div>
        <div>{errors.toppings}</div>
        <div>{errors.instructions}</div>
    </div>
  </div>
<div className ='form-group inputs'>
<label>
    Name
    <input
        value={values.name}
        onChange={onChange}
        name="name"
        type="text"
    />  

</label>



</div>







</form>





)



}


