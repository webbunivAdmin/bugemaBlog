import { Link } from "react-router-dom";
import { BorderBeam } from "../ui/border-beam";

const Logo = ({ type }) => {
  return (
    <div className=''>
      {/* <Link
        to='/'
        className={`text-2xl font-semibold dark:text-white ${
          type && "text-white  text-4xl"
        }`}
      >
        Blog
        <span
          className={`text-3xl text-rose-500 ${type && " text-5xl font-bold"}`}
        >
          Wave
        </span>
      </Link> */}
      <Link to='/' className="flex items-center">
        <img
          src="/images/bu-logo.png" // Replace with the actual path to your logo
          alt="Bugema University Blog"
          className={`h-20 ${type && "h-22"}`} // Adjust height dynamically if needed
        />
        <BorderBeam />
      </Link>
    </div>
  );
};

export default Logo;
