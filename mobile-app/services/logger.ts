export const Log = {
  i: (message: string) => console.log("INFO | " + message),
  w: (message: string) => console.log("WARN | " + message),
  e: (message: string) => console.log("ERROR | " + message),
  pretty: (obj: any) => console.log(JSON.stringify(obj, null, 2)),
};
