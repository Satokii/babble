import { FC } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface loadingProps {}

const loading: FC<loadingProps> = ({}) => {
  return (
    <main className="container mx-auto px-4 py-8 sm:py-12 rounded-xl shadow-lg">
      <h1 className="mb-8">
        <Skeleton height={60} width={350} />
      </h1>
      <div className="flex flex-col gap-4">
        <div className="flex px-2 gap-2 sm:gap-5 items-center justify-start">
          <Skeleton height={40} width={400} />
          <div className="place-items-center">
            <Skeleton height={30} width={30} circle />
          </div>
          <div className=" place-items-center">
            <Skeleton height={30} width={30} circle />
          </div>
        </div>
        <div className="flex px-2 gap-2 sm:gap-5 items-center justify-center sm:justify-start">
          <Skeleton height={40} width={400} />
          <div className="place-items-center">
            <Skeleton height={30} width={30} circle />
          </div>
          <div className=" place-items-center">
            <Skeleton height={30} width={30} circle />
          </div>
        </div>
      </div>
    </main>
  );
};

export default loading;
