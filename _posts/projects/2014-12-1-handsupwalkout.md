---
layout: portfolio_entry
title: HandsUpWalkOut campaign
description: Web application for coordinating a national campaign of student walk-out protests
link: https://handsupwalkout.com
images:
- handsupwalkout/handsupwalkout-webpage-preview.png
- handsupwalkout/handsupwalkout-cu-boulder.jpg
- handsupwalkout/handsupwalkout-harvard-square.jpg
- handsupwalkout/handsupwalkout-times-square.jpg
thumbnail: handsupwalkout/handsupwalkout-webpage-preview-sm.png
categories:
- projects
- featuredprojects
---

This web application used a collaboratively maintained google docs to automatically generate a campaign webpage for the HandsUpWalkOut day of action. It was used to coordinate over 100 actions across the US and was viewed over 100k times over two days.

## A tech tool to help organizers
On Friday, November 28 I noticed tweets using the hashtag #handsupwalkout. I clicked through and found that it was mostly high school- and college students using social media to plan a student walk out protest as part of the Black Lives Matter protests. It was striking to me that the people who were most vocal about the protests were people with only a handful of followers. It wasn't big activist organizations, or even people with thousands of followers. Most of the messages were coming from kids with 20 friends on twitter. I wanted to support these young activist and there wasn't yet a central place online where the actions were being listed. This project made a workflow for organizer to add their local events to a campaign website with map.

![](/assets/img/projects/handsupwalkout/handsupwalkout-webpage-preview.png "HandsUpWalkOut campaign site")

## "Day of Action" is an activist pattern
When NGOs plan a day of action like this, they follow a certain pattern: there's a signup workflow, a moderation queue and then a webpage with a list of actions and usually a map that helps people easily find local actions. At some point I would like to make this tool into a more versatile application that organizers could use for any day of action but with only 2 days before HandsUpWalkOut, I couldn't make a full-fledged web app, so I used google docs as a backend and wrote some scripts that convert the google doc into a campaign website.

## How does it work?

*In short: social media → google forms → google docs spreadsheet → nodeJS → geojson → amazon s3 → campaign webpage*

The tool uses google docs to collect and store data and Node scripts to convert data to a format that can be used to generate a campaign website. Using google docs reduced the learning curve for organizers and it cut out a lot of the work usually required to make a backend.

For organizers the workflow was simple: local organizers submitted their actions via a google form, then another organizer confirmed the event and added it to a google spreadsheet that included the name, location, time, and a link to a facebook event. From there a Node script downloaded the gdoc, converted it to a geojson file, and then uploaded it to amazon s3 for hosting. Separately I wrote a quick frontend webpage that consumed the geojson from s3 and built a map interface. The script ran hourly to grab new actions and add them to the map.

Throughout the weekend I talked with organizers from different regions in the US and added them as collaborators on the spreadsheet, so that they could update the data about actions. Dozens of people jumped onto the spreadsheet to add details about actions. By Monday, we had over 100 actions listed & mapped.

The campaign website provided a way for journalists and activists to show that HandsUpWalkOut was a coordinated national campaign. It led to more visibility for the protests and helped people find nearby actions. Over the Monday and Tuesday the site was shared hundreds of times on social media and viewed 100k times.
