import { useEffect, useState } from 'react';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';

export const useGetCalls = () => {
  const client = useStreamVideoClient(); // Initialisation du client vidéo Stream
  const [calls, setCalls] = useState<Call[]>(); // État pour stocker les appels
  const [isLoading, setIsLoading] = useState(false); // État pour indiquer le chargement

  useEffect(() => {
    const loadCalls = async () => {
      const userId = 'user_2jWIDsxoPf1k4KAjnckAPImhdgB'; // ID de l'utilisateur cible

      if (!client) return; // Si le client n'est pas disponible, ne rien faire

      setIsLoading(true); // Définir l'état de chargement à vrai

      try {
        // Requête pour obtenir les appels avec certains critères de tri et de filtrage
        const { calls } = await client.queryCalls({
          sort: [{ field: 'starts_at', direction: -1 }],
          filter_conditions: {
            starts_at: { $exists: true },
            $or: [
              { created_by_user_id: userId },
              { members: { $in: [userId] } },
            ],
          },
        });

        setCalls(calls); // Mise à jour de l'état avec les appels récupérés
      } catch (error) {
        console.error(error); // En cas d'erreur, afficher l'erreur dans la console
      } finally {
        setIsLoading(false); // Définir l'état de chargement à faux
      }
    };

    loadCalls(); // Appel de la fonction pour charger les appels
  }, [client]); // Dépendances du useEffect, se déclenche lorsque `client` change

  const now = new Date(); // Date et heure actuelles

  // Filtrage des appels terminés
  const endedCalls = calls?.filter(({ state: { startsAt, endedAt } }: Call) => {
    return (startsAt && new Date(startsAt) < now) || !!endedAt;
  });

  // Filtrage des appels à venir
  const upcomingCalls = calls?.filter(({ state: { startsAt } }: Call) => {
    return startsAt && new Date(startsAt) > now;
  });

  // Retourner les appels terminés, les appels à venir, tous les enregistrements d'appels et l'état de chargement
  return { endedCalls, upcomingCalls, callRecordings: calls, isLoading };
};
