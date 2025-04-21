import Form from "next/form";

const HeaderSeachBar = () => {
  return (
    <Form action="/search">
      <div className="relative">
        
        <div className="absolute inset-y-0 left-0 pl-2 flex text-gray-500 items-center pointer-event-none">
          <svg
            viewBox="0 0 512 512"
            width="1em"
            height="1em"
            className="w-4 h-4"
          >
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M469.297 439.13L347.982 317.816C370.466 288.907 384 252.707 384 213.334c0-94.104-76.562-170.667-170.666-170.667S42.667 119.23 42.667 213.334S119.23 384 213.334 384c39.373 0 75.573-13.534 104.481-36.018l121.316 121.315zm-255.963-97.796c-70.584 0-128-57.417-128-128c0-70.584 57.416-128 128-128c70.583 0 128 57.416 128 128c0 70.583-57.417 128-128 128"
            ></path>
          </svg>
        
        </div>
        <input
          type="text"
          name="query"
          placeholder="Search..."
          className="w-32 pl-8 pr-2 py-1 text-sm border border-gray-200 rounded-md focus:ring-1 focus:ring-black focus:border-transparent transition-all duration-300"
        />
      </div>
    </Form>
  );
};

export default HeaderSeachBar;
