Feature: Change the title of a pathway in a memory database with json presenter

  Scenario: I want to change the title of a learning pathway
    Given I am authenticated on the platform for change the title of the pathway in memory persistence and json presenter
    Given I have a pathway recorded in memory with these data
      | title       | description      | researchField |
      | My Pathway  | A test pathway   | biology |
    When I want to change the title of the pathway in memory to "My New Pathway"
    Then I should receive from memory the new title of the pathway
      | title          |
      | My New Pathway |
    
