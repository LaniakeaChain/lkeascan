import { motion } from 'framer-motion';
import React from 'react';

import { BUTTON_GREY } from 'data/data-style';

export function SearchMobileUnderline() {
  return (
    <>
      <style>{`
        div.underline {
          position: absolute;
          left: 0;
          bottom: 0;
          height: 1px;
          width: 100%;
          background-color: ${BUTTON_GREY};
        }
      `}</style>
      <motion.div
        key="underline"
        className="underline"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ ease: 'linear', duration: 0.2 }}
      />
    </>
  );
}
