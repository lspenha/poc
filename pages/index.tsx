import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";

enum GenderEnum {
  female = "female",
  male = "male",
  other = "other",
}

interface IFormInput {
  firstName: String;
  gender: GenderEnum;
}

const schema = z.object({
  firstName: z
    .string()
    .min(2, { message: "Must be 2 or more characters long" }),
  gender: z.string({ required_error: "Gender is required" }),
});

export default function Home() {
  const [gender, setGender] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    try {
      // schema.parse(data);
      console.log(data);
    } catch (error) {}
  };

  const handleChange = (event: SelectChangeEvent) => {
    setGender(event.target.value as string);
  };

  return (
    <Box
      sx={{
        m: "auto",
        width: "50%",
        p: 3,
      }}
    >
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <TextField
          fullWidth
          label="First Name"
          variant="outlined"
          helperText={
            errors.firstName?.message && <p>{errors.firstName?.message}</p>
          }
          {...register("firstName")}
        />

        <Box sx={{ pt: 2, pb: 2 }}>
          <FormControl fullWidth>
            <InputLabel>Gender Selection</InputLabel>
            <Select
              {...register("gender")}
              value={gender}
              label="Gender Selection"
              onChange={handleChange}
            >
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Button variant="contained" type="submit">
          Send
        </Button>
      </Box>
    </Box>
  );
}
