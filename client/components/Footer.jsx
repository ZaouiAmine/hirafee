const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="py-4 p-2 border-t">
      <div className=" text-center">
        <p>&copy; {currentYear} Hirafee</p>
      </div>
    </footer>
  );
};
export default Footer;
