const LastBanner = () => {
  return (
    <div className="relative">
      <img
        src="images\lastbanner.png"
        alt=""
        className="object-cover w-full h-full"
        style={{ filter: "brightness(0.7)" }}
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="flex">
          {" "}
          <h1 className="text-white text-3xl font-bold text-center">
            Find Your Dream Job Today
          </h1>
        </div>
        <div className="flex mt-4">
          <button
            className="bg-blue-500 text-white py-2 px-8  md:rounded-s-none rounded"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default LastBanner;
