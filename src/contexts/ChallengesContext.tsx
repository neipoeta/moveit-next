import {createContext, ReactNode, useEffect, useState} from 'react';
import challenges from '../../challenges.json';

interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface ChallengesContextData {
    level: number;
    currentExperience: number;
    experienceToNextLevel: number;
    challengeCompleted: number;
    activeChallenge: Challenge;
    levelUp: () => void;
    startNewChallenge: () => void;
    resetChallenge: () => void;
    completeChallenge: () => void;
}

interface ChallengesProviderProps {
    children: ReactNode;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export  function ChallengesProvider({ children }: ChallengesProviderProps){
    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrentExperience] = useState(0);
    const [challengeCompleted, setChallengeCompleted] = useState(0);

    const [activeChallenge, setActiveChallenge] = useState(null) //Criando estado 'State para o Challenge'

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2) // 4 Grau de dificuldade para ganhar lvl

    useEffect(() => {
        Notification.requestPermission();
    }, []) //Pedindo Perissao ao user



  function levelUp() {
    setLevel(level + 1);
  }

  function startNewChallenge() {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
        const challenge = challenges[randomChallengeIndex];

        setActiveChallenge(challenge)

        new Audio('/notification.mp3').play();

        if (Notification.permission === 'granted'){
            new Notification('Novo Desafio!!!', {
                body: `Valendo ${challenge.amount} xp!`
            })
        }
  }

  function resetChallenge() {
      setActiveChallenge(null);
  }

  function completeChallenge() {
      if (!activeChallenge) {
        return;
      }

      const { amount } = activeChallenge;

      let finalExperience = currentExperience + amount;

      if (finalExperience >= experienceToNextLevel) {
          finalExperience = finalExperience - experienceToNextLevel;
          levelUp();
      }
      
      setCurrentExperience(finalExperience);
      setActiveChallenge(null);
      setChallengeCompleted(challengeCompleted + 1);
      
  }

  return (
    <ChallengesContext.Provider value={{
            level, 
            currentExperience,
            challengeCompleted,
            activeChallenge,
            experienceToNextLevel,
            levelUp,
            startNewChallenge,
            resetChallenge,
            completeChallenge,
        }}
    >
        {children}
    </ChallengesContext.Provider>
  );
}