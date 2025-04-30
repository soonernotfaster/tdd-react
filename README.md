# Bowling Kata in React

Welcome to a version of the [Bowling Kata](https://kata-log.rocks/bowling-game-kata). This version is a slight alteration of the rules of the typical Bowling Kata by adding a focus on BDD. Behavior-Driven Development lends itself better to most forms of UI based testing. Not only does it put an emphasis on preventing coupling to the implementation, it creates a mechanism to describe various starting scenarios or contexts. These contexts can be implemented as describe blocks and allow you declare a shared setup and teardown in a logical fashion. This drastically reduces the cogntive load of a custom organization.

As you implement the code for the User Story below, take advantage of using test-ids via the `data-testid` attribute in React. Testing in this way we reduce your code's coupling to the interface.
Also note that you are not allowed to use test doubles (`vi.fn`, `vi.mock`, `vi.spyOn`, etc).

## Requirements

### User Story

As a bowler,
I want to know the score of my game without doing math
So that I can have more fun

### Acceptance Critera

- Score of frame is the sum of both rolls and the previous frame
- A Spare frame has a score of 10 + the next roll
- A Strike frame has a score of 10 + next two rolls

Given a new game
When I roll all gutter balls
Then I see each roll as "\_"
And I see the frame total as "0"

When I roll all 1s
Then I see the each roll as "1"
And I see frames with the totals [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]

When I roll all 2s
Then I see the each roll as "2"
And I see frames with the totals [4, 8, 12, 16, 20, 24, 28, 32, 36, 40]

When I roll all 3s  
Then I see the each roll as "3"  
And I see frames with the totals [6, 12, 18, 24, 30, 36, 42, 48, 54, 60]

When I roll all 4s
Then I see the each roll as "4"
And I see frames with the totals [8, 16, 24, 32, 40, 48, 56, 64, 72, 80]

### Strike

When I roll a strike
And I roll all gutter balls
Then I see an "X" for the first roll
And I see frames with the totals [10, 0, 0, 0, 0, 0, 0, 0, 0, 0]

When I roll a strike
And I roll 2
And I roll 2
And I roll all gutter balls
Then I see an "X" for the first roll
And I see frames with the totals [14, 18, 0, 0, 0, 0, 0, 0, 0, 0]

When I roll 18 gutter balls
And I roll a strike
And I roll 2
And I roll a gutter
Then I see an "X" for the third last roll
And I see frames with the totals [0, 0, 0, 0, 0, 0, 0, 0, 0, 12]

### Spare

When I roll a spare (5, 5)
And I roll all gutter balls
Then I see an "5" for the first roll
And I see an "/" for the second roll
And I see frames with the totals [10, 0, 0, 0, 0, 0, 0, 0, 0, 0]

When I roll a spare (5, 5)
And I roll 2
And I roll 2
And I roll all gutter balls
Then I see frames with the totals [12, 16, 0, 0, 0, 0, 0, 0, 0, 0]

### Perfect game

When I roll all strikes (12 in a row)
Then I see frames with the totals [30, 60, 90, 120, 150, 180, 210, 240, 270, 300]

**N.B.**
If a Strike or Spare ocurss on 10th frame, additional rolls are allowed to complete the frame. These rolls are not treated as Spares or Strikes.

An overview of [bowling scoring](https://bowl.com/keeping-score).

### Domain terms

- Strike - knocking down all 10 pins in single roll
- Spare - knocking down all 10 pins across two rolls
- Frame - rolls for a turn. There are 10 frames total
- Pins - there are 10 total
