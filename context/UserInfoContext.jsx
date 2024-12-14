import React, { createContext, useState } from "react";

export const UserInfoContext = createContext({
  userData: null,
  setUserData: (data) => {},
});

export const UserInfoProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  return (
    <UserInfoContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserInfoContext.Provider>
  );
};
