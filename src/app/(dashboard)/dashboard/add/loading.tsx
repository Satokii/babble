import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const loading = () => {
  return (
    <main className="container mx-auto px-4 py-8 sm:py-12 rounded-xl shadow-lg">
      <h1>
        <Skeleton className="mb-4" height={60} width={250} />
      </h1>
      <form className="max-w-sm w-full mx-auto p-6 bg-white border border-gray-300 shadow-md rounded-lg">
        <div>
          <Skeleton height={25} width={150} />
        </div>
        <div className="mt-4">
          <Skeleton height={40} width={330} />
        </div>
      </form>
    </main>
  );
};

export default loading;
