Feature: Platform - Initialize a Pathway

  Scenario: I want to initialize a learning pathway on the platform
    Given I am authenticated on the platform for initialize a pathway with "<presenter>" and "<persistence>"
    When I want to initialize on the platform a pathway with these data
      | title       | description      | researchField |
      | My Pathway  | A test pathway   | biology |
    Then I should retrieve from the platform a pathway initialized with its data
      | title       | description      | researchField |
      | My Pathway  | A test pathway   | biology |
    Then The pathway received from the platform should be have a unique identifier
    
    Examples:
      | presenter | persistence |
      | toJson    | inMemory    |