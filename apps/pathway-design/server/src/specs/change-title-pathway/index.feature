Feature: Platform - Change the title of a pathway

  Scenario: I want to change the title of a learning pathway on the platform
    Given I am authenticated on the platform for change the title of the pathway with "<presenter>" and "<persistence>"
    Given I have a pathway on the platform with these data
      | title       | description      | researchField |
      | My Pathway  | A test pathway   | biology |
    When I want to change the title of the pathway on the platform "My New Pathway"
    Then I should receive from the platform the new title of the pathway
      | title          |
      | My New Pathway |
  Examples:
    | presenter | persistence |
    | toJson    | inMemory    |

  Scenario: I want to change the title of a learning pathway on the platform with invalid data
    Given I am authenticated on the platform for change the title of the pathway with "<presenter>" and "<persistence>"
    Given I have a pathway on the platform with these data
      | title       | description      | researchField |
      | My Pathway  | A test pathway   | biology |
    When I want to change the title of the pathway on the platform ""
    Then I should an error message from the platform during changing the title
  Examples:
    | presenter | persistence |
    | toJson    | inMemory    |