// components/ProtectedPage.tsx
'use client';

import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const ProtectedPagesm = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && (!user || user.publicMetadata?.studentTypesm !== 'sm')) {
      router.push('/sm'); // Redirects to the home page if the user is not authorized
    }
  }, [isLoaded, user, router]);

  if (!isLoaded || (user && user.publicMetadata?.studentTypesm !== 'sm')) {
    return <div>Loading...</div>; // Displays a loading message during verification
  }

  return <>{children}</>;
};

export default ProtectedPagesm;
