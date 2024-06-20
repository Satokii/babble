"use client";

import { updateProfileValidator } from "@/lib/validations/update-profile";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Image from "next/image";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface ProfileFormProps {
  user: User;
  closeForm: () => void;
}

type FormData = z.infer<typeof updateProfileValidator>;

const ProfileForm: FC<ProfileFormProps> = ({
  user,
  closeForm,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    defaultValues: user,
    resolver: zodResolver(updateProfileValidator),
  });

  const submitData = async (data: FormData) => {
    console.log(data)
    try {
      await axios.post("/api/profile/update", {
        data
      });
      // if (response.ok) {
      //   console.log('User data updated successfully');
      // } else {
      //   console.error('Failed to update user data');
      // }
    } catch (error) {
      console.error('Error updating user data:', error);
    }
    closeForm()
  }
  
  return (
    <form onSubmit={handleSubmit(submitData)} className="space-y-6">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <Image
            width={100}
            height={100}
            referrerPolicy="no-referrer"
            className="rounded-full"
            src={user.image || ""}
            alt="User profile picture"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <label
            htmlFor="image"
            className="absolute bottom-0 right-0 bg-cyan-500 p-2 rounded-full cursor-pointer text-white"
          >
            <input
              type="file"
              id="image"
              accept="image/*"
              className="hidden"
              {...register("image")}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.232 5.232l3.536 3.536M8 16v4h4M5.232 5.232a6 6 0 011.768-1.768m10.392 10.392a6 6 0 01-1.768 1.768M9 11h2m-2 2h.01m3.489 0h.01m.61-2.207a2.5 2.5 0 10-3.536 3.536 2.5 2.5 0 003.536-3.536z"
              />
            </svg>
          </label>
        </div>
        <div className="w-full max-w-xs">
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
        <div className="w-full max-w-xs">
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
        <div className="flex space-x-4">
          <button
            type="submit"
            className="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={closeForm}
            className="py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
};

export default ProfileForm;
