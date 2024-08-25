// components/ProtectedPage.tsx
'use client';

import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const ProtectedPage = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && (!user || !user.publicMetadata?.isAdmin)) {
      router.push('/sm'); // Redirige vers la page d'accueil si l'utilisateur n'est pas autorisé
    }
  }, [isLoaded, user, router]);

  if (!isLoaded || (user && !user.publicMetadata?.isAdmin)) {
    return <div>Loading...</div>; // Affiche un message de chargement pendant la vérification
  }

  return <>{children}</>;
};

export default ProtectedPage;
