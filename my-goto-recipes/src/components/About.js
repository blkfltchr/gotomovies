import React from "react";

const About = () => {
  return (
    <div className="jumbo-background">
    <div className="center-textbox">
      <div className="about-text">
        <h1>How I built this</h1>
        <p>Unsure what to create exactly, I did some brainstorming. I knew some of the features I wanted but I wasn’t concept to pursue to implement them. Some of the features included: Card display, Add/remove cards, Dynamic linking, reactstrap components, and more.</p>
        <p>I didn’t want to do a to-do list or a note taking app but I wanted to continue down that line of thinking. I talked to my mother and we came up with some sort of tracker. Maybe a goal tracker? Finally - probably because I was hungry at the time - I settled on a recipe tracker.</p>
        <p>I set out to brainstorm a long list of possible features and narrowed them down to a list of MVP features that were short and sweet, like a good recipe. I wanted a navbar, a way to add recipes, a few recipes stored on a basic server, multiple recipe views, and search.</p>
        <p>I decided to start by creating a placeholder of the recipe card. At the same time, to make sure there was data to fill the recipe cards, I created an array of objects in my server.js file. I borrowed an approach from a similar project I recently worked on.</p>
        <p>Now that I had a very basic list of recipes displaying, I decided to move on to the form. I added input fields for all aspects of the recipe cards and used react strap with a bit of css to get it centred on the page. I got stuck on adding the list of ingredients as it’s own array, so I decided to come back to it. I wanted to get an easy win and I decided to style the existing cards instead.</p>
        <p>I used Card components from reactstrap and an alert bar at the bottom. I also refactored the server.js file to make ingredients a string with commas rather than an array. I knew that would make everything easier going forward.</p>
        <p>By the end of day 1, I actually made it further than I thought I would. I got the navbar done (minus wrapping ‘My go-to recipes with a link’). I implemented react router. And I even got the add functionalty to work! Here are a few progress pics at the end of day 1.</p>
        <img src={require("../assets/day1-progress-1.png")} alt={"day 1 progress 1"} className={"about-image"}/>
        <img src={require("../assets/day1-progress-2.png")} alt={"day 1 progress 2"} className={"about-image"}/>
        <p>I ended day 1 by adding in a couple more tweaks: (1) a delete button minus functionality, and (2) an instructions input field on the form.</p>
        <img src={require("../assets/day1-progress-3.png")} alt={"day 1 progress 3"} className={"about-image"}/>
        <img src={require("../assets/day1-progress-4.png")} alt={"day 1 progress 4"} className={"about-image"}/>
        <p>I started day 2 really wanting to get delete functionality working. I went thru it step by step with axios' DELETE method but I’ll be honest, it took quite a while. In the end, I found that I didn’t have the correct methods on my server.js file. Once that was figured out, I was able to get it functioning with less headache.</p>
        <p>In the process of figuring out this fix, I added something like a landing page (which will eventuallly have sign up and log in).</p>
        <img src={require("../assets/day2-progress-1.png")} alt={"day 2 progress 1"} className={"about-image"}/>
        <p>Interestingly, this page reminded me who I was making this for. Myself of course but also for experienced cooks who don’t need elaborate instruction but instead wanted quick hits of inspiration and a place to track their culinary creations.</p>
        <p>My biggest want by the end of day 2 was a smaller card view that showed all the recipes, and an expanded view at /recipes/:id. I wasn’t fully happy with my first attempt at smaller card view. I wanted to figure out a way to show more cards at once but didn’t think this was it.</p>
        <img src={require("../assets/day2-progress-2.png")} alt={"day 2 progress 2"} className={"about-image"}/>
        <p>I got closer this time by just keeping the image and the title. Though I liked the consistency of having the button on the left, right did something for me.</p>
        <img src={require("../assets/day2-progress-3.gif")} alt={"day 3 progress 2"} className={"about-image"}/>
        <p>I had one more idea to try. This is what I ended up settling on</p>
        <img src={require("../assets/day2-progress-4.png")} alt={"day 3 progress 4"} className={"about-image"}/>
        <p>It was very exciting to be done an MVP in about 12 hours of work. I showed it to some people who cared and got some good feedback. Some day three features:</p>
        <ul>
          <li>Search by ingredient</li>
          <li>Edit function on modal view and hide delete when viewing all recipes</li>
          <li>Sort by prep time (low-high) and filter by meal</li>
        </ul>
      </div>
    </div>
    </div>
  );
};

export default About;
