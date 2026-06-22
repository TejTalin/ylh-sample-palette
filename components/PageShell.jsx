import CommandPalette from './CommandPalette';
import GridPaper from './GridPaper';
import Footer from './Footer';

export default function PageShell({ children }) {
  return (
    <>
      <GridPaper />
      <CommandPalette />
      <main>
        <div className="container" style={{ paddingTop: '48px', paddingBottom: '90px' }}>
          {children}
        </div>
        <Footer />
      </main>
    </>
  );
}
