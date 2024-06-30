"use client";

import { FC, useState } from "react";
import Button from "./ui/Button";
import { addFriendValidator } from "@/lib/validations/add-friend";
import axios, { AxiosError } from "axios";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface AddFriendFormProps {}

type FormData = z.infer<typeof addFriendValidator>;

const AddFriendForm: FC<AddFriendFormProps> = ({}) => {
  const [showSuccess, setShowSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(addFriendValidator),
  });

  const addFriend = async (email: string) => {
    try {
      const validatedEmail = addFriendValidator.parse({ email });

      await axios.post("/api/friend/add", {
        email: validatedEmail,
      });

      setShowSuccess(true);
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError("email", { message: err.message });
        return;
      }

      if (err instanceof AxiosError) {
        setError("email", { message: err.response?.data });
        return;
      }

      setError("email", {
        message: "Sorry, something went wrong. Please try again.",
      });
    }
  };

  const submitData = (data: FormData) => {
    addFriend(data.email);
  };

  return (
    <form
      className="max-w-md w-full mx-auto py-4 px-3 sm:p-6 bg-gradient-to-r from-cyan-500 to-blue-500 shadow-lg rounded-xl"
      onSubmit={handleSubmit(submitData)}
    >
      <h2 className="text-2xl font-bold text-center text-white mb-6">
        Find Friends
      </h2>
      <label
        htmlFor="email"
        className="block text-sm sm:text-base font-medium text-white text-center mb-2"
      >
        Enter email address:
      </label>
      <div className="flex flex-col sm:flex-row items-center sm:space-x-4 space-y-4 sm:space-y-0">
        <input
          type="email"
          id="email"
          className="flex-1 w-full rounded-full border border-transparent py-2 px-2 sm:px-4 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 focus:border-cyan-500 text-xs sm:text-base"
          placeholder="example@email.com"
          {...register("email", { required: "Email is required" })}
        />
        <button
          type="submit"
          className="mt-2 sm:mt-0 py-2 px-4 rounded-full bg-white text-cyan-600 text-xs sm:text-sm font-medium hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
        >
          Add
        </button>
      </div>
      {errors.email && (
        <p className="mt-4 bg-red-500 bg-opacity-80 text-white text-center sm:text-sm text-xs p-2 rounded-md">
          {errors.email.message}
        </p>
      )}
      {showSuccess && (
        <p className="mt-4 bg-green-500 bg-opacity-80 text-white text-center sm:text-sm text-xs p-2 rounded-md">
          Friend request successfully sent.
        </p>
      )}
    </form>
  );
};

export default AddFriendForm;
