import {
  Mood,
  EmotionalFeature,
  AudioFeatures,
  QuantitativeFeature,
} from 'src/modules/mood/mood.interface';
import {
  MOODS,
  MOOD_FEATURES,
  NOTES,
} from '../../common/constants/songFeatures';

const {
  DANCEABILITY,
  HIGHER_DANCEABILITY,
  LOWER_DANCEABILITY,
  ENGERY,
  HIGHER_ENERGY,
  LOWER_ENERGY,
  HAPPINESS,
  LESS_HAPPINESS,
  MORE_HAPPINESS,
  ACOUSTICNESS,
  MORE_ACOUSTICNESS,
  LESS_ACOUSTICNESS,
  TEMPO,
  KEY,
} = MOOD_FEATURES;

const {
  PEACEFUL,
  REFLECTIVE,
  MELANCHOLIC,
  A_BIT_TENSE,
  A_BIT_GLOOMY,
  NERVOUS,
  EXPRESSIVE,
  ELATED,
  ELECTRIC,
  A_LITTLE_BLUE,
  SLEEPY,
  CONFUSED,
} = MOODS;

export const emotionalFeatureNames: string[] = [
  DANCEABILITY,
  ENGERY,
  HAPPINESS,
];

export const isolatedEmotionalFeatureNames: string[] = [ACOUSTICNESS];

export const standardFeatureNames: string[] = [TEMPO, KEY];

export const getAverageValue = (
  audioFeatures: AudioFeatures[],
  featureName: string,
): number => {
  return (
    audioFeatures.reduce(
      (total: number, next: AudioFeatures) =>
        total + next[featureName as keyof typeof next],
      0,
    ) / audioFeatures.length
  );
};

export const getPercentDifference = (averageValue: number): number => {
  return ((averageValue - 0.5) / 0.5) * 100;
};

export const getPercentDifferenceString = (
  featureName: string,
  percentDifference: number,
): string => {
  switch (featureName) {
    case DANCEABILITY:
      return percentDifference > 0 ? HIGHER_DANCEABILITY : LOWER_DANCEABILITY;
    case ENGERY:
      return percentDifference > 0 ? HIGHER_ENERGY : LOWER_ENERGY;
    case HAPPINESS:
      return percentDifference > 0 ? MORE_HAPPINESS : LESS_HAPPINESS;
    case ACOUSTICNESS:
      return percentDifference > 0 ? MORE_ACOUSTICNESS : LESS_ACOUSTICNESS;
    default:
      return '';
  }
};

export const getMatchedMood = (
  firstEmotionalFeature: EmotionalFeature,
  secondEmotionalFeature: EmotionalFeature,
): string => {
  const emotionalFeatures: string[] = [
    firstEmotionalFeature.percentDifferenceString,
    secondEmotionalFeature.percentDifferenceString,
  ];

  if (
    emotionalFeatures.includes(MORE_HAPPINESS) &&
    emotionalFeatures.includes(LOWER_DANCEABILITY)
  ) {
    return PEACEFUL;
  } else if (
    emotionalFeatures.includes(MORE_HAPPINESS) &&
    emotionalFeatures.includes(LOWER_ENERGY)
  ) {
    return REFLECTIVE;

    // Matching: Higher + Lower (Danceability)
  } else if (
    emotionalFeatures.includes(HIGHER_DANCEABILITY) &&
    emotionalFeatures.includes(LESS_HAPPINESS)
  ) {
    return MELANCHOLIC;
  } else if (
    emotionalFeatures.includes(HIGHER_DANCEABILITY) &&
    emotionalFeatures.includes(LOWER_ENERGY)
  ) {
    return A_BIT_TENSE;

    // Matching: Higher + Lower (Energy)
  } else if (
    emotionalFeatures.includes(HIGHER_ENERGY) &&
    emotionalFeatures.includes(LESS_HAPPINESS)
  ) {
    return A_BIT_GLOOMY;
  } else if (
    emotionalFeatures.includes(HIGHER_ENERGY) &&
    emotionalFeatures.includes(LOWER_DANCEABILITY)
  ) {
    return NERVOUS;

    // Matching: Higher + Higher (All)
  } else if (
    emotionalFeatures.includes(MORE_HAPPINESS) &&
    emotionalFeatures.includes(HIGHER_DANCEABILITY)
  ) {
    return EXPRESSIVE;
  } else if (
    emotionalFeatures.includes(MORE_HAPPINESS) &&
    emotionalFeatures.includes(HIGHER_ENERGY)
  ) {
    return ELATED;
  } else if (
    emotionalFeatures.includes(HIGHER_DANCEABILITY) &&
    emotionalFeatures.includes(HIGHER_ENERGY)
  ) {
    return ELECTRIC;

    // Matching: Lower + Lower (All)
  } else if (
    emotionalFeatures.includes(LESS_HAPPINESS) &&
    emotionalFeatures.includes(LOWER_DANCEABILITY)
  ) {
    return A_LITTLE_BLUE;
  } else if (
    emotionalFeatures.includes(LESS_HAPPINESS) &&
    emotionalFeatures.includes(LOWER_ENERGY)
  ) {
    return A_BIT_GLOOMY;
  } else if (
    emotionalFeatures.includes(LOWER_DANCEABILITY) &&
    emotionalFeatures.includes(LOWER_ENERGY)
  ) {
    return SLEEPY;
  }
  return CONFUSED;
};

export const getAverageNotatedKey = (averageValue: number): string => {
  switch (Math.round(averageValue)) {
    case 0:
      return NOTES.C;
    case 1:
      return NOTES.C_SHARP;
    case 2:
      return NOTES.D;
    case 3:
      return NOTES.D_SHARP;
    case 4:
      return NOTES.E;
    case 5:
      return NOTES.F;
    case 6:
      return NOTES.F_SHARP;
    case 7:
      return NOTES.G;
    case 8:
      return NOTES.G_SHARP;
    case 9:
      return NOTES.A;
    case 10:
      return NOTES.A_SHARP;
    case 11:
      return NOTES.B;
    default:
      return NOTES.C;
  }
};

export const calculateMood = (audioFeatures: AudioFeatures[]): Mood => {
  const emotionalFeatures: EmotionalFeature[] = emotionalFeatureNames.map(
    (featureName: string) => {
      const averageValue: number = getAverageValue(audioFeatures, featureName);
      const percentDifference: number = getPercentDifference(averageValue);

      const percentDifferenceString: string = getPercentDifferenceString(
        featureName,
        percentDifference,
      );
      return {
        featureName,
        averageValue,
        percentDifference: Math.abs(percentDifference),
        percentDifferenceString,
      };
    },
  );

  const isolatedEmotionalFeatures: EmotionalFeature[] =
    isolatedEmotionalFeatureNames.map((featureName: string) => {
      const averageValue: number = getAverageValue(audioFeatures, featureName);
      const percentDifference: number = getPercentDifference(averageValue);

      const percentDifferenceString: string = getPercentDifferenceString(
        featureName,
        percentDifference,
      );
      return {
        featureName,
        averageValue,
        percentDifference: Math.abs(percentDifference),
        percentDifferenceString,
      };
    });

  const sortedEmotionalFeatures: EmotionalFeature[] = emotionalFeatures.sort(
    (a: EmotionalFeature, b: EmotionalFeature) =>
      Math.abs(b.percentDifference) - Math.abs(a.percentDifference),
  );

  const allEmotionalFeatures = sortedEmotionalFeatures.concat(
    isolatedEmotionalFeatures,
  );

  const [firstEmotionalFeature, secondEmotionalFeature] =
    sortedEmotionalFeatures;

  const moodName: string = getMatchedMood(
    firstEmotionalFeature,
    secondEmotionalFeature,
  );

  const quantitativeFeatures: QuantitativeFeature[] = standardFeatureNames.map(
    (featureName: string) => {
      const averageValue: number = getAverageValue(audioFeatures, featureName);

      if (featureName === 'key') {
        const averageNotatedKey: string = getAverageNotatedKey(averageValue);
        return { featureName, averageValue, averageNotatedKey };
      }
      return { featureName, averageValue };
    },
  );

  const calculatedMood: Mood = {
    name: moodName,
    breakdown: {
      emotionalFeatures: allEmotionalFeatures,
      quantitativeFeatures,
    },
  };

  return calculatedMood;
};
