export function defaultGetter(): RequestInit {
  const options: any = {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  };

  return options;
}
