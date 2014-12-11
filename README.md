Observatory
=====================================

Super easy CSV builder for collections in your Meteor!  Very useful for data collection, reporting to clients, etc.

Built using my open-source time at [philosophie](http://philosophie.is).


Installation
-------------

`meteor install nrswolf:observatory`

Use
-------------
To build a CSV report of a collection in your app, simple pass `Observatory.buildCSV()` a collection as a parameter.  For instance:

```
Template.myTemplate.events({
  'click #generate-user-report': function() {
    users = Meteor.users.find();
    Observatory.buildCSV(users)
  }
})
```
