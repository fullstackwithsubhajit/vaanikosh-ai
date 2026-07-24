import Hero from "@/components/layout/Hero";
import Navbar from "@/components/layout/Navbar";
import Image from "next/image";
import ConversationFeed from "@/components/conversation/ConversationFeed";

const demoMessages = [
  {
    id: 1,
    type: "assistant",
    message: "Hello! I'm VaaniKosh. How can I help you today?",
  },
];
export default function Home() {
  return (
   <>
   
   <Navbar/>
   <Hero/>
   <ConversationFeed messages={demoMessages} />
   </>
  );
}
