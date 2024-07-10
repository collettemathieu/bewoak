Feature: Initialize Pathway in a memory database

  Scenario: I want to initialize a learning pathway
    Given I am authenticated on the platform
    When I want to initialize a pathway with these data
      | title       | description      | researchField |
      | My Pathway  | A test pathway   | biology |
    Then I should retrieve a pathway initialized with its data
      | title       | description      | researchField |
      | My Pathway  | A test pathway   | biology |
    Then The pathway should be have a unique identifier

  Scenario: I want to initialize another learning pathway with different data
    Given I am authenticated on the platform
    When I want to initialize a pathway with these data
      | title       | description      | researchField |
      | Arterial stiffness  | Understand the role of the arterial stiffness   | biomedical |
    Then I should retrieve a pathway initialized with its data
      | title       | description      | researchField |
      | Arterial stiffness  | Understand the role of the arterial stiffness   | biomedical |
    Then The pathway should be have a unique identifier
    