import Link from "next/link";

export default function Home() {
  return (
    <div className="App">
      <header className='App-header'>
        <div className="max-w-[600px] mx-auto text-left">
          <div className="flex items-center mb-[-10px]">
            <h1 className="font-bold text-7xl underline" style={{ textDecorationColor: '#880000' }} >angela qian</h1>
            <img src="https://avatars.githubusercontent.com/u/107577606" className="w-[140px] h-[140px] rounded-full object-cover relative top-[-20px] ml-[30px] "/>
          </div>
          <p className="text-xl mb-[10px] ">I am a sophomore at Purdue University pursuing a major in Computer Science and a minor in Mathematics. </p>
          <p className="text-xl">In my free time, you can catch me drawing, reading, or playing piano.</p>
        </div>
        <Link href="/projects" style={{ color: 'blue', textDecoration: 'underline' }}>
          See my projects
        </Link>
      </header>
    </div>
  );
}
