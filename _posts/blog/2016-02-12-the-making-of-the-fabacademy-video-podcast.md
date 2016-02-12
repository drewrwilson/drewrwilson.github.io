---
layout: blog_post_alt
title: FabAcademy Video Podcast
thumbnail: blog/fab-academy-podcast-thumbnail.jpg
tags: [fabacademy]
teaser: "I wrote code to publish the FabAcademy 2016 lectures as video podcast. Here's how it works."
categories:
- blog

---

*I made [a video podcast of all the lectures from Fab Academy 2016](https://drewrwilson.com/fabacademypodcast). This is a quick explanation of how I automated it.*


Each week there are two new [FabAcademy](http://fabacademy.org/) lectures and two lab days. Every Wednesday morning Professor Neil Gershenfeld gives a lecture on the topic for the week and on Mondays there's a guest lecture from a prominent member of the maker movement. Both lectures are live-streamed, but it's often difficult for me to participate because they happen during the day, when I need to be at work. I wanted to be able to subscribe to the class videos, so I made it into an iTunes-compatible podcast: [FabAcademy 2016 Video Podcast](https://drewrwilson.com/fabacademypodcast). This is a recap of how the podcast and how I automated parts of it.

Before I forget, you can [subscribe to FabAcademy 2016 via iTunes](https://itunes.apple.com/us/podcast/fabacademy-2016-podcast/id1082584132?mt=2) or [via RSS](https://drewrwilson.com/fabacademypodcast/podcast.rss).

[![](/assets/img/blog/fab-academy-podcast.jpg)](https://drewrwilson.com/fabacademy/)

## How does this work?

### The Problem: The Video Are Locked Up in Proprietary Platforms
The video streams are conducted on platforms that don't allow direct-linking to video downloads. The video from the weekly lecture is posted to Vimeo and the guest lecture is streamed via Google Hangouts and the video is then posted to YouTube. Vimeo does allow users to download the video, but does not allow direct linking to the video. YouTube does not provide any way to download the videos. Both platforms do this, presumably, because they prefer people to watch videos on their platforms.

To make this into a video podcast, I needed to make a script that downloads the videos, uploads them to a new server, then publishes a video podcast feed with links to the new videos.

### The Steps: Download & Process -> Upload -> Publish Podcast

There are four steps in this script. At this point, this is not entirely automated process, but the parts of it that take the most time are automated. I'm hoping to automate as much of this as possible so this podcast can be updated with the least amount of effort.

#### Step 1: Download the videos

*Downloading the videos from streaming services:* This was the first challenge.

**Vimeo:** The weekly lectures are streamed using an open source tool and after the class is over, FabAcademy uploads a recording to their [vimeo channel](https://vimeo.com/fabacademy). Vimeo *does* allow people to download videos but they *do not* provide an easy way to do it--they don't provide a direct link to the video file and on their website they use javascript to require a user to click a couple links before downloading, making it more difficult for a script to automatically download the video.

**YouTube:** The other weekly lecture is live-streamed using Google Hangouts on Air, which does not provide any way for a user to download the video file.

**So, how do we download them?** For both platforms I needed to come up with an alternative way to download the videos and upload them to another server. To download the videos, I used [youtube-dl](https://github.com/fent/node-youtube-dl), the NodeJS package that helps grab videos from streams. I don't know exactly how the tool works internally, but my understanding is that it opens multiple connections to the video starting at different parts and simultaneously captures chunks of the stream. After all the chunks are downloaded individually, youtube-dl merges all the files and outputs a single video file.

![](/assets/img/blog/downloading-fabacademy-video.jpg)

Youtube-dl has variety of options for video format, and options for which meta-data to save from the video. The short story is that this package allowed me to download a youtube video or a vimeo video to an mp4 using NodeJS. I wrote a NodeJS script that accepts two parameters when you run it: `a link to the video file, eg https://vimeo.com/153262283` and `a destinations file eg fab-academy-video-01.mp4`. This script is configured to download the highest quality version and save it as an `mp4` file. I chose mp4 because iTunes accepts this format and it's also compatible with most smart phones. Using this method the filesize is relatively large--around 400Mb or 500Mb per video--but I think the higher quality is necessary because Professor Gershenfeld often shows slides which have small text during the lecture. The higher quality video is worth it, even if the download may take a little longer.

#### Step 2: Upload the Video Files

I considered a few options for file hosting: Github Pages, Amazon S3 and hosting on my Dreamhost account.

 * **Github Pages:** Github has a product called [GitHub Pages](https://pages.github.com/), which is free web page hosting for project sites. It works with HTML/CSS/JS files and uses [Jekyll](https://jekyllrb.com). It's possible to use this to host video files and images, but github has a limit of 1 Gb per repository. These video files end up around 500Mb each, so the repo would very quickly grow to a few Gb. So Github Pages won't work for hosting files, but it will work for hosting the podcast feed and the webpage. Keeping them on Github makes it easy to keep this project open source and accessible to other FabAcademy participants. I made [a landing page](https://drewrwilson.com/fabacademypodcast/) for the podcast and here is the [the podcast feed](https://drewrwilson.com/fabacademypodcast/podcast.rss). Both are now hosted on Github Pages, but I still need a way to host the large video files.
 * **Amazon S3:** I considered putting them on Amazon S3, but decided against it for two reasons. S3 costs money based on the number of downloads and it is also complicates the process of uploading a new file. Uploading to S3 requires an API key and some code to automate uploading, but if I use a Linux server I could use Bash commands like `scp` to copy the video files to a remote server--and if I configured a saved SSH key on the server, uploading won't even require me to enter a password.
 * **Dreamhost:** They brag that they offer unlimited hosting with unlimited transfers on a share Virtual Private Server for a monthly fee. I already have an account with Dreamhost. The download speeds seem to be capped at well-under 1Mb/s transfers, but I don't expect that to be a problem. I made a new directory for the video files on an unimportant subdomain. Now after I run the script to download the videos from Vimeo & YouTube, I can use `scp` to copy the files to the Dreamhost server. This also sets up well for any future automation, because it's easy to write a Bash script to upload files to a Linux server.

#### Publish The Video Podcast Feed

To submit the podcast to iTunes, there are some special metatags required in the feed. I made [a Jekyll template for the podcast feed](https://github.com/drewrwilson/fabacademypodcast/blob/gh-pages/_layouts/itunes-video-podcast.md) based on another podcast. The template pulls in all the recent posts in Jekyll and builds an iTunes-compatible podcast feed. To add a new video to the feed (and to the webpage), I add a new file to `_posts` directory with all the relevant variables: title, a link to the video file on Dreamhost, thumbnail, etc. Since the site is using Jekyll on Github Pages, whenever I `push` new updates to the repo on github the webpage will be automatically regenerate and re-publish the podcast feed. Adding a new post is easy: just create a new post and push it to github and iTunes will automatically grab the newest videos from the feed on github pages.

## Possible Future Improvements

**Automate, automate, automate.** This could be further automated. There's a script that make downloading the video easier, but downloadin is not automatically triggered when a new video is posted to Vimeo or YouTube. Vimeo has an RSS video for the videos on a given channel--this feed is not a valid podcast feed because it doesn't link directly to videos, but it does have links to the video streams. If I have a script check the Vimeo periodically for new entries, I can use the link from that RSS to trigger my download script. To close the loop entirely and automate the whole process, I'd also need to have a script upload the video to Dreamhost and publish a new post withe the metadata. This isn't too difficult to do, but it would take time.

Another option would be to ask Fab Foundation to be in charge of this podcast. If someone from Fab Foundation uploaded the videos and updated the feed themselves, it would cut out the need for me to have these scripts running. Right now it only takes a few minutes of time to add a new post. Regardless, it'd be nice to have some process for publishing this podcast in case I don't notice when the new videos get posted.

## Subscribe!

Ok, now that you know how this is made, why not subscribe to the [FabAcademy 2016 Video Podcast](https://drewrwilson.com/fabacademypodcast)? You can [subscribe on iTunes](https://itunes.apple.com/us/podcast/fabacademy-2016-podcast/id1082584132?mt=2) or directly using [the podcast's RSS feed](https://drewrwilson.com/fabacademypodcast/podcast.rss)


*I'm doing a 5-month course on digital fabrication called FabAcademy. [See my other writing about the course and some projects that I created during it](https://drewrwilson.com/fabacademy/).*
