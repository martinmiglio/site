import { sourceLinkEvent } from "../GoogleAnalytics";

export default function SourceLink() {
  const sourceLinkStyle = {
    color: "slategray",
    fontSize: "10px",
    textDecoration: "none",
  };

  return (
    <div>
      <a
        style={sourceLinkStyle}
        href="https://github.com/marmig0404/portfolio/"
        id="bottom"
        onClick={() => sourceLinkEvent()}
      >
        {"View Source Code"}
      </a>
    </div>
  );
}
