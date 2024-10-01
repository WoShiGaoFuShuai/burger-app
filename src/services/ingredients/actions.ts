import IngredientsService from "@/API/ingredients-service";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const loadIngredients = createAsyncThunk(
  "ingredients/loadIngredients",
  async () => {
    const response = await IngredientsService.getAll();

    if (response.success) {
      return response.data;
    } else {
      throw new Error("Failed to fetch ingredients");
    }
  }
);
