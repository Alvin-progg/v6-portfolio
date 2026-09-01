import SectionBlock from "@/app/components/SectionBlock";
import ListItem from "@/app/components/ListItem";

type Role = {
  title: string;
  company: string;
  description: string;
  dates?: string;
};

export default function Experience({ roles }: { roles: Role[] }) {
  return (
    <SectionBlock label="experience">
      {roles.map((role) => (
        <ListItem
          key={`${role.title}-${role.company}`}
          title={`${role.title} @ ${role.company}`}
          description={role.description}
          meta={role.dates}
        />
      ))}
    </SectionBlock>
  );
}
