# GS-Calculator
This project proves that I have learned all the basics of frontend web development properly. As a beginner, I tried my best to make it work as expected. If you see any bug or error that doesn't supposed to happen, please let me know.
## What I Learned
- **Margin Top and Bottom Collapse:** Normally, the `margin-top` property of the first element of a parent element doesn't work the same way as we expect. When I searched in google, I found this [stackoverflow question](https://stackoverflow.com/questions/9519841/why-does-this-css-margin-top-style-not-work) where the answerer gave a solid solution. It can be solved by applying `overflow: auto` or `overflow: hidden` to the parent element.
- **Nowrap:** I used the same property for all the childs of *#text-container* so that its text stays in one line and can be scrolled horizontally. But when I typed something, some characters were moving to a new line. Which almost had me demotivated. Then finally, I was able to solve the problem with `white-space: nowrap`.
- **Orientation:** Another thing had me worried for a while that, what if the screen is in portrait mode but larger than mobile screen width? The easiest way to do this is using the `orientation` feature of media queries.
## How it works
There are total 11 user-defined functions in *script.js* file. First 4 of them (button functions) handle the DOM. `ac()` resets the texts, `addText()` adds a new character when any button is clicked, while `del()` deletes the last character from the text.

The `equal()` function connects the DOM with the calculator's inner part. When a user clicks **=**, it extracts the data from *#user-typed-text* and sends it to `percentAnsPI()` for replacing **%**, **ANS** and **π**. Then, the replaced data is sent to `brackets()` function and that's where the **(** and **)** get replaced.

As expected, this function extracts a particular text surrounded by parentheses and sends it to `calc()` to calculate and then, sends that particular data to `dmas()`. As the name suggests, it handles **÷**, **×**, **+** and **−**. In short, all these functions work according to the **_BEDMAS_** of mathematics. First brackets, then DMAS.

All other functions don't need to be explained as their names are enough to understand their actual purposes. That's being said, it's not finished yet. My target was to make an all-in-one calculator. Means, I will continue adding more features to my calculator in the future.
