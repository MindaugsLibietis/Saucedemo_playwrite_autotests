Feature: SauceDemo Login

  As a SauceDemo website user,
  I want to log in with my credentials
  So that I can access the product inventory

  Background:
    Given I am on the SauceDemo login page

  Scenario Outline: Successful login with valid user accounts
    When I log in as "<user>" with valid password
    Then I should be redirected to the products inventory page
    And the page header should display "Products"

    Examples:
      | user                    |
      | standard_user           |
      | problem_user            |
      | performance_glitch_user |
      | error_user              |
      | visual_user             |

  Scenario: Unsuccessful login as locked out user
    When I log in as "locked_out_user" with valid password
    Then I should see the error message "Epic sadface: Sorry, this user has been locked out."
