Feature: Initialize Pathway in a memory database with json presenter

  Scenario: I want to initialize a learning pathway
    Given I am authenticated on the platform for initialize a pathway in memory persistence and json presenter
    When I want to initialize a pathway with these data
      | title       | description      | researchField |
      | My Pathway  | A test pathway   | biology |
    Then I should retrieve a pathway initialized with its data
      | title       | description      | researchField |
      | My Pathway  | A test pathway   | biology |
    Then The pathway should be have a unique identifier

    