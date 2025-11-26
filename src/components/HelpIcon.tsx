import { images } from "../constants";

function HelpIcon() {
  return (
  <button className="fixed bottom-5 right-5 z-50">
    <a href="https://jpa-frontend.vercel.app/" target="_blank">
      <img src={images.whatsappLogo} alt="WA logo" className="w-12" />
    </a>
  </button>  
  )
}

export default HelpIcon