import type { ReactNode } from "react";

// The single centered content column every section lives in.
// max-w-lg == 512px (see DESIGN.md); generous vertical padding gives the
// sections their breathing room.
export default function Column({ children }: { children: ReactNode }) {
  return <div className="mx-auto max-w-lg px-6 py-20">{children}</div>;
}
