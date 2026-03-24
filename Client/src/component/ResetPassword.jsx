import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";

function ResetPassword(){

 const { token } = useParams();
 const navigate = useNavigate();

 const { register, handleSubmit } = useForm();

 const onSubmit = async (data) => {

  const res = await fetch(`http://localhost:3000/api/user/reset-password/${token}`,{
   method:"POST",
   headers:{ "Content-Type":"application/json" },
   body: JSON.stringify(data)
  });

  const result = await res.json();

  alert(result.message);

  navigate("/login");
 };

 return(
  <form onSubmit={handleSubmit(onSubmit)}>
   <h2>Reset Password</h2>

   <input
    type="password"
    placeholder="New Password"
    {...register("password")}
   />

   <button type="submit">Reset Password</button>
  </form>
 );
}

export default ResetPassword;