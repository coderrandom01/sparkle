export const emailRegx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const passwordRegx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
export const validation = (page: string, data: any) => {
  let errors: any = {};

  switch (page) {
    case "signUp":
      errors.email = !data.email
        ? "Email is required"
        : String(data.email)
          .toLowerCase()
          .match(emailRegx)
          ? ""
          : "Invalid email address";

      errors.password = !data.password
        ? "Password is required"
        : data.password.length < 8
          ? "Password must be at least 8 characters long"
          : passwordRegx.test(data.password)
            ? ""
            : "Password must include at least one uppercase, one lowercase, one number, and one special character";

      errors.phone_number = !data.phone_number
        ? "Phone number is required"
        : !/^\d+$/.test(data.phone_number.toString())
          ? "Phone number must contain only digits"
          : "";

      // errors.age = !data.age
      //   ? "Age is required"
      //   : isNaN(data.age) || data.age < 18 || data.age > 100
      //   ? "Age must be a valid number between 18 and 100"
      //   : "";

      // errors.gender = !data.gender
      //   ? "Gender is required"
      //   : !["male", "female", "other"].includes(data.gender.toLowerCase())
      //   ? "Gender must be one of: male, female, other"
      //   : "";

      errors.firstName = !data.firstName
        ? "First name is required"
        : data.firstName.trim().length < 2
          ? "First name must be at least 2 characters long"
          : "";

      errors.lastName = !data.lastName
        ? "Last name is required"
        : data.lastName.trim().length < 2
          ? "Last name must be at least 2 characters long"
          : "";

      break;

    case "login":
      errors.email = !data.email ? "Email is required" : "";
      errors.password = !data.password ? "Password is required" : "";
      break;
    case "addProduct":
      errors.title = !data.title ? "Title is Required" : "";
      errors.description = !data.description ? "Description is Required" : data.description.length < 10 ? "Description need atleat 10 letters" :  data.description.length > 500 ?   "Description need to be below 500 letters" : ""
      errors.status = data.id ? !data.status ? "Status is Required" : "" : ""
      break;
    case "manageCategory": 
    errors.category_name = !data.category_name ? "Category title is required" : ""
    errors.image = !data.image ? "Image is required" : ""
    break;
    case "adManagement":
      errors.image = !data.images ? "Image is required!" : "";
      errors.url = !data.url || data.url === "" ? "Url is required!" : "";
      break;
    default:
      console.warn("Validation not implemented for this page:", page);
      break;
  }

  return errors;
};
