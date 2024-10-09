import { createSlice } from "@reduxjs/toolkit";

// R1: Restaurant 1, R2: Restaurant 2
const initialState = {
  is_disabled: false,
  r1_disabled: false,
  r2_disabled: false,
  restaurants: [
    { id: 1, name: "Restaurant I", ordered: false, validated: false },
    { id: 2, name: "Restaurant II", ordered: false, validated: false },
  ],
};

export const autorisationSlice = createSlice({
  name: "autorisation",
  initialState,
  reducers: {
    disable: (state, action) => {
      state.is_disabled = action.payload;
    },

    setR1Disabled: (state, action) => {
      state.r1_disabled = action.payload;
    },

    setR2Disabled: (state, action) => {
      state.r2_disabled = action.payload;
    },

    setRestaurants: (state, action) => {
      state.restaurants = action.payload;
    },

    updateRestaurant: (state, action) => {
      const { id, ordered, validated } = action.payload;
      const restaurant = state.restaurants.find((r) => r.id === id);
      if (restaurant) {
        restaurant.ordered = ordered !== undefined ? ordered : restaurant.ordered;
        restaurant.validated = validated !== undefined ? validated : restaurant.validated;
      }
    },
  },
});

// Exporter les actions
export const { disable, setR1Disabled, setR2Disabled, setRestaurants, updateRestaurant } = autorisationSlice.actions;

// Exporter le reducer
export default autorisationSlice.reducer;