Feature: Platform - Change the title of a pathway in a memory database with json presenter

  Scenario: I want to change the title of a learning pathway on the platform
    Given I am authenticated on the platform for change the title of the pathway in memory persistence and json presenter
    Given I have a pathway on the platform recorded in memory with these data
      | title       | description      | researchField |
      | My Pathway  | A test pathway   | biology |
    When I want to change the title of the pathway on the platform "My New Pathway"
    Then I should receive from the platform the new title of the pathway
      | title          |
      | My New Pathway |
    
