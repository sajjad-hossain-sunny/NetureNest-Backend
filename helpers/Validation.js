const emailValidation = (email) => {
  const pattern =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return pattern.test(email);
};

const passwordValidation = (password) => {
  const hasSequence = (str) => {
    let sequences = [
      "0123456789",
      "abcdefghijklmnopqrstuvwxyz",
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    ];
    for (let seq of sequences) {
      for (let i = 0; i < seq.length - 5; i++) {
        const subSeq = seq.substring(i, i + 4);
        if (str.includes(subSeq)) return true;
      }
    }
    return false;
  };
  let hasRepeatedCharacters = (str) => /(\w)\1{3,}/.test(str);

  if (!/^(?=.*[a-z])/.test(password)) {
    return "Password must contain at least 1 lowercase character";
  } else if (!/^(?=.*[A-Z])/.test(password)) {
    return "Password must contain at least 1 uppercase character";
  } else if (!/^(?=.*[0-9])/.test(password)) {
    return "Password must contain at least 1 numeric character";
  } else if (!/^(?=.*[!@#$%^&*])/.test(password)) {
    return "Password must contain at least 1 special character";
  } else if (password.length < 8) {
    return "Password must be eight characters or longer";
  } else if (hasSequence(password) || hasRepeatedCharacters(password)) {
    return "Password cannot contain sequences or repeated characters";
  }
  return null;
};

module.exports = { emailValidation, passwordValidation };
