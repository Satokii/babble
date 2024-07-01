import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const loading = () => {
  return (
    <div className="flex-1 justify-between flex flex-col h-full max-h-[calc(100vh-6rem)]">
      <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
        <div className="relative flex items-center space-x-4">
          <div className="relative">
            <div className="relative w-8 sm:w-12 h-8 sm:h-12">
              <Skeleton circle height={50} width={50} />
            </div>
          </div>
          <div className="flex flex-col leading-tight gap-0.5">
            <div className="flex items-center">
              <span className="mr-3">
                <Skeleton height={25} width={120} />
              </span>
            </div>
            <span>
              <Skeleton height={20} width={160} />
            </span>
          </div>
        </div>
      </div>
      <div className="flex h-full flex-1 flex-col-reverse gap-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
        <Skeleton height={1000} />
      </div>
      <div className="border-t border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
        <div className="relative flex-1 overflow-hidden rounded-lg">
          <Skeleton height={100} />
        </div>
      </div>
    </div>
  );
};

export default loading;
