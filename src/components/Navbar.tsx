import { type ReactElement } from "react";
import { PiPanorama } from "react-icons/pi";

export default function Navbar(): ReactElement {
  return (
    <>
      <nav className="sticky text-accent-content top-0 w-full h-12 bg-accent flex items-center py-2 px-4 gap-2 text-xl z-30">
        <PiPanorama />
        <p className="font-semibold">Squash</p>
      </nav>
    </>
  );
}
