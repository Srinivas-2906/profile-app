export const metadata = {
    title: "My App",
    description: "A Next.js app deployed on Railway",
  };
  
  export default function RootLayout({ children }) {
    return (
      <html lang="en">
        <body>{children}</body>
      </html>
    );
  }
  