"use client";

import { updateProfileValidator } from "@/lib/validations/update-profile";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import Image from "next/image";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import Button from "./ui/Button";

interface ProfileFormProps {
  user: User;
  closeForm: () => void;
}

type FormData = z.infer<typeof updateProfileValidator>;

const ProfileForm: FC<ProfileFormProps> = ({ user, closeForm }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    defaultValues: user,
    resolver: zodResolver(updateProfileValidator),
  });

  const submitData = async (data: FormData) => {
    setIsLoading(true);

    try {
      await axios.post("/api/profile/update", {
        data,
      });
      closeForm();
      toast.success("Details updated successfully.");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (err) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data);
      } else {
        console.error("Error updating user data:", err);
        toast.error("Sorry something went wrong, please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(submitData)} className="space-y-8">
      <div className="flex flex-col items-center space-y-6">
        <div className="relative">
          <Image
            width={120}
            height={120}
            referrerPolicy="no-referrer"
            className="rounded-full border-4 border-cyan-100"
            src={user.image || ""}
            alt="User profile picture"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="w-full max-w-md space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">Name is required</p>
            )}
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">Email is required</p>
            )}
          </div>
        </div>
        <div className="flex space-x-4">
          <Button
            type="submit"
            isLoading={isLoading}
            className="py-2 px-6 border border-transparent text-base font-medium rounded-full text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
          >
            Save Changes
          </Button>
          <Button
            type="button"
            onClick={closeForm}
            className="py-2 px-6 border border-gray-300 text-base font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
          >
            Cancel
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ProfileForm;
