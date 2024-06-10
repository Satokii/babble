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
      className="max-w-sm w-full mx-auto p-6 bg-white border border-gray-300 shadow-md rounded-lg"
      onSubmit={handleSubmit(submitData)}
    >
      <label
        htmlFor="email"
        className="block px-1 text-sm sm:text-base font-medium text-center sm:text-start text-gray-700"
      >
        Search by email:
      </label>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-y-3 sm:gap-4">
        <input
          type="text"
          className="col-span-2 block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-sm sm:text-base"
          placeholder="example@email.com"
          {...register("email")}
        />
        <Button className="sm:w-full flex justify-self-center col-span-1">
          Add
        </Button>
      </div>
      {errors.email && (
        <p className="mt-4 text-sm text-center text-red-600">
          {errors.email.message}
        </p>
      )}
      {showSuccess && (
        <p className="mt-4 text-sm text-center text-green-600">
          Friend request successfully sent.
        </p>
      )}
    </form>
  );
};

export default AddFriendForm;
