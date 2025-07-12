import Link from "next/link";

export default function Projects() {
  return (
    <div style={{ maxWidth: "600px", margin: "2rem auto", fontFamily: "sans-serif" }}>
      <h1>Projects</h1>
      <p>Here&apos;s a list of some things I&apos;ve built.</p>
      <ul>
        <li>Project One</li>
        <li>Project Two</li>
      </ul>
      <Link href="/" style={{ color: "blue", textDecoration: "underline" }}>
        Back to home
      </Link>
    </div>
  );
}