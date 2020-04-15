let url = "http://159.203.100.198:5000";
//let url = "http://localhost:5000";
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

  export function fetchSurveys(userId, accessToken){
    return fetch(url+"/api/survey/assignedSurveys?userId="+userId, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer '+accessToken
      },
    })
    .then((response) => response.json())
    .then((responseJson) => {
        return responseJson;
    })
    .catch((error) => {
    console.log(error);
    });
  }

  export function updateUser(userId, firstname, lastname, accessToken) {
    return fetch(url+"/api/user/update", {
      method: 'PUT',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer '+accessToken
      },
      body: JSON.stringify({
          userId: userId,
          firstName: firstname,
          lastName: lastname,
      }),
      })
      .then((response) => {
      if (response.ok) {
          response.json().then(responseJson => {
            return responseJson;
          });
      }
      })
      .catch((error) => {
      console.log(error);
    });
  }

  export function storePushToken(userId, token, accessToken, brand){
    return fetch(url+"/api/user/pushToken", {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer '+accessToken
      },
    body: JSON.stringify({
      userId: userId,
      token: token,
      brand: brand
    }),
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