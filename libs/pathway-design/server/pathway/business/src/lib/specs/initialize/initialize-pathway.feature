Feature: Business - Initialize a pathway

  Scenario: I want to initialize a pathway in business with valid data
    When I initialize a pathway in business with these data
      | id                                   | title      | description     | researchField |
      | f7703737-186c-4c7c-8d46-925111c7c7c1 | My Pathway | A test pathway  | biology       |
    Then It should apply an event indicating that the pathway has been initialized
    And I should retrieve the attributes of the pathway from business
      | id                                   | title      | description     | researchField |
      | f7703737-186c-4c7c-8d46-925111c7c7c1 | My Pathway | A test pathway  | biology       |

  Scenario: I want to initialize a pathway in business with invalid data
    When I initialize a pathway in business with these data
      | id | title | description | researchField |
      |    |       |             |               |
    Then I should see an error message from business during the initialization

  Scenario: I want to initialize a pathway in business with missing fields
    When I initialize a pathway in business with these data
      | title      | description     | researchField |
    Then I should see an error message from business during the initialization
