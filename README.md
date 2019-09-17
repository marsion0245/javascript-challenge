# javascript-challenge

## Summary

* UFO-level-1 solution provided
* UFO-level-2 solution provided
 
* Programs are located in static/app.js file
 
### Page Layout has been improved:
1) Page shows the original picture (I like it)
2) Fix navigation bar and footer
3) Table uses vertical scrolling and sticky header
4) Table covers the whole screen width for better radebility
5) Filter menu is located on the left site to provide better readebilityadebility

### Filter functionality:
1) Is activated with either keyup, or by click on Filter button (this is redundant)
2) Uses regex for string values (datetime, city, shape), and searches for a subtring in the corresponding field
3) Values are combined with AND
4) Clearing of the filter removes all values and shows all rows
5) Table is not rebuilt after filter cleanup, display=none is used istead of removing values from DOM

The code is fairly condensed, have fun!

