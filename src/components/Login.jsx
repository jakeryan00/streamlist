import { GoogleLogin } from "@react-oauth/google";

function Login({ setUser }) {
  function handleSuccess(credentialResponse) {
    localStorage.setItem("eztechUser", JSON.stringify(credentialResponse));
    setUser(credentialResponse);
  }

  return (
    <main className="page login-page">
      <section className="movie-card login-card">
        <h1>EZTechMovie Login</h1>

        <p>
          Please sign in with Google to access the StreamList application,
          movie catalog, cart, and credit card management system.
        </p>

        <GoogleLogin
          onSuccess={handleSuccess}
          onError={() => {
            alert("Login failed. Please try again.");
          }}
        />
      </section>
    </main>
  );
}

export default Login;