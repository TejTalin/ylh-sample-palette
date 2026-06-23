import CommandPalette from './CommandPalette';
import GridPaper from './GridPaper';
import Footer from './Footer';

export default function PageShell({ children }) {
  return (
    <div className="page-root">
      <GridPaper />
      <CommandPalette />
      <main className="page-main">
        <div className="container" style={{ paddingTop: '48px', paddingBottom: '90px' }}>
          {children}
        </div>
        <Footer />
      </main>

      <style>{`
        .page-root { position: relative; min-height: 100vh; }
        .page-main { position: relative; z-index: 1; }
      `}</style>
    </div>
  );
}
