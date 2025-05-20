"use client";

const Footer2 = () => {
  return (
    <footer className="bg-primary/70 py-4">
      <div className="max-w-7xl mx-auto px-4 text-right text-white">
        <p className="text-sm">
          © {new Date().getFullYear()} Talentra Limited
        </p>
      </div>
    </footer>
  );
};

export default Footer2;
