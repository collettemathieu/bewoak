Feature: Business - Add article to a pathway

  Scenario: I want to add an article to a pathway in business with valid data
    Given I have initialized a pathway without article in business with these data
      | title      | description     | researchField |
      | My Pathway | A test pathway  | biology       |
    When I add an article to the pathway in business with these data
      | titleOfArticle      | urlOfResource      |
      | My Article | https://www.example.com         |
    Then I should retrieve the attributes of article of the pathway from business
      | titleOfArticle      | urlOfResource      |
      | My Article | https://www.example.com         |
