import { images } from "../constants";

function HelpIcon() {
  return (
  <button className="fixed bottom-5 right-5 ">
    <a href="https://jpa-frontend.vercel.app/">
      <img src={images.whatsappLogo} alt="WA logo" className="w-12" />
    </a>
  </button>  
  )
}

export default HelpIcon