import React from 'react';
import { useForm } from 'react-hook-form';

export default function App() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);
  console.log(errors);
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder="First name" {...register("First name", {required: true, maxLength: 80})} />
      <input type="text" placeholder="Last name" {...register("Last name", {required: true, maxLength: 100})} />
      <input type="text" placeholder="Email" {...register("Email", {required: true, pattern: /^\S+@\S+$/i})} />
      <input type="tel" placeholder="Mobile number" {...register("Mobile number", {required: true, minLength: 6, maxLength: 12})} />
      <select {...register("Title", { required: true })}>
        <option value="Small">Sml</option>
        <option value="Medium">Med</option>
        <option value="Large">Large</option>
        <option value="XL">XL</option>
      </select>
      <input type="text" placeholder="Special Instructions" {...register("Special Instructions", {required: true})} />
      <select {...register("Toppings", { required: true })}>
        <option value="Pepperoni">Pepperoni</option>
        <option value="Mushroom">Mushroom</option>
        <option value="Onions">Onions</option>
        <option value="Sausage">Sausage</option>
      </select>

      <input type="submit" />
    </form>
  );
}

      
     