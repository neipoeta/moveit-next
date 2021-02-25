import { useState, useEffect, useContext} from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Countdown.module.css';

let countdownTimeout: NodeJS.Timeout;

export function Countdown(){
    const { startNewChallenge }= useContext(ChallengesContext);

    const [time, setTime] = useState(0.1 * 60);
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false); //hasFinishede grámatica em ingles


    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    const [minuteLeft, minuteRigth] = String(minutes).padStart(2, '0').split('');
    const [secondLeft, secondRigth] = String(seconds).padStart(2, '0').split('');

    function startCountdown() {
        setIsActive(true);
    }
    function resetCountdown() {
        clearTimeout( countdownTimeout);
        setIsActive(false);
        setTime( 25 * 60)
        
    }

    useEffect(() => {
        if (isActive && time > 0) {
            countdownTimeout = setTimeout(()=> {
                setTime(time - 1);
            }, 1000)
        } else if (isActive && time == 0) {
            setHasFinished(true); // chegou ao fim
            setIsActive(false); //quando chegar a zero não vai estar ativo, por isso desativar.
            startNewChallenge();
        }
    }, [isActive, time])


    return(
        <div>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRigth}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRigth}</span>
                </div>
            </div>

            { hasFinished ? (
                <button 
                disabled
                className={styles.countdownButton}
                >
                Ciclo Concluido            
            </button>
            ) : (
               <>
                {isActive ? (
                    <button 
                    type="button" 
                    className={ `${styles.countdownButton} ${styles.countdownButtonActive}`}
                    onClick={resetCountdown}
                    >
                    Abandonar Ciclo            
                </button>
                ) : (
                    <button 
                    type="button" 
                    className={styles.countdownButton}
                    onClick={startCountdown}
                    >
                    Iniciar Ciclo           
                </button>
                )} 
               </> 
            )}


            
        </div>
    );
}