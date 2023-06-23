import { createSlice } from "@reduxjs/toolkit";

export const propertiesSlice = createSlice({
  name: "propertiesSlice",
  initialState: {
    propertyName: "",
    Street: "",
    Barangay: "",
    City: "",
    Province: "",
    Country: "",
    numberOfRooms: "",
  },
  reducers: {
    setPropertyName: (state, action) => {
      state.propertyName = action.payload;
    },
    setStreet: (state, action) => {
      state.Street = action.payload;
    },
    setBarangay: (state, action) => {
      state.Barangay = action.payload;
    },
    setCity: (state, action) => {
      state.City = action.payload;
    },
    setProvince: (state, action) => {
      state.Province = action.payload;
    },
    setCountry: (state, action) => {
      state.Country = action.payload;
    },
    setNumberOfRooms: (state, action) => {
      state.numberOfRooms = action.payload;
    },
  },
});

export const {
  setPropertyName,
  setStreet,
  setBarangay,
  setCity,
  setProvince,
  setCountry,
  setNumberOfRooms,
} = propertiesSlice.actions;

export default propertiesSlice.reducer;
