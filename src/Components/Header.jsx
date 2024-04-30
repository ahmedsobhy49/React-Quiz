import DarkLightButton from "./DarkLightButton";

function Header({ toggleDark, dark }) {
  return (
    <header className="app-header">
      <img src="logo512.png" alt="React logo" />
      <h1>The React Quiz</h1>
      <DarkLightButton toggleDark={toggleDark} dark={dark} />
    </header>
  );
}

export default Header;
