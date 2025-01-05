import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

interface PasswordTextFieldProps {
  showPassword: boolean;
  handleShowPassword: () => void;
  handleMouseDownPassword: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleMouseUpPassword: (event: React.MouseEvent<HTMLButtonElement>) => void;
  setPassword: (password: string) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  onInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: boolean;
}

const PasswordTextField = ({
  showPassword,
  handleShowPassword,
  handleMouseDownPassword,
  handleMouseUpPassword,
  setPassword,
  onKeyDown,
  onInput,
  error,
}: PasswordTextFieldProps) => (
  <FormControl
    sx={{ width: "100%", maxWidth: "25rem" }}
    size="small"
    variant="outlined"
    error={error}
  >
    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
    <OutlinedInput
      id="outlined-adornment-password"
      type={showPassword ? "text" : "password"}
      autoComplete="current-password"
      onKeyDown={onKeyDown}
      endAdornment={
        <InputAdornment position="end">
          <IconButton
            aria-label={
              showPassword ? "hide the password" : "display the password"
            }
            onClick={handleShowPassword}
            onMouseDown={handleMouseDownPassword}
            onMouseUp={handleMouseUpPassword}
            edge="end"
          >
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </InputAdornment>
      }
      label="Password"
      sx={{
        "&:hover": { cursor: "pointer" },
        color: "text.primary",
      }}
      onChange={(e) => setPassword(e.target.value)}
      onInput={onInput}
    />
  </FormControl>
);

export default PasswordTextField;
