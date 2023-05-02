/* eslint-disable @next/next/no-img-element */
import { EpisodeType } from "@/services/courseService";
import styles from "./styles.module.scss";

interface props {
  episode: EpisodeType;
}

const EpisodeList = ({ episode }: props) => {
  const handleSecondsToMinutes = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    const toString = (num: number) => {
      return num.toString().padStart(2, "0");
    };

    return `${toString(minutes)}:${toString(seconds)}`;
  };

  return (
    <>
      <div className={styles.episodeCard}>
        <div className={styles.episodeOrderTime}>
          <p className={styles.episodeOrder}>Episódio Nº {episode.order}</p>
          <p className={styles.episodeTime}>
            {handleSecondsToMinutes(episode.secondsLong)}
          </p>
        </div>

        <div className={styles.episodeTitleDescription}>
          <p className={styles.episodeTitle}>{episode.name}</p>
          <p className={styles.episodeDescription}>{episode.synopsis}</p>
        </div>
      </div>
    </>
  );
};

export default EpisodeList;
