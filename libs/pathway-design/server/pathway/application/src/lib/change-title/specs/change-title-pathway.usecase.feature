Feature: Application - Change the title of a pathway

  Scenario: Given a valid pathway in application, when I change the title of the pathway, an event should be emitted
    Given I have a pathway in application with these data
      | title       | description      | researchField |
      | My Pathway  | A test pathway   | biology |
    When I want to change the title of the pathway in application to "My New Pathway"
    Then It should call the persistence layer to modify the title of the pathway
    And It should call the presenter to return the new title of the pathway
    And It should emit an event indicating that the title of the pathway has been changed
    And I should receive the new title of the pathway
      | title          |
      | My New Pathway |
