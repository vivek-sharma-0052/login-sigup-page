import {Link, useNavigate} from "react-router-dom"
import {useForm} from "react-hook-form"
function Login() {
    const {
        register,
        handleSubmit,
        reset,
        formState : {errors}
    } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const response = await fetch("http://localhost:3000/api/user/login",{
                method:"POST",
                headers : {
                    "content-Type" : "application/json"
                },
                body : JSON.stringify(data)
            })
            const result = await response.json();
            if(result.token){
                alert("Login Successful")
                localStorage.setItem("token", result.token);
                reset();
                navigate('/profile')
            }
            else{
                alert(result.message);
            }
        } catch (error) {
            console.log(error)
        }
    }
    return(
        <>
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
                <h2>Login</h2>
                <input type="email"
                placeholder="Enter email" 
                {...register("email",{required: " Email is required"})}
                />
                {errors.email && <p>{errors.email.message} </p>}
                
                <input
     type="password"
     placeholder="Enter Password"
     {...register("password",{required:"Password is required"})}
    />

    {errors.password && <p>{errors.password.message}</p>}

    <button type="submit">Login</button>
<p className="forgot-text">
 Forgot Password? <Link to="/forgot-password">Click here</Link>
</p>
            </form>
        </div>
        </>
    );
}
export default Login;