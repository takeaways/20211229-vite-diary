export const refExistCheckHeler = <T extends HTMLElement>(...elements: React.RefObject<T>[]) => {
  const isNotExit = elements.some((element) => element.current === null);
  if (isNotExit) {
    throw new Error("Should Connect Ref");
  }
  return true;
};
