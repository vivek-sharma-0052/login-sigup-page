import { useForm } from "react-hook-form";

function ForgotPassword() {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    const res = await fetch(
      "https://server-backend-bkbu.onrender.com//api/user/forgot-password",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      },
    );

    const result = await res.json();

    console.log(result);

    if (!res.ok) {
      alert(result.message);
    } else {
      alert(result.message); // Reset link sent to email
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Forgot Password</h2>

      <input type="email" placeholder="Enter email" {...register("email")} />

      <button type="submit">Send Reset Link</button>
    </form>
  );
}

export default ForgotPassword;
