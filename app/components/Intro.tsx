export default function Intro() {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-[0.98rem] leading-[1.5] text-muted">
        Lorem ipsum dolor sit amet, consectetur{" "}
        <span className="font-semibold text-fg">adipiscing elit</span>, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </p>
      <p className="text-[0.98rem] leading-[1.5] text-muted">
        Ut enim ad minim veniam, quis{" "}
        <span className="font-semibold text-fg">nostrud exercitation</span>{" "}
        ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </p>
      <p className="text-[0.98rem] leading-[1.5] text-muted">
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
        dolore eu fugiat nulla pariatur.
      </p>
    </div>
  );
}
