import countryMobileNumbers from "../../data/coutryMobileNumbers";
/**
 * For Intillesense purpose and insure that data pass is a number
 * @param {number} value
 * @param {string} code
 */
export const checkContactNumer = (value, code) => {
  let prevCode = ""; // Initialize previous code variable

  if (code !== prevCode) {
    prevCode = code;

    for (let countryCode of countryMobileNumbers) {
      if (code === countryCode.code) {
        if (value.toString().length !== countryCode.max) {
          return true; // Return true if the length is incorrect
        } else {
          return false; // Return false if the length is correct
        }
      }
    }

    // Return false if the code is not found in countryMobileNumbers
    return false;
  }
};

export const checkEmailValidity = (value) => {
  const isValidEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!isValidEmail.test(value)) {
    return true;
  }
  return false;
};

export const checkUsernameValidity = (value) => {
  const listAuth = {
    hasWhiteSpase: false,
    notValidLength: false,
  };
  const isNonWhiteSpace = /^\S*$/;
  if (!isNonWhiteSpace.test(value)) {
    listAuth.hasWhiteSpase = true;
    //   return "Username must not contain Whitespaces.";
  }
  const isValidLength = /^.{4,16}$/;
  if (!isValidLength.test(value)) {
    listAuth.notValidLength = true;
    //   return "Username must be 4 to 8 Characters Long.";
  }

  return listAuth;
};

export const checkPasswordValidity = (value) => {
  const listAuth = {
    hasWhiteSpase: false,
    noUpperCase: false,
    noLowerCase: false,
    notContainsNumber: false,
    notContainsSymbol: false,
    notValidLength: false,
  };

  const isNonWhiteSpace = /^\S*$/;
  if (!isNonWhiteSpace.test(value)) {
    listAuth.hasWhiteSpase = true;
    //   return "Password must not contain Whitespaces.";
  }

  const isContainsUppercase = /^(?=.*[A-Z]).*$/;
  if (!isContainsUppercase.test(value)) {
    listAuth.noUpperCase = true;
    //   return "Password must have at least one Uppercase Character.";
  }

  const isContainsLowercase = /^(?=.*[a-z]).*$/;
  if (!isContainsLowercase.test(value)) {
    listAuth.noLowerCase = true;
    //   return "Password must have at least one Lowercase Character.";
  }

  const isContainsNumber = /^(?=.*[0-9]).*$/;
  if (!isContainsNumber.test(value)) {
    listAuth.notContainsNumber = true;
    //   return "Password must contain at least one Digit.";
  }

  const isContainsSymbol = /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/;
  if (!isContainsSymbol.test(value)) {
    listAuth.notContainsSymbol = true;
    //   return "Password must contain at least one Special Symbol.";
  }

  const isValidLength = /^.{8,16}$/;
  if (!isValidLength.test(value)) {
    listAuth.notValidLength = true;
    //   return "Password must be 10-16 Characters Long.";
  }

  return listAuth;
};

export const checkConfirmPassword = (password, confirmpassword) => {
  if (password === confirmpassword) {
    return false;
  }
  return true;
};
