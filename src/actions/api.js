let url = "http://localhost:5000";
export function login(usernameOrEmail, password){
    return fetch("http://localhost:5000/auth/signin", {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        usernameOrEmail: usernameOrEmail,
        password: password
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson)
        return responseJson;
    })
    .catch((error) => {
    console.log(error);
    });
  }