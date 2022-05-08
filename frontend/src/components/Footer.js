import React from 'react';

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer section page__footer">
      <p className="footer__copyright">©&nbsp;{currentYear}&nbsp;Mesto&nbsp;Russia</p>
    </footer>
  );
}

export default Footer;
