type ContributionDay = {
  contributionCount: number;
  date: string;
};

type ContributionWeek = {
  contributionDays: ContributionDay[];
};

async function fetchContributions(): Promise<ContributionWeek[] | null> {
  const token = process.env.GITHUB_TOKEN;
  const username = process.env.GITHUB_USERNAME;
  if (!token || !username) return null;

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          query($login: String!) {
            user(login: $login) {
              contributionsCollection {
                contributionCalendar {
                  weeks {
                    contributionDays {
                      contributionCount
                      date
                    }
                  }
                }
              }
            }
          }
        `,
        variables: { login: username },
      }),
      next: { revalidate: 3600 },
    });

    if (!res.ok) return null;

    const data = await res.json();
    const weeks =
      data?.data?.user?.contributionsCollection?.contributionCalendar?.weeks;
    return Array.isArray(weeks) ? weeks : null;
  } catch {
    return null;
  }
}

function levelFromCount(count: number): number {
  if (count <= 0) return 0;
  if (count < 3) return 1;
  if (count < 6) return 2;
  if (count < 10) return 3;
  return 4;
}

const LEVEL_OPACITY = ["0.12", "0.35", "0.55", "0.75", "1"];

export default async function GithubWidget() {
  const weeks = await fetchContributions();

  return (
    <div
      className="grid gap-[3px]"
      style={{ gridTemplateColumns: `repeat(${weeks?.length ?? 26}, 1fr)` }}
    >
      {(weeks ?? Array.from({ length: 26 }, () => ({ contributionDays: Array.from({ length: 7 }, () => ({ contributionCount: 0, date: "" })) }))).map(
        (week, weekIndex) => (
          <div key={weekIndex} className="flex flex-col gap-[3px]">
            {week.contributionDays.map((day, dayIndex) => {
              const level = levelFromCount(day.contributionCount);
              return (
                <div
                  key={day.date || `${weekIndex}-${dayIndex}`}
                  className="h-[7px] w-[7px] rounded-[1px] bg-fg"
                  style={{ opacity: LEVEL_OPACITY[level] }}
                  title={day.date ? `${day.contributionCount} contributions on ${day.date}` : undefined}
                />
              );
            })}
          </div>
        ),
      )}
    </div>
  );
}
