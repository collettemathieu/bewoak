Feature: Initialize a pathway

  Scenario: I want to initialize a pathway with valid data
    When I initialize a pathway with these data
      | id                                   | title      | description     | researchField |
      | f7703737-186c-4c7c-8d46-925111c7c7c1 | My Pathway | A test pathway  | biology       |
    Then It should apply an event indicating that the pathway has been initialized
    And I should retrieve the attributes of the pathway
      | id                                   | title      | description     | researchField |
      | f7703737-186c-4c7c-8d46-925111c7c7c1 | My Pathway | A test pathway  | biology       |

  Scenario: I want to initialize a pathway with an empty title
    When I initialize a pathway with these data
      | id                                   | title | description     | researchField |
      | f7703737-186c-4c7c-8d46-925111c7c7c1 |       | A test pathway  | biology       |
    Then I should see an error message "Title is required" during the initialization

  Scenario: I want to initialize a pathway with an empty description
    When I initialize a pathway with these data
      | id                                   | title      | description | researchField |
      | f7703737-186c-4c7c-8d46-925111c7c7c1 | My Pathway |             | biology       |
    Then I should see an error message "Description is required" during the initialization

  Scenario: I want to initialize a pathway with an empty research field
    When I initialize a pathway with these data
      | id                                   | title      | description     | researchField |
      | f7703737-186c-4c7c-8d46-925111c7c7c1 | My Pathway | A test pathway  |               |
    Then I should see an error message "Research field is required" during the initialization

  Scenario: I want to initialize a pathway with an invalid UUID
    When I initialize a pathway with these data
      | id              | title      | description     | researchField |
      | invalid-uuid    | My Pathway | A test pathway  | biology       |
    Then I should see an error message "Pathway id must be a valid uuid" during the initialization

  Scenario: I want to initialize a pathway with all empty fields
    When I initialize a pathway with these data
      | id | title | description | researchField |
      |    |       |             |               |
    Then I should see an error message "Pathway id must be a valid uuid" during the initialization

  Scenario: I want to initialize a pathway with missing id
    When I initialize a pathway with these data
      | title      | description     | researchField |
      | My Pathway | A test pathway  | biology       |
    Then I should see an error message "Pathway id must be a valid uuid" during the initialization

  Scenario: I want to initialize a pathway with missing title
    When I initialize a pathway with these data
      | id                                   | description     | researchField |
      | f7703737-186c-4c7c-8d46-925111c7c7c1 | A test pathway  | biology       |
    Then I should see an error message "Title is required" during the initialization

  Scenario: I want to initialize a pathway with missing description
    When I initialize a pathway with these data
      | id                                   | title      | researchField |
      | f7703737-186c-4c7c-8d46-925111c7c7c1 | My Pathway | biology       |
    Then I should see an error message "Description is required" during the initialization

  Scenario: I want to initialize a pathway with missing research field
    When I initialize a pathway with these data
      | id                                   | title      | description     |
      | f7703737-186c-4c7c-8d46-925111c7c7c1 | My Pathway | A test pathway  |
    Then I should see an error message "Research field is required" during the initialization
