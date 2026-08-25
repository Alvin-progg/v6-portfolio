import Column from "@/app/components/Column";
import SectionBlock from "@/app/components/SectionBlock";
import ListItem from "@/app/components/ListItem";

// TEMP: foundation + primitives verification scaffold.
// The content-components session replaces this with the real page composition
// (see plan.md item 4: Header → Intro → Notes → Projects → … → Contact).
export default function Home() {
  return (
    <Column>
      <SectionBlock label="projects" viewAllHref="#">
        <ListItem
          title="Colorfall"
          description="An online party game I designed, built, and launched to 68 players, with real-time multiplayer, bots, rooms, and a physics-based slingshot loop."
          href="#"
        />
        <ListItem
          title="Crystal"
          description="An experiment in giving a company one shared institutional brain through memory, retrieval, and graph-based context."
          href="#"
        />
      </SectionBlock>
    </Column>
  );
}
