//let url = "http://159.203.100.198:5000";
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

  export function fetchAssets(surveyId, accessToken){
    return fetch(url+"/api/siteAsset/assets?surveyId="+surveyId, {
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

  export function fetchMeasurements(assetIds, accessToken){
    return fetch(url+"/api/measurement/measurements", {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer '+accessToken
      },
    body: JSON.stringify({
      assetIds: assetIds
    }),
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

  export function updateMeasurement(measurements, accessToken) {
    return fetch(url+"/api/measurement/value", {
      method: 'PUT',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer '+accessToken
      },
      body: JSON.stringify({
          assetId: measurements[0].asset.id,
          measurements: measurements,
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

  export function resetPassword(email){
    return fetch(url+"/api/user/resetPassword?email="+email, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
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

  export function changePassword(token, password){
    return fetch(url+"/api/user/changePassword", {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: token,
        password: password
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

  export function validateToken(token){
    return fetch(url+"/api/user/validateToken?token="+token, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
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

  export function uploadPhoto(image, assetId, accessToken){
    const uri = image;
    const uriParts = uri.split('.');
    const fileType = uriParts[uriParts.length - 1];
    const formData = new FormData();
    formData.append('file', {
      uri,
      name: `photo.${fileType}`,
      type: `image/${fileType}`,
    });
    formData.append('assetId', assetId)

    return fetch(url+"/api/picture/upload", {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer '+accessToken
      },
    body: formData
    })
    .then((response) => response.json())
    .then((responseJson) => {
        return responseJson;
    })
    .catch((error) => {
      console.log(error);
    });
  }

  export function fetchPictures(assetIds, accessToken){
    return fetch(url+"/api/picture/fetchPictures", {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer '+accessToken
      },
      body: JSON.stringify({
        assetIds: assetIds,
      }),
    })
    .then((response) => response.json())
    .then((responseJson) => {
        return responseJson;
    })
    .catch((error) => {
      console.log(error);
    });
}