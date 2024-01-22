type Props = { children: React.ReactNode };

export function ListRoot({ children }: Props) {
  return <ul className="flex flex-col gap-y-2">{children}</ul>;
}
