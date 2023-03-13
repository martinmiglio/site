export default function Landing({ header, signature, logo }) {
  const wrapperStyle = {
    textAlign: "center",
  };

  const headerStyle = {
    minHeight: "30vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "calc(8px + 2vmin)",
    color: "white",
  };

  const signatureStyle = {
    color: "#a6fff2",
    textAlign: "right",
  };

  return (
    <div style={wrapperStyle}>
      <header style={headerStyle}>
        <h1>{header}</h1>
        <p style={signatureStyle}>{signature}</p>
      </header>
    </div>
  );
}
