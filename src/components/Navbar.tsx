import { type ReactElement } from "react";

export default function Navbar(): ReactElement {
  return (
    <>
      <nav className="sticky text-accent-content top-0 w-full h-12 bg-base-100 flex items-center justify-between py-2 px-4 gap-2 text-xl z-30">
        <div className="select-none flex items-center gap-2">
          <img className="w-12 h-12" src="logo.svg" />
          <h1 className="text-lg text-base-content font-bold uppercase">
            Squash
          </h1>
        </div>
        <div className="items-center flex gap-2">
          <details className="dropdown">
            <summary className="btn btn-ghost text-base-content">
              Themes
            </summary>
            <ul className="menu dropdown-content bg-base-200 p-2">
              <li>
                <input
                  type="radio"
                  name="theme-dropdown"
                  className="theme-controller btn btn-ghost justify-start text-base-content"
                  aria-label="Winter"
                  value="winter"
                />
              </li>
              <li>
                <input
                  type="radio"
                  name="theme-dropdown"
                  className="theme-controller btn btn-ghost justify-start text-base-content"
                  aria-label="Dracula"
                  value="dracula"
                />
              </li>
              <li>
                <input
                  type="radio"
                  name="theme-dropdown"
                  className="theme-controller btn btn-ghost justify-start text-base-content"
                  aria-label="Iceberg"
                  value="iceberg"
                  defaultChecked
                />
              </li>
            </ul>
          </details>
        </div>
      </nav>
    </>
  );
}
