import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/NavBar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
         <NavBar />
        <div className="container mt-4">
          {children}
        </div>
      </body>
    </html>
  );
}
