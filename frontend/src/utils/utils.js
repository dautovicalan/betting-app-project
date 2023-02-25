export const isEmail = (email) => {
  if (email.length === 0) {
    return true;
  }
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
    ? true
    : false;
};

export const isPasswordMatch = (password, repeatPassword) => {
  return password === repeatPassword ? true : false;
};

export const TYPE_FOOTBALL = "FOOTBALL";
export const TYPE_TENNIS = "TENNIS";
