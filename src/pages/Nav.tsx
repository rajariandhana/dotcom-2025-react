import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const tabs = [
    {'name':'Home','to':'/'},
    {'name':'Projects','to':'/projects'},
    {'name':'Experience','to':'/experience'},
    {'name':'Gallery','to':'/gallery'},
];

const Nav = () => {
  const location = useLocation();
  const [selected, setSelected] = useState(tabs[0].name);

  useEffect(()=>{
    const currentTab = tabs.find(tab=> tab.to===location.pathname);
    if(currentTab){
        setSelected(currentTab.name);
    }
  },[location.pathname])
  return (
    //replace absolute with fixed, it makes it sticky but create a bug (scrol down then pick another tab)
    <nav className="flex justify-center items-center absolute top-0 left-1/2 transform -translate-x-1/2 mt-8 z-10">
        <div className="w-fit bg-indigo-950 p-1 flex gap-0 md:gap-4 text-sm md:text-lg rounded-full shadow-lg">
            {tabs.map((tab) => (
                <NavTab
                name={tab.name}
                to={tab.to}
                selected={selected === tab.name}
                setSelected={setSelected}
                key={tab.name}
                />
            ))}
            {/* <svg className="size-8 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M6 12h.01m6 0h.01m5.99 0h.01"/>
            </svg> */}
      </div>
    </nav>
  );
};

const NavTab = ({
  name,
  to,
  selected,
  setSelected,
}: {
  name: string;
  to: string;
  selected: boolean;
  setSelected: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <Link
    to={to}
      onClick={() => setSelected(name)}
      className={`${
        selected
          ? "text-white"
          : "text-slate-300 hover:text-slate-200 hover:bg-gray-800"
      } transition-colors px-4 py-1 rounded-full relative`}
    >
      <span className="relative z-10">{name}</span>
      {selected && (
        <motion.span
          layoutId="pill-tab"
          transition={{ type: "spring", duration: 0.5 }}
          className="absolute inset-0 z-0 bg-gradient-to-r from-indigo-500 to-rose-500 rounded-full"
        ></motion.span>
      )}
    </Link>
  );
};

export default Nav;