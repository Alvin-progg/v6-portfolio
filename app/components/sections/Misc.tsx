import SectionBlock from "@/app/components/SectionBlock";
import ListItem from "@/app/components/ListItem";

type MiscItem = {
  title: string;
  description: string;
  href?: string;
};

export default function Misc({ items }: { items: MiscItem[] }) {
  return (
    <SectionBlock label="misc" viewAllHref="#">
      {items.map((item) => (
        <ListItem
          key={item.title}
          title={item.title}
          href={item.href}
          description={item.description}
        />
      ))}
    </SectionBlock>
  );
}
