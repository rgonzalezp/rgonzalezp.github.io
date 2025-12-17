# Local Development
- ```Bundle exec jekyll serve```

# Adding new articles
- Go to ```./collections/_research```
- Create a new markdown file following the naming convention ```YYYY-MM-DD-<NameInCamel>.md```. Date is used to determine the listing order of all articles.

# Adding recent news 
- Go to ```./collections/_recent_activity```
- Create a new markdown file following the naming convention ```recent_activity_<Name>_<OptionalFlag>``` where optional flag can be: accepted, presented, rejected, submitted, etc.
- Include the following variables into the markdown:

    - ```title: <Name highlight of your recent news>```
    - ```image: <link to your thumbnail that will be visible to the users navigating the homepage. Recommended size 200 x 90 px>```
    - ```date: <YYYY-MM-DD. Used to determine order. Will appear.>```
    - ```abstract: <Short summary of the news. Will appear. Recommended less than 15-20 words > ```
    - ```subtext: <One Word Highlight. For example: Accepted, Internship, Submitted, Rejected>!```


- To modify how many recent news appear in the homepage and their order, you can modify the file ```./src/_includes/activity_info_list.html```

# Adding highlighted articles
- Go to ```./collections/_highlights```
- Create a new markdown file following the naming convention ```highlight_<Name>```.
- Include the following variables into the markdown:

    - ```title: <Name highlight of your recent news>```
    - ```image: <link to your thumbnail that will be visible to the users navigating the homepage. Recommended ratio 5:9 (verticalish)>```
    - ```date: <YYYY-MM-DD. Used to determine order. Will appear.>```
    - ```conference: <Optionally add conference name, or leave empty. Will appear next to date> ```
    - ```short_desc: <Short summary of the news. Will appear. Recommended less than 40-50 words>```
    - ```link_paper: "<link to paper. When users click on title of highlighted article it will take them to this link location"```


- To modify how many recent news appear in the homepage and their order, you can modify the file ```./src/_includes/highlight_info_list.html```