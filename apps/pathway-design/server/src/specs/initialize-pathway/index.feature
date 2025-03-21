Feature: Platform - Initialize a Pathway

  Scenario: I want to initialize a learning pathway on the platform
    Given I am authenticated on the platform for initialize a pathway with "<presenter>" and "<persistence>"
    When I want to initialize on the platform a pathway with these data
      | title       | description      | researchField |
      | My Pathway  | A test pathway   | biology |
    Then I should retrieve from the platform a pathway initialized with its data
      | title       | description      | researchField |
      | My Pathway  | A test pathway   | biology |
    Then The platform should send an event to the event bus with the pathway initialized
    Then The pathway received from the platform should be have a unique identifier
  Examples:
    | presenter | persistence |
    | toJson    | inMemory    |

  Scenario: I want to initialize a learning pathway on the platform with invalid data
    Given I am authenticated on the platform for initialize a pathway with "<presenter>" and "<persistence>"
    When I want to initialize on the platform a pathway with these data
      | title       | description      | researchField |
      | My Pathway  |                  |               |
    Then I should see two errors message from the platform during the initialization
  Examples:
    | presenter | persistence |
    | toJson    | inMemory    |