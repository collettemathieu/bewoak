Feature: Business - Initialize a pathway

  Scenario: I want to initialize a pathway in business with valid data
    When I initialize a pathway in business with these data
      | title      | description     | researchField |
      | My Pathway | A test pathway  | biology       |
    Then It should apply an event indicating that the pathway has been initialized
    And I should retrieve the attributes of the pathway from business
      | title      | description     | researchField |
      | My Pathway | A test pathway  | biology       |

  Scenario: I want to initialize a pathway in business with invalid data
    When I initialize a pathway in business with these data
      | title | description | researchField |
      |       |             |               |
    Then I should see an error message from business during the initialization

  Scenario: I want to initialize a pathway in business with missing fields
    When I initialize a pathway in business with these data
      | title      | description     | researchField |
    Then I should see an error message from business during the initialization
