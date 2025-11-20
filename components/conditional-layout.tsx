'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/header';
import Footer from '@/components/footer';
import WhatsAppButton from '@/components/whatsapp-button';

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  return (
    <>
      {!isAdminRoute && (
        <>
          <div className="fixed inset-0 z-[-1]">
            <video
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              poster="/videoframe_0.png"
            >
              <source src="/background.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 bg-black/30 pointer-events-none"></div>
          </div>
        </>
      )}
      <div className="flex min-h-screen flex-col">
        {!isAdminRoute && <Header />}
        <main className="flex-1">{children}</main>
        {!isAdminRoute && (
          <>
            <WhatsAppButton />
            <Footer />
          </>
        )}
      </div>
    </>
  );
}

