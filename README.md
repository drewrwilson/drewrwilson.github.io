#Mr. Hyde
Mr. Hyde is a tool that helps you easily and quickly set up your own online portfolio, hosted for free right here on github. Just add you content and any additional stylings and you're ready to go. Mr. Hyde puts you in control of your content without needing a big, bloated content-management-system.

Mr. Hyde is powered by Dr. [Jekyll](http://jekyllrb.com/)!

##A solid start
It uses [HTML5 Boilerplate](http://html5boilerplate.com/) as a starting point that delivers best practices, standard elements, and pieces like Normalize.css for you to start from.

##Style it how you like
You can add custom styles in `/css/custom.css`.

###Grids
No need for a complex frontend framework. You can add in custom grids pretty easily.

* Wrap a div with the class "grid" around the content. 
* Add another div with the column you want (i.e. col-1-2 for 50% width, col-1-3 for 33% width, col-2-3 for 66% width)
```html
<div class="grid">
  <div class="col-2-3">
     Main Content
  </div>
  <div class="col-1-3">
     Sidebar
  </div>
</div>
```
Here's [more info](http://css-tricks.com/dont-overthink-it-grids/) about the simple grids we're using thanks to [Chris Coyier](https://twitter.com/chriscoyier).

##Add in your work
The portfolio projects are found in `/_posts`. There you can add the project's title, thumbnail, images, link to project, tags, categories, and summary.
