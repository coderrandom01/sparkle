import React, { useState } from 'react';
import { USER_RGN } from '../apollo/mutation';
import { useMutation } from '@apollo/client';
import { validation } from '../HelperFunctions/validation';
import { isValid } from '../HelperFunctions/basicHelpers';
import TextField from './Fields/textField';
import { Box, Button, Container, Grid2 } from '@mui/material';

interface IFormData {
  firstName: string
  lastName: string
  email: string;
  // gender: string
  // age: number
  password: string;
  phone_number: string;
}

function SignUp(props: any) {
  const [formData, setFormData] = useState<IFormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone_number: "",
  });
  const [errors, setErrors] = useState<IFormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone_number: "",
  });
  const [submitForm, { data, loading, error }] = useMutation(USER_RGN);
  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevData) => ({
      ...prevData,
      [name]: ""
    }))
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); // Prevent page reload
    const errors = validation("signUp", formData)
    setErrors(errors)
    if (isValid(errors)) {
      // const data = formData
      try {
        const submitData = await submitForm({ variables: { data: formData } });
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          phone_number: "",
        })
        // props.handleClose()
        props.moveToLogin()

      } catch (e) {
        console.error(e)
      }
    }
    // Process the form data (e.g., send it to an API)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Grid2 container>

        <Grid2 size={{ xs: 12, sm: 6, md: 6 }}>
          <div className="padLR5">
            {/* <label>First Name:</label> */}
            <TextField
              label="Firstname"
              type="text"
              name="firstName"
              value={formData.firstName}
              changeFunction={handleChange}
            />
            {errors.firstName && <p className="errorText" style={{ color: "red" }}>{errors.firstName}</p>}
          </div>
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6, md: 6 }}>

          <div className="padLR5">
            {/* <label>Last Name:</label> */}
            <TextField
              label="Lastname"
              type="text"
              name="lastName"
              value={formData.lastName}
              changeFunction={handleChange}
            />
            {errors.lastName && <p className="errorText" style={{ color: "red" }}>{errors.lastName}</p>}
          </div>
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6, md: 6 }}>

          <div className="padLR5">
            {/* <label>Email:</label> */}
            <TextField
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              changeFunction={handleChange}
            />
            {errors.email && <p className="errorText" style={{ color: "red" }}>{errors.email}</p>}
          </div>
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6, md: 6 }}>

          <div className="padLR5">
            {/* <label>Phone Number:</label> */}
            <TextField
              label="Number"
              type="number"
              name="phone_number"
              value={formData.phone_number}
              changeFunction={handleChange}
            />
            {errors.phone_number && <p className="errorText" style={{ color: "red" }}>{errors.phone_number}</p>}
          </div>
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 12, md: 12 }}>

          <div className="padLR5">
            {/* <label>Password:</label> */}
            <TextField
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              changeFunction={handleChange}
            />
            {errors.password && <p className="errorText" style={{ color: "red" }}>{errors.password}</p>}
          </div>
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 12, md: 12 }}>

          <Box sx={{ display: "flex", justifyContent: "center", marginTop: "30px" }}>
            <Button type="submit" variant="outlined" className="submitBtn">Submit</Button>
          </Box>
        </Grid2>
      </Grid2>
    </form>
  );
}

export default SignUp;
