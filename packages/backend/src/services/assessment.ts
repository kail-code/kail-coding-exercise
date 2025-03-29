import {
  Answer,
  Domain,
  DomainMapping,
  Thresholds,
  Recommendations,
} from "../types";

const domainMapping: DomainMapping[] = require("../data/domain-mapping.json");

// Assessment thresholds
const THRESHOLDS: Thresholds = {
  depression: 2,
  mania: 2,
  anxiety: 2,
  substance_use: 1,
};

// Assessment recommendations
const RECOMMENDATIONS: Recommendations = {
  depression: "PHQ-9",
  mania: "ASRM",
  anxiety: "PHQ-9",
  substance_use: "ASSIST",
};

export function assessAnswers(answers: Answer[]): string[] {
  // Create a map of question_id to value for easier lookup
  const answerMap = answers.reduce<Record<string, number>>((map, answer) => {
    map[answer.question_id] = answer.value;
    return map;
  }, {});

  // Calculate domain scores
  const domainScores = domainMapping.reduce<Record<Domain, number>>(
    (scores, mapping) => {
      const value = answerMap[mapping.question_id];
      if (value !== undefined) {
        scores[mapping.domain] = (scores[mapping.domain] || 0) + value;
      }
      return scores;
    },
    {} as Record<Domain, number>
  );

  // Determine recommended assessments based on thresholds
  const recommendations = Object.entries(domainScores)
    .filter(([domain, score]) => score >= THRESHOLDS[domain as Domain])
    .map(([domain]) => RECOMMENDATIONS[domain as Domain] as string);

  return recommendations;
}
