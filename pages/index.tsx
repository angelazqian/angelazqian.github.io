import Link from 'next/link';
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function Home() {
  return (
    <div className="App">
      <header className='App-header'>
        <div className="max-w-[600px] space-y-[10px] mx-auto text-left">
          <div className="flex items-center">
          <h1 className="text-7xl font-bold relative inline-block custom-underline">angela qian</h1>
          <img src="https://avatars.githubusercontent.com/u/107577606" className="w-40 h-40 rounded-full object-cover relative top-[-25px] ml-12 "/>
          </div>
          <p className="text-2xl">I am a sophomore at Purdue University pursuing a major in Computer Science and a minor in Mathematics. </p>
          <p className="text-2xl">In my free time, you can catch me drawing, reading, or playing piano.</p>
        </div>
        <Link legacyBehavior href="/projects">
          <a style={{ color: 'blue', textDecoration: 'underline' }}>See my projects</a>
        </Link>
      </header>
    </div>
  );
}
