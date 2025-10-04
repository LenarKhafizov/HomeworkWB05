Feature: We are going to the cinema

    Scenario: Купить билет на  фильм "Сталкер"
        Given I open the cinema website
        When I select the showtime "1759784400"
        And I choose the seance "217"
        And I select the seat in row 5 seat 6
        And I confirm the purchase
        Then I should see the ticket price "100"
    
    Scenario: Купить билет на фильм "Ведьмак"
        Given I open the cinema website
        When I select the showtime "1759698000"
        And I choose the seance "223"
        And I select the seats "5-6" and "5-7"
        And I confirm the purchase
        Then I should see the ticket price "200"
    
    Scenario: Бронирование неотмеченного места
        Given I open the cinema website
        When I select the showtime "1759698000"
        And I choose the seance "223"
        And I select the taken seat "5-7"
        And I select the taken seat "5-7"
        Then the confirm button should be disabled