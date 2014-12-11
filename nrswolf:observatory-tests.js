Tinytest.add('Observatory', function(test) {
  Pokemon = new Meteor.Collection('Pokemon');

  var pikachuId = Pokemon.insert({
    name: 'Pikachu',
    type: 'Electriciy'
  });

  var charizardId = Pokemon.insert({
    name: 'Charizard',
    type: 'Fire',
    specialMove: 'Fireball'
  });

  var actualHeaders = Observatory.buildHeaders(Pokemon.find());
  var expectedHeaders = ['name', 'type', '_id', 'specialMove'];

  test.equal(actualHeaders, expectedHeaders);

  var actualOutput = Observatory.buildOutput(Pokemon.find());
  var expectedOutput = [
    actualHeaders,
    ['Pikachu', 'Electriciy', pikachuId, null],
    ['Charizard', 'Fire', charizardId, 'Fireball']
  ];

  test.equal(actualOutput, expectedOutput);
});
