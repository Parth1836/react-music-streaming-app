export const verifyUser = (userCredentials) => {
  const usersDetails = localStorage.getItem("userTable")
    ? JSON.parse(localStorage.getItem("userTable"))
    : null;
  console.log("userDetails", usersDetails, userCredentials);
  if (usersDetails && usersDetails?.length > 0) {
    const user = usersDetails?.find((user) => {
      if (user?.email === userCredentials?.email) {
        return true;
      } else {
        return false;
      }
    });
    console.log("19 user", user);
    if (user && Object.keys(user).length > 0) {
      if (
        user?.email === userCredentials?.email &&
        user?.password === userCredentials?.password
      ) {
        const token = new Date().getTime().toString();
        localStorage.setItem("clientUserToken", token);
        localStorage.setItem("serverToken", token);
        const userObj = {
          id: user?.id,
          name: user?.name,
          email: user?.email,
        };
        localStorage.setItem("userDetails", JSON.stringify(userObj));
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
  return false;
};

export const register = (userObj) => {
  console.log("userObj", userObj);
  const userArr = localStorage.getItem("userTable")
    ? JSON.parse(localStorage.getItem("userTable"))
    : null;
  console.log("userArr", userArr, userArr);
  let tempList = [];
  if (userArr && userArr?.length > 0) {
    userObj.id = userArr?.length + 1;
    tempList = [...userArr, userObj];
  } else {
    userObj.id = 1;
    tempList.push(userObj);
  }
  localStorage.setItem("userTable", JSON.stringify(tempList));
  // const token = new Date().getTime().toString();
  // localStorage.setItem("clientUserToken", token);
  // localStorage.setItem("serverToken", token);
  return true;
};

export const logout = () => {
  localStorage.removeItem("clientUserToken");
  localStorage.removeItem("serverToken");
  localStorage.removeItem("userDetails");
  return true;
};
