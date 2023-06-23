import { configureStore } from "@reduxjs/toolkit";
import signupReducer from "../pages/Authentication/Registration/Landlord/signupSlice";
import propertiesReducer from "../components/properties/propertiesSlice";

export default configureStore({
  reducer: {
    signup: signupReducer,
    properties: propertiesReducer,
  },
});
