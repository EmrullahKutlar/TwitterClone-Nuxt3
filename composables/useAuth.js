export default () => {
  const useAuthToken = () => useState("auth_token");
  const useAuthUser = () => useState("auth_user");

  const setToken = (newToken) => {
    const authToken = useAuthToken();
    authToken.value = newToken;
  };

  const setUser = (newUser) => {
    const authUser = useAuthUser();
    authUser.value = newUser;
  };
  const login = ({ username, password }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await $fetch("/api/auth/login", {
          method: "POST",
          body: {
            username,
            password,
          },
        });

        setToken(data.access_token);
        setUser(data.user);
        console.log(data);
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  };
  const refreshToken = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await $fetch("/api/auth/refresh");
        setToken(data.access_token);
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  };
  const initAuth = () => {
    return new Promise(async (resolve, reject) => {
      try {
        await refreshToken();
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  };
  return {
    login,
    useAuthUser,
    initAuth,
  };
};

// const useAuthToken = () => useState("auth_token");
// const useAuthUser = () => useState("auth_user");

// export const setToken = (newToken) => {
//   const authToken = useAuthToken();
//   authToken.value = newToken;
// };

// export const setUser = (newUser) => {
//   const authUser = useAuthUser();
//   authUser.value = newUser;
// };

// export const login = ({ username, password }) => {
//   console.log(username, password);
//   return new Promise(async (resolve, reject) => {
//     try {
//       const data = await $fetch("/api/auth/login", {
//         method: "POST",
//         body: {
//           username,
//           password,
//         },
//       });
//       setToken(data.access_Token);
//       setUser(data.user);
//       resolve(true);
//       console.log(data);
//     } catch (e) {
//       reject(e);
//     }
//   });
// };

// export const refreshToken = () => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       const data = await $fetch("/api/auth/refresh");
//       setToken(data.access_token);
//     } catch (error) {
//       reject(error);
//     }
//   });
// };

// export const initAuth = () => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       await sendRefreshToken();
//     } catch (error) {
//       reject(error);
//     }
//   });
// };
