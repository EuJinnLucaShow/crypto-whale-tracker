export const wrapAsync = (fn: () => Promise<void>) => {
  return () => {
    void fn().catch((err) => {
      console.error("Floating promise rejected:", err);
    });
  };
};
