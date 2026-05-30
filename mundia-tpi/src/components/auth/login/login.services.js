export const loginUser = (email, password) => {
  return fetch("http://localhost:3000/login", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ email, password }),
  })
    .then(async (res) => {
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Contraseña o email incorrectos.");
      }
      return res.json();
    })
    .then((data) => {
      localStorage.setItem("token", data);
      return data;
    })
    .catch((err) => {
      console.log(err.message);
      throw err;
    });
};
