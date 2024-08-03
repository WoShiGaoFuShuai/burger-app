import PostService from "@/API/post-service";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const loadIngredients = createAsyncThunk(
  "ingredients/loadIngredients",
  async () => {
    const response = await PostService.getAll();

    if (response.success) {
      return response.data;
    } else {
      throw new Error("Failed to fetch ingredients");
    }
  }
);
