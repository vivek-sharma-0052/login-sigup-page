import { useForm } from "react-hook-form";
import '../style/Signup.css'
import { Navigate, useNavigate } from "react-router-dom";

function Signup() {

 const {
  register,
  handleSubmit,
  reset,
  formState: { errors }
 } = useForm();
const navigate = useNavigate()
 const onSubmit = async (data) => {

  const response = await fetch("http://localhost:3000/api/user/signup", {
   method: "POST",
   headers: {
    "Content-Type": "application/json"
   },
   body: JSON.stringify(data)
  });

  const result = await response.json();
  console.log(result);
  if(result.success){
    alert(result.message)
     reset()
     navigate("/login")
  }
  else{
    alert(result.message)
  }
 
 };

 return (
  <form onSubmit={handleSubmit(onSubmit)}>

   <input
    type="text"
    placeholder="Enter name"
    {...register("name", { required: "Name is required" })}
   />

   {errors.name && <p>{errors.name.message}</p>}

   <input
    type="email"
    placeholder="Enter email"
    {...register("email", { required: "Email is required" })}
   />

   {errors.email && <p>{errors.email.message}</p>}

   <input
    type="password"
    placeholder="Enter password"
    {...register("password", {
     required: "Password required",
     minLength: {
      value: 6,
      message: "Password must be 6 characters"
     }
    })}
   />

   {errors.password && <p>{errors.password.message}</p>}

   <button type="submit">Signup</button>
   <p className="already-login" onClick={() => navigate('/login') }>Already have an account? <span>Login</span></p>

  </form>
 );
}

export default Signup;