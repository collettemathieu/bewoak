Feature: Application - Initialize a new pathway

  Scenario: When I initiliaze a pathway in application, an event should be emitted
    When I initialize a pathway in application with these data
      | title       | description      | researchField |
      | My Pathway  | A test pathway   | biology |
    Then It should call the persistence layer to save the pathway
    And It should call the presenter to present the pathway initialized
    And It should emit an event indicating that the pathway has been initialized
    And I should receive the attributes of the pathway initialized
      | title       | description      | researchField |
      | My Pathway  | A test pathway   | biology |

  Scenario: When I initiliaze a pathway in application, but the process of saving the pathway fails
    When I initialize a pathway in application with these data but the persistence layer fails
      | title       | description      | researchField |
      | My Pathway  | A test pathway   | biology |
    Then It should return an exception message indicating that the pathway could not be saved


  Scenario: When I initiliaze a pathway in application, but data are invalid
    When I initialize a pathway in application with these invalid data
      | title       | description      | researchField |
      | My Pathway  |                  | biology |
    Then It should return an exception message indicating why data are invalid