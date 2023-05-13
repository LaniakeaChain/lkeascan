import { defined } from './variable-evaluation';

export function bodyScroll(): number {
  if (defined(window) && defined(window.pageYOffset)) {
    //most browsers except IE before #9
    return window.pageYOffset;
  } else {
    const B = document.body; //IE 'quirks'
    let D = document.documentElement; //IE with doctype
    D = D.clientHeight ? D : B;
    return D.scrollTop;
  }
}
