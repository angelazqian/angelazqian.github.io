import Link from "next/link";

export default function Projects() {
  return (
    <div style={{ maxWidth: "600px", margin: "2rem auto", fontFamily: "sans-serif" }}>
      <h1>Projects</h1>
      <p>Here&apos;s a list of some things I&apos;ve made</p>
      <ul>
        <li>2048 AI Player</li>
        <li>Eyesore</li>
        <li>Easy Mode 2048</li>
        <li>ScribbleScore</li>
        <li>Facial Recognition Door Lock</li>
      </ul>
      <Link href="/" style={{ color: "blue", textDecoration: "underline" }}>
        Back to home
      </Link>
    </div>
  );
}