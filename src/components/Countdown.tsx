import { useState, useEffect, useContext} from 'react';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/Countdown.module.css';


 export function Countdown(){
    const { 
        minutes, 
        seconds,
        hasFinished,
        startCountdown,
        isActive,
        resetCountdown, } = useContext(CountdownContext);
    

    const [minuteLeft, minuteRigth] = String(minutes).padStart(2, '0').split('');
    const [secondLeft, secondRigth] = String(seconds).padStart(2, '0').split('');

   
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