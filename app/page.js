import Hero from "@/components/layout/Hero";
import Navbar from "@/components/layout/Navbar";
import Image from "next/image";
import ConversationFeed from "@/components/conversation/ConversationFeed";

const demoConversation = [
  {
    id: 1,
    type: "user",
    data: {
      text: "Send ₹500 to Rahul",
      time: "10:24 AM",
    },
  },
  {
    id: 2,
    type: "assistant",
    data: {
      text: "I found Rahul Sharma. Please review the transaction before continuing.",
      time: "10:24 AM",
    },
  },
  {
  id:3,
  type:"summary",
  data:{
    recipient:"Rahul Sharma",
    amount:500,
    bank:"HDFC Bank",
    note:"Dinner"
  }
},
{
  id: 4,
  type: "risk",
  data: {
    score: 12,

    checks: [
      "Known recipient",
      "Amount matches previous payments",
      "Trusted device detected",
      "Location verified"
    ]
  }
},
{
    id:5,
    type:"authentication",
    data:{
        amount:500,
        method:"UPI PIN"
    }
}
];
export default function Home() {
  return (
   <>
   
   <Navbar/>
   <Hero/>
  <ConversationFeed conversation={demoConversation} />
   </>
  );
}
