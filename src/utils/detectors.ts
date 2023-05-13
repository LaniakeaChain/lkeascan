// Ios / Safari
export const isSafariMobile = () => {
  if (navigator) {
    return /iP(ad|hone|od).+Version\/[\d.]+.*Safari/i.test(navigator.userAgent);
  } else {
    return false;
  }
};
