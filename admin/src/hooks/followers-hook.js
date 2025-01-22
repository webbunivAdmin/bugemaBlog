import { useMutation } from "@tanstack/react-query";
import axios from "axios";
export const API_URI = process.env.REACT_APP_API_URL;

export const useFollowers = (toast, toggle, token) => {
  return useMutation({
    mutationFn: async (page) => {
      toggle();

      const { data } = await axios.post(
        `${API_URI}/posts/admin-followers?page=${page}`,
        null,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      return data;
    },
    onError: (error) => {
      toggle();
      const errMsg = error?.response?.data?.message;
      toast.error(errMsg ?? error.message);
      if (errMsg === "Authentication failed") {
        localStorage.removeItem("user");
      }
    },
    onSuccess: (data) => {
      toggle();
      toast.success("Loaded Successfully");
    },
  });
};
