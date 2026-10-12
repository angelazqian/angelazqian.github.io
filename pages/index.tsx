import { useState, useEffect } from 'react';
import { BsGithub, BsLinkedin } from 'react-icons/bs';
// import { FaEnvelope, FaArtstation} from 'react-icons/fa6';
import ConwayBackground from '../components/conwaybackground';
import { FaEnvelope} from 'react-icons/fa6';
import Link from 'next/link';

export default function Home() {
  const [terminalText, setTerminalText] = useState("home@angelazqian:~$ ");
  const [cursorVisible, setCursorVisible] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [showContent, setShowContent] = useState(true);
  const [elementsVisible, setElementsVisible] = useState({
    header: true,
    footer: true,
    pfp: true,
  });
  const [show404, setShow404] = useState(false);
  const [blinkingEnabled, setBlinkingEnabled] = useState(false);
  const [footerIconsVisible, setFooterIconsVisible] = useState([true, true, true, true]);
  const [webring, setWebring] = useState([true, true, true]);

  const [name, setName] = useState("angela qian");
  const [text1, setText1] = useState("I am a senior at Purdue University pursuing a double major in Computer Science and Mathematics.");
  const [text2, setText2] = useState("In my free time, you can catch me working on personal projects, going on long walks, playing rhythm games, or drawing.");
  const [text3, setText3] = useState("My resume can be found ");
  const [resume, setResume] = useState("here");

  const fullCommand = "home@angelazqian:~$ sudo rm -rf --no-preserve-root /";

  interface DisappearLettersParams {
    text: string;
    setText: React.Dispatch<React.SetStateAction<string>>;
    duration?: number;
  }

const disappearLetters = ({ text, setText, duration = 1500 }: DisappearLettersParams) => {
  const letters = text.split('');
  const indices = letters.map((_, i) => i).sort(() => Math.random() - 0.5);
  const currentChars = [...letters];

  const timings: number[] = [];
    let totalTime = 0;
    
    for (let i = 0; i < letters.length; i++) {
      const randomDelay = Math.pow(Math.random(), 4);
      timings.push(randomDelay);
      totalTime += randomDelay;
    }
    
    const scaleFactor = duration / totalTime;
    let cumulativeTime = 0;

    indices.forEach((index, step) => {
      cumulativeTime += timings[step] * scaleFactor;
      setTimeout(() => {
        currentChars[index] = '';
        setText(currentChars.join(''));
      }, cumulativeTime);
    });
};

  const handleTerminalClick = () => {
    if (isTyping || show404) return;
    
    setIsTyping(true);
    setBlinkingEnabled(true);
    setCursorVisible(true);
    
    let currentIndex = terminalText.length;
    const typingInterval = setInterval(() => {
      if (currentIndex < fullCommand.length) {
        setTerminalText(fullCommand.substring(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        
        setTimeout(() => {
          setTerminalText("home@angelazqian:~$ ");
          
          const disappearDuration = 1500;
          setTimeout(() => disappearLetters({ text: name, setText: setName, duration: disappearDuration}), 0);
          setTimeout(() => disappearLetters({ text: text1, setText: setText1, duration: disappearDuration}), 0);
          setTimeout(() => disappearLetters({ text: text2, setText: setText2, duration: disappearDuration}), 0);
          setTimeout(() => disappearLetters({ text: text3, setText: setText3, duration: disappearDuration}), 0);
          setTimeout(() => disappearLetters({ text: resume, setText: setResume, duration: disappearDuration}), 0);

          const iconIndices = [0, 1, 2, 3].sort(() => Math.random() - 0.5);
          const iconInterval = disappearDuration/4;
          iconIndices.forEach((iconIndex, step) => {
            setTimeout(() => {
              setFooterIconsVisible(prev => {
                const newVisible = [...prev];
                newVisible[iconIndex] = false;
                return newVisible;
              });
            }, step * iconInterval);
          });

          const webringIndices = [0, 1, 2].sort(() => Math.random() - 0.5);
          const webringInterval = disappearDuration/3;
          webringIndices.forEach((webringIndex, step) => {
            setTimeout(() => {
              setWebring(prev => {
                const newVisible = [...prev];
                newVisible[webringIndex] = false;
                return newVisible;
              });
            }, step * webringInterval);
          });

          setTimeout(() => setElementsVisible(prev => ({ ...prev, header: false })), disappearDuration + 100);
          setTimeout(() => setElementsVisible(prev => ({ ...prev, footer: false })), disappearDuration + 300);
          setTimeout(() => setElementsVisible(prev => ({ ...prev, pfp: false })), disappearDuration - 800);
          
          setTimeout(() => {
            setShowContent(false);
            setShow404(true);
          }, disappearDuration + 400);
        }, 2250);
      }
    }, 200);
  };

  useEffect(() => {
    if (!blinkingEnabled) return;
    
    const blinkInterval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 530);
    
    return () => clearInterval(blinkInterval);
  }, [blinkingEnabled]);

  useEffect(() => {
    const prevHtml = document.documentElement.style.overflow;
    const prevBody = document.body.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    return () => {
      document.documentElement.style.overflow = prevHtml;
      document.body.style.overflow = prevBody;
    };
  }, []);

  if (show404) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-9xl max-[650px]:text-7xl font-bold mb-4">404</h1>
          <p className="text-2xl max-[650px]:text-xl mb-2">Page Not Found</p>
          <p className="text-xl max-[650px]:text-base text-gray-200">The requested resource could not be found.</p>
          <p className="text-lg max-[650px]:text-sm text-gray-300 mt-1">Maybe you clicked something weird... </p>
          <p className="text-lg max-[650px]:text-sm text-gray-300">Try <span className="text-gray-300 cursor-pointer underline" onClick={() => window.location.reload()}>refreshing the page</span>?</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <ConwayBackground />
      <div className="fixed top-0 left-0 right-0 h-[60px] max-[650px]:h-[48px] bg-black z-10 flex items-center justify-between px-6 max-[650px]:px-3">
        <a 
          className="font-mono text-white no-underline cursor-pointer max-[650px]:text-xs max-[650px]:truncate max-[650px]:max-w-[55%]"
          onClick={handleTerminalClick}
        >
          {terminalText}
          <span className={cursorVisible ? 'opacity-100' : 'opacity-0'}>█</span>
        </a>
        <div className="flex gap-6 max-[650px]:gap-3 shrink-0">
          <Link href="/about-me" className="text-white no-underline hover:text-gray-300 transition-colors text-xl max-[650px]:text-sm">
            About Me
          </Link>
          <Link href="/projects" className="text-white no-underline hover:text-gray-300 transition-colors text-xl max-[650px]:text-sm">
            Projects
          </Link>
        </div>
      </div>
      
      {showContent && (
        <div className="App h-screen overflow-hidden">
          <header className='App-header'>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/jpswalsh/academicons@1/css/academicons.min.css" />
            <div className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-[56%] w-[650px] h-[375px] max-[650px]:w-[92vw] max-[650px]:h-auto max-[650px]:py-6 bg-[#000000] rounded-3xl flex items-center justify-center ${!elementsVisible.header ? 'hidden' : ''}`}>
              <div className="w-[600px] max-[650px]:w-[85vw] mr-[15px] max-[650px]:mr-0 mt-[10px] mx-auto text-left">
                <div className="flex items-center mb-[-10px] max-[650px]:mb-2">
                  <h1 className="font-bold text-7xl max-[650px]:text-4xl underline text-white" style={{ textDecorationColor: '#880000' }}>{name}</h1>
                  <img src="/pfp.jpg" className={`w-[140px] h-[140px] max-[650px]:w-[70px] max-[650px]:h-[70px] rounded-full object-cover relative top-[-20px] max-[650px]:top-0 ml-[30px] max-[650px]:ml-3 shrink-0 ${!elementsVisible.pfp ? 'hidden' : ''}`} alt="avatar"/>
                </div>
                <p className="text-lg max-[650px]:text-sm mb-[10px]">
                  {text1}
                </p>
                <p className="text-lg max-[650px]:text-sm mb-[10px]">
                  {text2}
                </p>
                <p className="text-lg max-[650px]:text-sm">
                  {text3}
                  {text3.length > 0 && (
                    <>
                      <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                        {resume}
                      </a>.
                    </>
                  )}
                </p>
              </div>
            </div>
          </header>

          <footer className="App-footer">
            <div className={`fixed bottom-28 max-[650px]:bottom-24 justify-center flex gap-4 items-center mt-[10px] text-2xl max-[650px]:text-lg font-mono ${!elementsVisible.footer ? 'hidden' : ''}`}>
              <a href="https://ring.purduehackers.com/previous" className={`text-white no-underline hover:text-gray-300 transition-colors ${!webring[0] ? 'hidden' : ''}`}>
                {'< '}
              </a>
              <a href="https://ring.purduehackers.com/" className={`text-white no-underline hover:text-gray-300 transition-colors ${!webring[1] ? 'hidden' : ''}`}>
                <img src="/phacker.svg" alt="Purdue Hackers webring" className="h-10 max-[650px]:h-7 inline-block" />
              </a>
              <a href="https://ring.purduehackers.com/next" className={`text-white no-underline hover:text-gray-300 transition-colors ${!webring[2] ? 'hidden' : ''}`}>
                {' >'}
              </a>
            </div>
            
            <div className={`fixed bottom-10 max-[650px]:bottom-8 flex gap-10 max-[650px]:gap-6 justify-center items-center mt-[10px] max-[650px]:scale-75 max-[650px]:origin-bottom ${!elementsVisible.footer ? 'hidden' : ''}`}>
              <a 
                href="https://github.com/angelazqian" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={`text-inherit transition-all duration-300 hover:scale-125 ${!footerIconsVisible[0] ? 'hidden' : ''}`}
              >
                <BsGithub size={50} />
              </a>
              <a 
                href="https://www.linkedin.com/in/angelazqian/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={`text-inherit transition-all duration-300 hover:scale-125 ${!footerIconsVisible[1] ? 'hidden' : ''}`}
              >
                <BsLinkedin size={50} />
              </a>
              <a 
                href="mailto:qian220@purdue.edu" 
                className={`text-inherit transition-all duration-300 hover:scale-125 ${!footerIconsVisible[2] ? 'hidden' : ''}`}
              >
                <FaEnvelope size={50} />
              </a>
              <a 
                href="https://scholar.google.com/citations?user=N9x8yXoAAAAJ&hl=en" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={`text-inherit transition-all duration-300 hover:scale-125 ${!footerIconsVisible[3] ? 'hidden' : ''}`}
              >
                <i className="ai ai-google-scholar text-[55px] inline-block align-middle leading-none" style={{ transform: "translateX(-10px) translateY(-1px)" }}></i>
              </a>
            </div>
          </footer>
        </div>
      )}
    </>
  );
}