// src/components/Footer.jsx
function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} </p>
      </div>
    </footer>
  );
}

export default Footer;