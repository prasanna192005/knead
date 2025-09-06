import localFont from "next/font/local";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
const satoshi = localFont({
  src: [
    {
      path: "../public/fonts/Satoshi-Variable.ttf",
      weight: "100 900",
      style: "normal",
    },
    {
      path: "../public/fonts/Satoshi-VariableItalic.ttf",
      weight: "100 900",
      style: "italic",
    },
  ],
  variable: "--font-satoshi",
});
export default function FAQ() {
    return (
        
      <div className="mt-32 mx-20">
        <h1 className={`${satoshi.className} text-2xl text-center text-yellow-900`}>Your Doubts</h1>
        <h1 className={`${satoshi.className} text-6xl text-center mt-4`}>FAQs</h1>

        <Accordion type="single" collapsible className="mt-8 max-w-4xl mx-auto">
          <AccordionItem value="item-1">
            <AccordionTrigger className={`${satoshi.className} text-xl md:text-2xl`}>
              How can an AI therapist help me?
            </AccordionTrigger>
            <AccordionContent className={`${satoshi.className} text-lg md:text-xl`}>
              Our AI therapist provides emotional support, coping strategies, and guidance, personalized to your mental health needs.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger className={`${satoshi.className} text-xl md:text-2xl`}>
              Is it safe to share personal thoughts with AI?
            </AccordionTrigger>
            <AccordionContent className={`${satoshi.className} text-lg md:text-xl`}>
              Yes. Your conversations are confidential and encrypted. We do not share your data with third parties.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger className={`${satoshi.className} text-xl md:text-2xl`}>
              Can it replace a human therapist?
            </AccordionTrigger>
            <AccordionContent className={`${satoshi.className} text-lg md:text-xl`}>
              No. AI is meant to supplement support, not replace professional mental health care when needed.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger className={`${satoshi.className} text-xl md:text-2xl`}>
              How do I get started with the AI therapist?
            </AccordionTrigger>
            <AccordionContent className={`${satoshi.className} text-lg md:text-xl`}>
              Simply sign up on our platform, answer a few questions, and start interacting with your personal AI companion.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5">
            <AccordionTrigger className={`${satoshi.className} text-xl md:text-2xl`}>
              Can it help with stress and anxiety?
            </AccordionTrigger>
            <AccordionContent className={`${satoshi.className} text-lg md:text-xl`}>
              Absolutely. The AI can guide you through stress management exercises, mindfulness practices, and emotional coping techniques.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    )
}