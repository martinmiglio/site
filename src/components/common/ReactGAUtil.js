import ReactGA from "react-ga";

export function reactGAPageChange(page) {
  ReactGA.pageview(window.location.pathname + window.location.search);
  const devQuery = "?utm_source=dev&utm_medium=dev";
  if (
    window.location.href.split("/").pop() !== devQuery &&
    (!process.env.NODE_ENV || process.env.NODE_ENV === "development")
  ) {
    window.location.href = page + devQuery;
  }
}
