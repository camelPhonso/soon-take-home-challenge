# SOON_ Basket App Challenge

## Challenge Goal
Of the two prototype user flows provided I chose to complete the first - 
creating a simple shopping app that allows the user to:
- view a product with details: title, description, image, price
- add a quantity of the product to the basked; see the total item count in 
the basket from the header

I chose this user flow because it was the mininum viable product for a 
simple shopping app. Although the second flow could absolutely be created 
separately, this would likely be the order of work in a real scenario.

## Initial Assumptions
Being a time-constrained task with a narrow scope certain concessions 
were made, based on assumptions from the brief:

- **mobile-first development is not a priority**. The page was developed 
to reproduce the design presented in the Figma screens without 
consideration for changing screen sizes, though that would be a likely 
priority in production.

- **the best approach is to create modular functions that could be applied 
in later iterations**. In order to showcase the functionality of the page, 
a few static elements were set up in the code to simulate what would 
likely be a fetch call to the clients' API. In this case, we only want to 
see that the page can track user interaction and store their basket 
locally. The code base created here should be easily adapted to deal with 
the data processed in a real scenario following much the same logic.

# Reviewing the code
For ease, the terminal input to clone this repository has been pasted 
below:

```terminal
git clone https://github.com/camelPhonso/soon-take-home-challenge
```

The deployed page can also be visited directly through this 
[link right 
here](https://camelphonso.github.io/soon-take-home-challenge/).

Some commentary has been added specifically with the scope of this challenge in
 mind, but for the most part the code base relies on sparse commentary and 
concise naming for readibility.

## Challenges
- This was my first experience actually developing a page while following 
a prototype so there was an initial adjustment to both working with figma 
and understand how much to adjust the directions given. In a scenario with 
more time to iterate I might have prioritised matching the design of the 
page while making it responsive, but ultimately I chose to simply recreate 
the static look seen in the figma screens.

- Similarly, it was actually my first experience working with SVGs, which 
are much more versatile but also require their own syntax and a different 
approach from static images.

- In hindsight I would have also adapted my approach to the repository 
itself. Because this was a solo project I made few commits with large 
changes each and pushed directly to the main. This is obviously not the 
approach that would be taken in a production scenario and a better 
strategy would have been to emulate due process with smaller, clearly 
annotated commits. However, I believe the code is still written in a 
fairly clear way and the README should clarify my approach to the challenge.

## The process
I split my work on this challenge in three parts:

 1. Recreate the page from the provided Figma screens
  - this meant laying out the html and css for the page directly from the 
directions given wiht the brief. In this process I focused only on 
obtaining a product as close to the brief as possible while approaching it 
with semantic HTML in mind and trying to reduce the bulk of CSS by 
utilising fundamentals for repeated setting groups, allowing a shorter CSS 
and a consistent look.

 2. Give the page functionality with JavaScript
  - this was obviously the 'free hand' portion of the work. I knew what 
user flow to complete and could see from the Figma files how the DOM 
should respond to certain changes, so I just worked from the simplest step 
(adjusting the product counter when the user interacts witht the "-" and 
"+" buttons) up to the most complex scenario (what happens if a user tries 
to add more jackets to the basket than there are in stock?).

 3. Refactor
  - I read back on my code and tried to spot small changes that could make it more readable or efficient without changing it's functionality.
