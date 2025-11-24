Feature: Application - Index New Pathway

  Scenario: When a new pathway is created, it should be indexed in the search system
    Given a new pathway with the following details has been created:
        | title   | description   | researchField  | pathwayId  |
        | Introduction to TypeScript | A beginner's guide to TypeScript. | Computer sciences | pathway-123 |
    Then the pathway should be indexed in the search system
    And the indexed pathway should have the following details:
        | title   | description   | researchField  | pathwayId  |
        | Introduction to TypeScript | A beginner's guide to TypeScript. | Computer sciences | pathway-123 |