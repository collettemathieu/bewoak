Feature: Controller Testing

  Scenario: Get request to /
    Given l'application NestJS est lancée
    When j'effectue une requête GET sur "/"
    Then la réponse doit avoir un statut 200
    And la réponse doit contenir "Hello API"
