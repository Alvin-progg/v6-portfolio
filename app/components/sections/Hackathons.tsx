import SectionBlock from "@/app/components/SectionBlock";
import ListItem from "@/app/components/ListItem";

type HackathonEvent = {
  title: string;
  description: string;
};

export default function Hackathons({ events }: { events: HackathonEvent[] }) {
  return (
    <SectionBlock label="hackathons">
      {events.map((event) => (
        <ListItem
          key={event.title}
          title={event.title}
          description={event.description}
        />
      ))}
    </SectionBlock>
  );
}
