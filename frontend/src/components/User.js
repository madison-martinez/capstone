import { useEffect, useState } from "react";

function useUser() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setCurrentUser(user);
  }, []);

  return currentUser;
}

export { useUser };
