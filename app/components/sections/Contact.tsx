import SectionBlock from "@/app/components/SectionBlock";
import CopyButton from "@/app/components/CopyButton";

type Social = {
  label: string;
  href: string;
};

type ContactProps = {
  blurb: string;
  email: string;
  socials: Social[];
};

export default function Contact({ blurb, email, socials }: ContactProps) {
  return (
    <SectionBlock label="say hi">
      <p className="text-muted">{blurb}</p>
      <div className="space-y-2">
        <div className="flex items-baseline gap-4">
          <span className="w-20 shrink-0 text-dim">email</span>
          <a
            href={`mailto:${email}`}
            className="text-fg transition-colors hover:text-muted"
          >
            {email}
          </a>
          <CopyButton value={email} />
        </div>
        <div className="flex items-baseline gap-4">
          <span className="w-20 shrink-0 text-dim">elsewhere</span>
          <span className="text-fg">
            {socials.map((social, i) => (
              <span key={social.label}>
                {i > 0 && <span className="text-dim"> · </span>}
                <a
                  href={social.href}
                  className="transition-colors hover:text-muted"
                >
                  {social.label}
                </a>
              </span>
            ))}
          </span>
        </div>
      </div>
    </SectionBlock>
  );
}
