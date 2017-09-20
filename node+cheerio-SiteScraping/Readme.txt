
-----Introduction:

In this tutorial, we will scrape the front page of Hacker News to get all the top ranking links as well as their metadata - such as the title, URL and the number of points/comments it received. This is one of many techniques to extract data from web pages using node.js and mainly uses a module called cheerio by Matthew Mueller which implements a subset of jQuery specifically designed for server use.
Cheerio is lightweight, fast, flexible and easy to use, if you're already accustomed to working with jQuery. We will also make use of Mikael Rogers' excellent request module as a simplified HTTP client.

------Requirements:

I will assume that you're already familiar with node.js, jQuery and basic Linux administrative tasks like connecting to your VPS using SSH.
If you're unfamiliar with node.js or if you haven't installed it yet, please refer to the Articles & Tutorials section above to find installation instructions for your operating system.

-----how to run
on terminal
>
>npm install request cheerio (or To install the modules globally run: 
npm install -g request cheerio
or npm install request --save
   npm install cheerio --save)
>node jsonscrap.js