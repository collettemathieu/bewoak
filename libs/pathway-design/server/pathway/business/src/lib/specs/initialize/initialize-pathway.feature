Feature: Business - Initialize a pathway

  Scenario: I want to initialize a pathway in business with valid data
    When I initialize a pathway in business with these data
      | id                                   | title      | description     | researchField |
      | f7703737-186c-4c7c-8d46-925111c7c7c1 | My Pathway | A test pathway  | biology       |
    Then It should apply an event indicating that the pathway has been initialized
    And I should retrieve the attributes of the pathway from business
      | id                                   | title      | description     | researchField |
      | f7703737-186c-4c7c-8d46-925111c7c7c1 | My Pathway | A test pathway  | biology       |

  Scenario: I want to initialize a pathway in business with an empty title
    When I initialize a pathway in business with these data
      | id                                   | title | description     | researchField |
      | f7703737-186c-4c7c-8d46-925111c7c7c1 |       | A test pathway  | biology       |
    Then I should see an error message from business "Title is required" during the initialization

  Scenario: I want to initialize a pathway in business with an empty description
    When I initialize a pathway in business with these data
      | id                                   | title      | description | researchField |
      | f7703737-186c-4c7c-8d46-925111c7c7c1 | My Pathway |             | biology       |
    Then I should see an error message from business "Description is required" during the initialization

  Scenario: I want to initialize a pathway in business with an empty research field
    When I initialize a pathway in business with these data
      | id                                   | title      | description     | researchField |
      | f7703737-186c-4c7c-8d46-925111c7c7c1 | My Pathway | A test pathway  |               |
    Then I should see an error message from business "Research field is required" during the initialization

  Scenario: I want to initialize a pathway in business with an invalid UUID
    When I initialize a pathway in business with these data
      | id              | title      | description     | researchField |
      | invalid-uuid    | My Pathway | A test pathway  | biology       |
    Then I should see an error message from business "Pathway id must be a valid uuid" during the initialization

  Scenario: I want to initialize a pathway in business with all empty fields
    When I initialize a pathway in business with these data
      | id | title | description | researchField |
      |    |       |             |               |
    Then I should see an error message from business "Pathway id must be a valid uuid" during the initialization

  Scenario: I want to initialize a pathway in business with missing id
    When I initialize a pathway in business with these data
      | title      | description     | researchField |
      | My Pathway | A test pathway  | biology       |
    Then I should see an error message from business "Pathway id must be a valid uuid" during the initialization

  Scenario: I want to initialize a pathway in business with missing title
    When I initialize a pathway in business with these data
      | id                                   | description     | researchField |
      | f7703737-186c-4c7c-8d46-925111c7c7c1 | A test pathway  | biology       |
    Then I should see an error message from business "Title is required" during the initialization

  Scenario: I want to initialize a pathway in business with missing description
    When I initialize a pathway in business with these data
      | id                                   | title      | researchField |
      | f7703737-186c-4c7c-8d46-925111c7c7c1 | My Pathway | biology       |
    Then I should see an error message from business "Description is required" during the initialization

  Scenario: I want to initialize a pathway in business with missing research field
    When I initialize a pathway in business with these data
      | id                                   | title      | description     |
      | f7703737-186c-4c7c-8d46-925111c7c7c1 | My Pathway | A test pathway  |
    Then I should see an error message from business "Research field is required" during the initialization
