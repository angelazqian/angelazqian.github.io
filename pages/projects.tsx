import Link from "next/link";

export default function Projects() {
  return (
    <div style={{ maxWidth: "600px", margin: "2rem auto", fontFamily: "sans-serif" }}>
      <h1 className="text-white text-7xl font-bold mb-[20px] mt-[120px] underline" style={{ textDecorationColor: '#880000' }}>projects</h1>
      <ul className="text-3xl text-white">
        <li>
          <Link href="/">My website!</Link>
        </li>
        <li>
          <Link href="/2048-AI">2048 AI Player</Link>
        </li>
        <li>
          <Link href="/eyesore">Eyesore</Link>
        </li>
        <li>
          <Link href="/EasyMode-2048">Easy Mode 2048</Link>
        </li>
        <li>
          ScribbleScore
        </li>
        <li>
          Facial Recognition Door Lock
        </li>
      </ul>
      <Link href="/">
        Back to home
      </Link>
    </div>
  );
}