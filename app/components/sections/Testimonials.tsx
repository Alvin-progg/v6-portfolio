import SectionBlock from "@/app/components/SectionBlock";

type Quote = {
  quote: string;
  name: string;
  role: string;
};

export default function Testimonials({ quotes }: { quotes: Quote[] }) {
  return (
    <SectionBlock label="testimonials">
      {quotes.map((item) => (
        <div key={item.name}>
          <p>
            <span className="font-semibold text-fg">{item.name}</span>{" "}
            <span className="text-muted">{item.role}</span>
          </p>
          <p className="mt-1 text-muted">&ldquo;{item.quote}&rdquo;</p>
        </div>
      ))}
    </SectionBlock>
  );
}
