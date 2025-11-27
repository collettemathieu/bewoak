Feature: Application - Index New Pathway

  Scenario: When a new pathway is created, it should be indexed in the search system
    Given a new pathway with the following details has been created:
        | title   | description   | researchField  | pathwayId  |
        | Introduction to TypeScript | A beginner's guide to TypeScript. | Computer sciences | pathway-123 |
    Then the pathway should be indexed in the search system
    And the indexed pathway should have the following details:
        | title   | description   | researchField  | pathwayId  |
        | Introduction to TypeScript | A beginner's guide to TypeScript. | Computer sciences | pathway-123 |

  Scenario: When a new pathway is created with missing optional fields, it should not be indexed
    Given a new pathway with the following details has been created:
        | title   | researchField  | pathwayId  |
        | Advanced Node.js | Computer sciences | pathway-456 |
    Then an error should occur during indexing
    And the pathway should not be indexed in the search system

  Scenario: When a new pathway is created with invalid data, it should not be indexed
    Given a new pathway with the following details has been created:
        | title   | description   | researchField  | pathwayId  |
        |  | A guide to advanced Node.js. | Computer sciences | pathway-789 |
    Then an error should occur during indexing
    And the pathway should not be indexed in the search system

