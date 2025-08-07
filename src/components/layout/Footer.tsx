const Footer = () => {
  return (
    <footer id="footer" className="min-h-[50vh] md:min-h-[40vh] bg-secondary text-secondary-foreground flex items-center" aria-label="Footer">
      <div className="container mx-auto px-6 md:px-8 w-full">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h4 className="text-2xl font-semibold mb-2">LMS Instruction</h4>
            <p className="text-muted-foreground">Modern learning experiences that inspire.</p>
          </div>
          <nav className="flex gap-6 text-sm">
            <a href="#home" className="story-link">Home</a>
            <a href="#features" className="story-link">Features</a>
            <a href="#videos" className="story-link">Videos</a>
            <a href="#about" className="story-link">About</a>
          </nav>
        </div>
        <div className="mt-8 text-sm text-muted-foreground">© {new Date().getFullYear()} LMS Instruction. All rights reserved.</div>
      </div>
    </footer>
  );
};

export default Footer;
