import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-regular-svg-icons";
import { faSun } from "@fortawesome/free-regular-svg-icons";
export default function DarkLightButton({ toggleDark, dark }) {
  return (
    <div>
      <button className="dark-light-btn" onClick={toggleDark}>
        {dark ? (
          <FontAwesomeIcon icon={faMoon} color="#f1f3f5" />
        ) : (
          <FontAwesomeIcon icon={faSun} color="#343a40" />
        )}
      </button>
    </div>
  );
}
