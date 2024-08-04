Feature: Initiate a pathway

  # Scenario: I want to initialize a pathway
  #   When I want to initialize a pathway with these data
  #     | title       | description      | researchField |
  #     | My Pathway  | A test pathway   | biology |
  #   Then I should receive the attributes of the pathway
  #     | title       | description      | researchField |
  #     | My Pathway  | A test pathway   | biology |

  # Scenario: When I initiliaze a pathway, an event should be emitted
  #   When I want to initialize a pathway with these data
  #     | title       | description      | researchField |
  #     | My Pathway  | A test pathway   | biology |
  #   Then it should emitted an event "PathwayInitialized" with the attributes of the pathway
  #     | title       | description      | researchField |
  #     | My Pathway  | A test pathway   | biology |

  # Scenario: I want to initialize a pathway with an empty title
  #   When I want to initialize a pathway with these data
  #     | title       | description      | researchField |
  #     |             | A test pathway   | biology |
  #   Then I should see an error message "Title is required" during initialization of the pathway

  # Scenario: I want to initialize a pathway with an empty description
  #   When I want to initialize a pathway with these data
  #     | title       | description      | researchField |
  #     | My Pathway  |                  | biology |
  #   Then I should see an error message "Description is required" during initialization of the pathway


  # Scenario: I want to initialize a pathway with an empty research field
  #   When I want to initialize a pathway with these data
  #     | title       | description      | researchField |
  #     | My Pathway  | A test pathway   |               |
  #   Then I should see an error message "Research field is required" during initialization of the pathway
