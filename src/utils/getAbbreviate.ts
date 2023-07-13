export function abbreviateName(fullName: string) {
  const splitted = fullName.split(" ");

  return {
    abbreviate: fullName.slice(0, 1),
    firstName: splitted[0],
  };
}
