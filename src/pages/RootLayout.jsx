import { Outlet } from "react-router-dom";
import { Suspense } from "react";
// Supports weights 100-900
import "@fontsource-variable/public-sans";
import { Alert, Snackbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { closeSnackbar } from "@redux/slices/snackBarSlice";

const RootLayout = () => {
  const dispatch = useDispatch();
  const { open, message, type } = useSelector((state) => {
    return state.snackbar;
  });

  return (
    <div>
      <Suspense fallback={<p>Loading</p>}>
        <Outlet />
      </Suspense>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={() => dispatch(closeSnackbar({ open: false, type: "error" }))}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          severity={type}
          variant="filled"
          sx={{ width: "100%" }}
        >
          <p className="max-w-[300px]">{message}</p>
        </Alert>
      </Snackbar>
    </div>
  );
};
export default RootLayout;
