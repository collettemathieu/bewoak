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

  Scenario: When I initiliaze a pathway in application, but an error occured during the process of saving the pathway
    When I initialize a pathway in application with these data but the persistence layer fails
      | title       | description      | researchField |
      | My Pathway  | A test pathway   | biology |
    Then It should return an error message indicating that the pathway could not be saved