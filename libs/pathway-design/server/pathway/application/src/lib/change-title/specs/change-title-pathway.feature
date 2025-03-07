Feature: Application - Change the title of a pathway

  Scenario: Given a valid pathway in application, when I change the title of the pathway, an event should be emitted
    Given I have a pathway in application with these data
      | title       | description      | researchField |
      | My Pathway  | A test pathway   | biology |
    When I want to change the title of the pathway in application to "My New Pathway"
    Then It should call the persistence layer to modify the title of the pathway
    And It should call the presenter to present the pathway with its new title
    And It should emit an event indicating that the title of the pathway has been changed
    And I should receive the pathway with its new title
      | title          |
      | My New Pathway |


  Scenario: Given no pathway in application, when I change the title of a pathway in application, the process of saving the pathway fails
    When No pathway is initialized in application
    Then It should return an exception message indicating that the pathway is not found


  Scenario: Given a valid pathway in application, when I change the title of the pathway in application, but title is invalid
    When I have a pathway in application with these data
      | title       | description      | researchField |
      | My Pathway  | A test pathway   | biology |
    When I want to change the title of the pathway in application to ""
    Then It should return an exception message indicating that the new title is invalid