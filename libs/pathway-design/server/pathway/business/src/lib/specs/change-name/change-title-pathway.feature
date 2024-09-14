Feature: Change the title of a pathway

  Scenario: I want to change the title of a pathway with a valid title
    Given I have a pathway with these data
      | title       | description      | researchField |
      | My Pathway | A test pathway   | biology |
    When I change the title of the pathway to "My New Pathway"
    Then It should apply an event indicating that the title of the pathway has been changed
    Then I should see the title of the pathway changed to "My New Pathway"

  Scenario: I want to change the title of a pathway with an empty title
    Given I have a pathway with these data
      | title       | description      | researchField |
      | My Pathway  | A test pathway   | biology |
    When I change the title of the pathway to ""
    Then I should see an error message "Title is required" during the title change
