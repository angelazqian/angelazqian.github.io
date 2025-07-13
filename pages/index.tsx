import { BsGithub, BsLinkedin } from 'react-icons/bs';
import { FaEnvelope, FaArtstation} from 'react-icons/fa6';


export default function Home() {
  return (
    <div className="App h-screen overflow-hidden">
      <header className='App-header -mt-[30px]'>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/jpswalsh/academicons@1/css/academicons.min.css" />
        <div className="w-[650px] h-[350px] bg-black rounded-3xl mx-auto flex items-center justify-center">
          <div className="w-[600px] mr-[15px] mt-[10px] mx-auto text-left">
            <div className="flex items-center mb-[-10px]">
              <h1 className="font-bold text-7xl underline text-white" style={{ textDecorationColor: '#880000' }} >angela qian</h1>
              <img src="https://avatars.githubusercontent.com/u/107577606" className="w-[140px] h-[140px] rounded-full object-cover relative top-[-20px] ml-[30px]" alt="avatar"/>
            </div>
            <p className="text-lg mb-[10px]">I am a junior at Purdue University pursuing a major in Computer Science and a minor in Mathematics. </p>
            <p className="text-lg mb-[10px]">In my free time, you can catch me drawing, reading, or playing piano.</p>
            <p className="text-lg">My resume can be found {' '}
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                  here</a>.
            </p>
          </div>
        </div>
      </header>

      <footer className="App-footer">
        <div className="absolute bottom-10 flex gap-10 justify-center items-center mt-[10px]">
          <a href="https://github.com/angelazqian" target="_blank" rel="noopener noreferrer" className="text-inherit">
              <BsGithub />
          </a>
          <a href="https://www.linkedin.com/in/angelazqian/" target="_blank" rel="noopener noreferrer" className="text-inherit">
              <BsLinkedin />
          </a>
          <a href="mailto:qian220@purdue.edu" className="text-inherit">
              <FaEnvelope />
          </a>
          <a href="https://scholar.google.com/citations?user=N9x8yXoAAAAJ&hl=en" target="_blank" rel="noopener noreferrer" className="text-inherit">
              <i className="ai ai-google-scholar text-[55px] inline-block align-middle mr-[-10px] leading-none" ></i>
          </a>
          <a href="https://toaster_drips.artstation.com/" target="_blank" rel="noopener noreferrer" className="text-inherit">
              <FaArtstation />
          </a>
        </div>
      </footer>
    </div>
  );
}
