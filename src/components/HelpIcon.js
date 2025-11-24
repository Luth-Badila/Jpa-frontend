import { jsx as _jsx } from "react/jsx-runtime";
import { images } from "../constants";
function HelpIcon() {
    return (_jsx("button", { className: "fixed bottom-5 right-5 ", children: _jsx("a", { href: "https://jpa-frontend.vercel.app/", children: _jsx("img", { src: images.whatsappLogo, alt: "WA logo", className: "w-12" }) }) }));
}
export default HelpIcon;
