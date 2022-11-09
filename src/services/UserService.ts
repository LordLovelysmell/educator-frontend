type UserData = {
  username: string;
  password: string;
};

type CreatedUser = {
  message: string;
  token: string;
};

const createUser = async (userData: UserData): Promise<CreatedUser> => {
  try {
    const response = await fetch(`${process.env.API_URL}/users`, {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.json();
  } catch (err) {
    console.error(err);
  }
};

export { UserData, createUser };
