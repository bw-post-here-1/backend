function validateUser(user) {
    let errors = [];

    if (!user.username || user.username.length < 2) {
      errors.push("Your username must be at least 2 characters long.");
    }
    if (!user.password || user.password.length < 3) {
      errors.push("Your password must be at least 3 characters long.");
    }
    if (!user.email) {
      errors.push("You must include an email.");
    }
    return {
      isSuccessful: errors.length > 0 ? false : true,
      errors
    };
  }

  module.exports = {
    validateUser
  };
