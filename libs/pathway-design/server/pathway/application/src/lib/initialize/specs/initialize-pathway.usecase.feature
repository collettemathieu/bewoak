Feature: Initiate a pathway

  Scenario: When I initiliaze a pathway, an event should be emitted
    When I initialize a pathway with these data
      | title       | description      | researchField |
      | My Pathway  | A test pathway   | biology |
    Then It should call the persistence layer to save the pathway
    And It should call the presenter to present the pathway
    And It should emit an event indicating that the pathway has been initialized
    And I should receive the attributes of the pathway
      | title       | description      | researchField |
      | My Pathway  | A test pathway   | biology |
